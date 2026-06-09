import { usePricesStore } from "@/api/prices/store";
import { mask } from "@/utils/math";

export const Prices = () => {
    const { pricesQueryFactory } = usePricesStore();
    const nobitexPricesQuery = pricesQueryFactory({ exchange: 'nobitex', market: 'USDTIRT' });
    const tabdealPricesQuery = pricesQueryFactory({ exchange: 'tabdeal', market: '3' });
    const bitpinPricesQuery = pricesQueryFactory({ exchange: 'bitpin', market: '5' });

    return <div>
        <div className="flex gap-2">
            <span>Nobitex</span>
            <span>Best Buy</span>
            <span>{mask(nobitexPricesQuery.data?.bestBuy.price)}</span>
            <span>{mask(nobitexPricesQuery.data?.bestBuy.amount)}</span>
        </div>
        <div className="flex gap-2">
            <span>Nobitex</span>
            <span>Best Sell</span>
            <span>{mask(nobitexPricesQuery.data?.bestSell.price)}</span>
            <span>{mask(nobitexPricesQuery.data?.bestSell.amount)}</span>
        </div>
        <div className="flex gap-2">
            <span>Tabdeal</span>
            <span>Best Buy</span>
            <span>{mask(tabdealPricesQuery.data?.bestBuy.price)}</span>
            <span>{mask(tabdealPricesQuery.data?.bestBuy.amount)}</span>
        </div>
        <div className="flex gap-2">
            <span>Tabdeal</span>
            <span>Best Sell</span>
            <span>{mask(tabdealPricesQuery.data?.bestSell.price)}</span>
            <span>{mask(tabdealPricesQuery.data?.bestSell.amount)}</span>
        </div>
        <div className="flex gap-2">
            <span>Bitpin</span>
            <span>Best Buy</span>
            <span>{mask(bitpinPricesQuery.data?.bestBuy.price)}</span>
            <span>{mask(bitpinPricesQuery.data?.bestBuy.amount)}</span>
        </div>
        <div className="flex gap-2">
            <span>Bitpin</span>
            <span>Best Sell</span>
            <span>{mask(bitpinPricesQuery.data?.bestSell.price)}</span>
            <span>{mask(bitpinPricesQuery.data?.bestSell.amount)}</span>
        </div>
    </div >;
};