import { DataItem } from "@/server/items"

export interface MonthColumn {
    year: string
    month: string
}

/*{
    "2026": {
        "0": 100,
        "1": 200,
        "2": 300
    }
}*/
export type AmountGrid = Record<string, Record<string, number>>

export interface CategoryData {
    category: string
    amount: AmountGrid
    total: number
}

export const getDashboardData = (items: DataItem[]) => {
    // Get unique categories, categories[0] as only one category is supported
    const categories = Array.from(
        new Set(
            items.map((item) => item.categories[0])
        )
    );

    const data: CategoryData[] = categories.map((category) => {
        const itemsForCategory = items.filter((item) => item.categories[0] === category)
        const amount: AmountGrid = {}

        let total = 0;
        for (const item of itemsForCategory) {
            const month = item.date.getMonth().toString()
            const year = item.date.getFullYear().toString()

            if (!amount[year])
                amount[year] = {}

            amount[year][month] = (amount[year][month] ?? 0) + item.amount
            total += item.amount
        }

        return { category, amount, total }
    })

    return data;
}