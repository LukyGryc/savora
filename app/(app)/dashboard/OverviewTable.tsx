import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataItem } from "@/server/items"
import { formatAmountCurrency } from "@/lib/itemsUtil"

interface MonthColumn {
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
type AmountGrid = Record<string, Record<string, number>>

interface CategoryRow {
    category: string
    amount: AmountGrid
    total: number
}

const OverviewTable = ({ items }: { items: DataItem[] }) => {
    // Get unique categories, categories[0] as only one category is supported
    const categories = Array.from(
        new Set(
            items.map((item) => item.categories[0])
        )
    );

    const rows: CategoryRow[] = categories.map((category) => {
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

    const years = Array.from(
        new Set(
            rows.flatMap((r) => Object.keys(r.amount))
        )
    ).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))

    const columns: MonthColumn[] = years.flatMap((year) => {
        const monthKeys = Array.from(
            new Set(
                rows.flatMap(r => Object.keys(r.amount[year] ?? {}))
            )
        );

        return monthKeys
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map((month) => ({ year, month }))
    })

    const totalByColumn = columns.map(({ year, month }) =>
        rows.reduce((sum, row) => sum + (row.amount[year]?.[month] ?? 0), 0)
    )
    const grandTotal = rows.reduce((sum, row) => sum + row.total, 0)

    const yearColSpans = years.map(
        (year) => columns.filter((c) => c.year === year).length
    )

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Your spending overview</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center" rowSpan={2}>
                                Category
                            </TableHead>
                            {years.map((year) => (
                                <TableHead
                                    className="text-center"
                                    key={year}
                                    colSpan={yearColSpans[year.indexOf(year)]}
                                >
                                    {year}
                                </TableHead>
                            ))}
                            <TableHead className="text-center" rowSpan={2}>
                                Total
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            {columns.map(({ year, month }) => {
                                return (
                                    <TableHead className="text-center" key={`${month}.${year}`}>
                                        {format(new Date(2026, parseInt(month, 10), 1), "MMMM")}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map(({ category, amount, total }) => (
                            <TableRow key={category}>
                                <TableCell className="text-center">{category}</TableCell>
                                {columns.map(({ year, month }) => (
                                    <TableCell className="text-center" key={month}>
                                        {amount[year]?.[month] != null
                                            ? formatAmountCurrency(amount[year][month])
                                            : "-"}
                                    </TableCell>
                                ))}
                                <TableCell className="text-center font-medium">
                                    {formatAmountCurrency(total)}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="font-medium bg-muted/50">
                            <TableCell className="text-center">Total</TableCell>
                            {totalByColumn.map((sum, i) => (
                                <TableCell className="text-center" key={columns[i].month}>
                                    {sum > 0 ? formatAmountCurrency(sum) : "-"}
                                </TableCell>
                            ))}
                            <TableCell className="text-center">
                                {formatAmountCurrency(grandTotal)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default OverviewTable
