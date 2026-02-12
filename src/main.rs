mod data;
mod network;
use network::{get_price_data, Exchange};

fn main() -> () {
    let coin = String::from("usdt");
    get_price_data(Exchange::Nobitex, &coin);
}
