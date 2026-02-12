
#[derive(Debug)]
pub enum Exchange {
    Nobitex,
    Wallex,
    Bitpin,
}

pub fn get_price_data(exchange: Exchange, coin: &String) -> () {
    println!("{:?}, {:?}", exchange, coin);
}
