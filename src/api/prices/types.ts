import { z } from 'zod'
import Big from 'big.js'


const stringToDecimalSchema = z.string().transform(val => new Big(val));


export const nobitexOrderBookSchema = z.object({
    status: z.literal('ok'),
    asks: z.array(z.tuple([stringToDecimalSchema, stringToDecimalSchema])),
    bids: z.array(z.tuple([stringToDecimalSchema, stringToDecimalSchema])),
})

export type NobitexOrderBook = z.infer<typeof nobitexOrderBookSchema>;


export const tabdealOrderBookSchema = z.object({
    asks: z.array(z.object({
        price: stringToDecimalSchema,
        amount: stringToDecimalSchema,
    })),
    bids: z.array(z.object({
        price: stringToDecimalSchema,
        amount: stringToDecimalSchema,
    })),
})

export type TabdealOrderBook = z.infer<typeof tabdealOrderBookSchema>;

export const bitpinOrderBookSchema = z.object({
    asks: z.array(z.tuple([stringToDecimalSchema, stringToDecimalSchema])),
    bids: z.array(z.tuple([stringToDecimalSchema, stringToDecimalSchema])),
})

export type BitpinOrderBook = z.infer<typeof bitpinOrderBookSchema>;

export type ExchangeBestPrices = {
    bestBuy: {
        price: Big;
        amount: Big;
    },
    bestSell: {
        price: Big;
        amount: Big;
    }
}
