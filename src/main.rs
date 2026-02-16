mod data;
mod network;
use network::{Exchange, fetch_best_price};
use tokio::time::{Duration, interval};

#[tokio::main]
async fn main() -> () {
    dotenvy::dotenv().ok();
    let coin = String::from("usdt");
    let mut ticker = interval(Duration::from_secs(2));
    loop {
        ticker.tick().await;
        tokio::join!(
            fetch_best_price(Exchange::Nobitex, &coin),
            fetch_best_price(Exchange::Wallex, &coin),
            fetch_best_price(Exchange::Bitpin, &coin),
        );
    }
}
