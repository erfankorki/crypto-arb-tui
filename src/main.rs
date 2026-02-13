mod data;
mod network;
use network::{Exchange, get_price_data};
use tokio::time::{Duration, interval};

#[tokio::main]
async fn main() -> () {
    dotenvy::dotenv().ok();
    let coin = String::from("usdt");
    let mut ticker = interval(Duration::from_secs(2));
    loop {
        ticker.tick().await;
        get_price_data(Exchange::Nobitex, &coin).await;
    }
}
