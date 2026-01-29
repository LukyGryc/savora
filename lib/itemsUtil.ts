import { DataItem } from "@/server/items";

export const formatAmountCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const getItemsForDate = (items: DataItem[], date: Date) => {
    return items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
    });
}