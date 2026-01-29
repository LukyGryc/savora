import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataItem } from "@/server/items"
import { formatAmountCurrency } from "@/lib/itemsUtil"
import { getDashboardData, MonthColumn } from "@/lib/dashboard"


const OverviewTable = ({ items }: { items: DataItem[] }) => {

    const data = getDashboardData(items);

    const years = Array.from(
        new Set(
            data.flatMap((r) => Object.keys(r.amount))
        )
    ).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))

    const columns: MonthColumn[] = years.flatMap((year) => {
        const monthKeys = Array.from(
            new Set(
                data.flatMap(r => Object.keys(r.amount[year] ?? {}))
            )
        );

        return monthKeys
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map((month) => ({ year, month }))
    })

    const totalByColumn = columns.map(({ year, month }) =>
        data.reduce((sum, row) => sum + (row.amount[year]?.[month] ?? 0), 0)
    )
    const grandTotal = data.reduce((sum, row) => sum + row.total, 0)

    const yearColSpans = years.map(
        (year) => columns.filter((c) => c.year === year).length
    )

    return (
        <div className="flex flex-col p-6">
            <Card>
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
                                        colSpan={yearColSpans[years.indexOf(year)]}
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
                                        <TableHead className="text-center" key={`${month}.${year}_columns`}>
                                            {format(new Date(2026, parseInt(month, 10), 1), "MMMM")}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map(({ category, amount, total }) => (
                                <TableRow key={category}>
                                    <TableCell className="text-center">{category}</TableCell>
                                    {columns.map(({ year, month }, i) => {
                                        if (i === 0) {
                                            console.log(category, amount, total)
                                            console.log(month, year)
                                        }
                                        return <TableCell className="text-center" key={`${month}.${year}_data`}>
                                            {amount[year]?.[month] != null
                                                ? formatAmountCurrency(amount[year][month])
                                                : "-"
                                            }
                                        </TableCell>
                                    })}
                                    <TableCell className="text-center font-medium">
                                        {formatAmountCurrency(total)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="font-medium bg-muted/50">
                                <TableCell className="text-center">Total</TableCell>
                                {totalByColumn.map((sum, i) => (
                                    <TableCell className="text-center" key={`${columns[i].year}.${columns[i].month}_total`}>
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
        </div>
    )
}

export default OverviewTable
