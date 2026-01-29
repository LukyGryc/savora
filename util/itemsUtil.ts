import { DataItem } from "@/server/items";

export const formatAmountCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const getItemsForDate = (items: DataItem[], date: Date) => {
    return items.filter(item => item.date.toDateString() === date.toDateString());
}