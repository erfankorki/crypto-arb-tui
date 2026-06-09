import { BITPIN_ORDERBOOK, NOBITEX_ORDERBOOK, TABDEAL_ORDERBOOK } from "@/constant/endpoints";
import { useQuery } from "@tanstack/react-query"
import { Exchange } from "interfaces"
import { nobitexOrderBookSchema, ExchangeBestPrices, tabdealOrderBookSchema, bitpinOrderBookSchema } from "./types";
import { API, kyInstance } from "@/constant";
import { sortBy } from "ramda";
import Big from "big.js";



async function getNobitexPrices(market: string): Promise<ExchangeBestPrices> {
    const response = await kyInstance.get(API.nobitex + NOBITEX_ORDERBOOK(market)).json();
    const result = nobitexOrderBookSchema.safeParse(response);
    if (result.success) {
        const bestBuy = sortBy((item: [Big, Big]) => item[0].toNumber())(result.data.bids)[0];
        const bestSell = sortBy((item: [Big, Big]) => item[0].toNumber())(result.data.asks)[0];
        return {
            bestBuy: {
                price: bestBuy[0],
                amount: bestBuy[1],
            },
            bestSell: {
                price: bestSell[0],
                amount: bestSell[1]
            },
        };
    }
    throw new Error('Invalid response from Nobitex');
}

async function getTabdealPrices(market: string): Promise<ExchangeBestPrices> {
    const response = await kyInstance.get(API.tabdeal + TABDEAL_ORDERBOOK(market)).json();
    const result = tabdealOrderBookSchema.safeParse(response);
    if (result.success) {
        const bestBuy = sortBy((item: { price: Big; amount: Big; }) => item.price.toNumber())(result.data.bids.slice(0, 10))[0];
        const bestSell = sortBy((item: { price: Big; amount: Big; }) => item.price.toNumber())(result.data.asks.slice(0, 10))[0];
        return {
            bestBuy: {
                price: bestBuy.price,
                amount: bestBuy.amount,
            },
            bestSell: {
                price: bestSell.price,
                amount: bestSell.amount,
            },
        };
    }
    throw new Error('Invalid response from Tabdeal');
}

async function getBitpinPrices(market: string): Promise<ExchangeBestPrices> {
    const response = await kyInstance.get(API.bitpin + BITPIN_ORDERBOOK(market)).json();
    const result = bitpinOrderBookSchema.safeParse(response);
    if (result.success) {
        const bestBuy = sortBy((item: [Big, Big]) => item[0].toNumber())(result.data.bids)[0];
        const bestSell = sortBy((item: [Big, Big]) => item[0].toNumber())(result.data.asks)[0];
        return {
            bestBuy: {
                price: bestBuy[0],
                amount: bestBuy[1],
            },
            bestSell: {
                price: bestSell[0],
                amount: bestSell[1],
            },
        };
    }
    throw new Error('Invalid response from Bitpin');
}

const PricesAdapter = {
    nobitex: getNobitexPrices,
    tabdeal: getTabdealPrices,
    bitpin: getBitpinPrices,
} as const


export const usePricesStore = () => {
    const pricesQueryFactory = ({ exchange, market }: { exchange: Exchange, market: string }) => useQuery({
        queryKey: ['prices', exchange],
        queryFn: () => PricesAdapter[exchange](market),
        refetchInterval: 2_000
    })

    return {
        pricesQueryFactory
    }
}