export const NOBITEX_ORDERBOOK = (market: string) => `v3/orderbook/${market}`;
export const BITPIN_ORDERBOOK = (market: string) => `v4/mth/orderbook/${market}/?limit=50`;
export const TABDEAL_ORDERBOOK = (market: string) => `aggregated_order_book/?market_id=${market}&aggregation_precision=1`;
