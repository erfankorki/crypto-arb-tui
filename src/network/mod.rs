use serde::Deserialize;
use std::env;
#[derive(Debug)]
pub enum Exchange {
    Nobitex,
    Wallex,
    Bitpin,
}

#[derive(Debug, Clone)]
pub struct PriceAndAmount {
    pub price: f64,
    pub amount: f64,
}

#[derive(Debug, Clone)]
pub struct BestPrice {
    pub buy: PriceAndAmount,
    pub sell: PriceAndAmount,
}

#[derive(Deserialize)]
struct StringPairOrderBook {
    bids: Vec<[String; 2]>,
    asks: Vec<[String; 2]>,
}

#[derive(Deserialize)]
struct WallexOrderEntry {
    price: f64,
    quantity: f64,
}

#[derive(Deserialize)]
struct WallexOrderBookInner {
    bid: Vec<WallexOrderEntry>,
    ask: Vec<WallexOrderEntry>,
}

#[derive(Deserialize)]
struct WallexOrderBookResponse {
    result: WallexOrderBookInner,
}

fn parse_string_pair(entry: &[String; 2], price_divisor: f64) -> PriceAndAmount {
    PriceAndAmount {
        price: entry[0].parse::<f64>().unwrap() / price_divisor,
        amount: entry[1].parse::<f64>().unwrap(),
    }
}

fn extract_best_price(
    bids: &[[String; 2]],
    asks: &[[String; 2]],
    price_divisor: f64,
) -> BestPrice {
    let best_bid = bids
        .iter()
        .max_by(|a, b| {
            a[0].parse::<f64>()
                .unwrap()
                .total_cmp(&b[0].parse::<f64>().unwrap())
        })
        .expect("bids should not be empty");

    let best_ask = asks
        .iter()
        .min_by(|a, b| {
            a[0].parse::<f64>()
                .unwrap()
                .total_cmp(&b[0].parse::<f64>().unwrap())
        })
        .expect("asks should not be empty");

    BestPrice {
        buy: parse_string_pair(best_bid, price_divisor),
        sell: parse_string_pair(best_ask, price_divisor),
    }
}

fn extract_wallex_best_price(order_book: &WallexOrderBookInner) -> BestPrice {
    let best_bid = order_book
        .bid
        .iter()
        .max_by(|a, b| a.price.total_cmp(&b.price))
        .expect("bids should not be empty");

    let best_ask = order_book
        .ask
        .iter()
        .min_by(|a, b| a.price.total_cmp(&b.price))
        .expect("asks should not be empty");

    BestPrice {
        buy: PriceAndAmount { price: best_bid.price, amount: best_bid.quantity },
        sell: PriceAndAmount { price: best_ask.price, amount: best_ask.quantity },
    }
}

pub async fn fetch_nobitex_best_price(coin: &str) -> Result<BestPrice, reqwest::Error> {
    let base_url = env::var("NOBITEX_BASE_URL").expect("NOBITEX_BASE_URL must be set");
    let url = format!("{base_url}v3/orderbook/{}IRT", coin.to_uppercase());

    let book = reqwest::get(&url).await?.json::<StringPairOrderBook>().await?;
    Ok(extract_best_price(&book.bids, &book.asks, 10.0))
}

pub async fn fetch_bitpin_best_price(coin: &str) -> Result<BestPrice, reqwest::Error> {
    let base_url = env::var("BITPIN_BASE_URL").expect("BITPIN_BASE_URL must be set");
    let url = format!("{base_url}api/v1/mth/orderbook/{}_IRT/", coin.to_uppercase());

    let book = reqwest::get(&url).await?.json::<StringPairOrderBook>().await?;
    Ok(extract_best_price(&book.bids, &book.asks, 1.0))
}

pub async fn fetch_wallex_best_price(coin: &str) -> Result<BestPrice, reqwest::Error> {
    let base_url = env::var("WALLEX_BASE_URL").expect("WALLEX_BASE_URL must be set");
    let url = format!("{base_url}v1/depth?symbol={}TMN", coin.to_uppercase());

    let resp = reqwest::get(&url).await?.json::<WallexOrderBookResponse>().await?;
    Ok(extract_wallex_best_price(&resp.result))
}

pub async fn fetch_best_price(exchange: Exchange, coin: &str) {
    let default = BestPrice {
        buy: PriceAndAmount { price: 0.0, amount: 0.0 },
        sell: PriceAndAmount { price: 0.0, amount: 0.0 },
    };

    let best_price = match exchange {
        Exchange::Nobitex => fetch_nobitex_best_price(coin).await,
        Exchange::Wallex => fetch_wallex_best_price(coin).await,
        Exchange::Bitpin => fetch_bitpin_best_price(coin).await,
    }
    .unwrap_or(default);

    println!("{exchange:?} best price for {coin}: {best_price:?}");
}
