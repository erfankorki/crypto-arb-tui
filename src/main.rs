mod data;
mod network;
use network::{Exchange, get_price_data};
use tokio::time::{Duration, interval};

#[tokio::main]
async fn main() -> () {
    let coin = String::from("usdt");
    let mut ticker = interval(Duration::from_secs(3));
    loop {
        ticker.tick().await;
        get_price_data(Exchange::Nobitex, &coin).await;
    }
}
