import { DataItem } from "@/server/items"
import { format } from "date-fns"

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

//TODO: Make categories user specific
export const categories = [
    {
        name: "Food",
        fill: "var(--color-primary)"
    },
    {
        name: "Transportation",
        fill: "#65E0BF"
    },
    {
        name: "Housing",
        fill: "#55DBCB"
    },
    {
        name: "Utilities",
        fill: "#47BFBD"
    },
    {
        name: "Entertainment",
        fill: "#39A2AE"
    },
    {
        name: "Health",
        fill: "#418291"
    },
    {
        name: "Education",
        fill: "#486173"
    },
    {
        name: "Travel",
        fill: "#4F4055"
    },
    {
        name: "Other",
        fill: "#533046"
    }
];

export const getMonthName = (month: string) => {
    return format(new Date(2026, parseInt(month, 10), 1), "MMMM")
}

export const getYears = (data: CategoryData[]) => {
    return Array.from(
        new Set(
            data.flatMap((r) => Object.keys(r.amount))
        )
    ).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
}

export const getDateRange = (data: CategoryData[]) => {

    return getYears(data).flatMap((year) => {
        const monthKeys = Array.from(
            new Set(
                data.flatMap(r => Object.keys(r.amount[year] ?? {}))
            )
        );
    
        return monthKeys
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map((month) => ({ year, month }))
    })
}

export const getDashboardData = (items: DataItem[]) => {
    // Get unique categories, categories[0] as only one category is supported, but went with string[] for future proofing
    const categories = Array.from(
        new Set(
            items.map((item) => item.categories?.[0])
        )
    );

    const data: CategoryData[] = categories.map((category) => {
        const itemsForCategory = items.filter((item) => item.categories?.[0] === category)
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