use std::ops::Div;

use serde::Deserialize;

#[derive(Debug)]
pub enum Exchange {
    Nobitex,
    Wallex,
    Bitpin,
}

#[derive(Deserialize)]
pub struct NobitexOrderBook {
    bids: Vec<[String; 2]>,
    asks: Vec<[String; 2]>,
}

pub async fn get_nobitex_coin_price(coin: &String) -> Result<f64, reqwest::Error> {
    let mut result = reqwest::get("https://apiv2.nobitex.ir/v3/orderbook/USDTIRT")
        .await?
        .json::<NobitexOrderBook>()
        .await?
        .bids
        .iter()
        .map(|bid| bid[0].parse::<f64>().unwrap().div(10.0))
        .collect::<Vec<f64>>();
    result.sort_by(|a, b| b.total_cmp(a));

    Ok(*result.get(0).unwrap())
}

pub fn get_wallex_coin_price(coin: &String) -> f64 {
    10.0
}

pub fn get_bitpin_coin_price(coin: &String) -> f64 {
    10.0
}

pub async fn get_price_data(exchange: Exchange, coin: &String) -> () {
    if let Exchange::Nobitex = exchange {
        let data = get_nobitex_coin_price(coin).await.unwrap();
        println!("{}", data);
    }
}
