import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataItem } from "@/server/items"
import { formatAmountCurrency } from "@/lib/itemsUtil"
import { getDashboardData, getDateRange, getMonthName, getYears, MonthColumn } from "@/lib/dashboard"


const OverviewTable = ({ items, className }: { items: DataItem[], className?: string }) => {

    const data = getDashboardData(items);
    const years = getYears(data);
    const columns = getDateRange(data);

    const borderColorMain = "border-white/70";
    const totalByColumn = columns.map(({ year, month }) =>
        data.reduce((sum, row) => sum + (row.amount[year]?.[month] ?? 0), 0)
    )
    const grandTotal = data.reduce((sum, row) => sum + row.total, 0)

    const yearColSpans = years.map(
        (year) => columns.filter((c) => c.year === year).length
    )

    console.log(columns)


    const applyBorder = ({ year, month }: ReturnType<typeof getDateRange>[number]): string => {
        //Columns are already sorted by year, so we can just find the first and last month of the year
        const firstMonthOfYear = columns.find((c) => c.year === year)?.month;
        const lastMonthOfYear = columns.findLast((c) => c.year === year)?.month;

        if (month === firstMonthOfYear) {
            return `border-l ${borderColorMain}`;
        }
        if (month === lastMonthOfYear) {
            return `border-r ${borderColorMain}`;
        }

        return "";
    }

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Your spending overview</CardTitle>
            </CardHeader>
            <CardContent className="h-full p-8">
                <Table className="h-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className={`text-center border-b ${borderColorMain}`} rowSpan={2}>
                                Category
                            </TableHead>
                            {years.map((year) => (
                                <TableHead
                                    className="text-center border-b border-white/20"
                                    key={year}
                                    colSpan={yearColSpans[years.indexOf(year)]}
                                >
                                    {year}
                                </TableHead>
                            ))}
                            <TableHead className={`text-center border-b ${borderColorMain}`} rowSpan={2}>
                                Total
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            {columns.map(({ year, month }) => {
                                return (
                                    <TableHead className={`text-center border-b ${borderColorMain}`} key={`${month}.${year}_columns`}>
                                        {getMonthName(month)}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(({ category, amount, total }) => (
                            <TableRow key={category} className="border-b border-white/20">
                                <TableCell className="text-center">{category}</TableCell>
                                {columns.map(({ year, month }) => {
                                    return <TableCell
                                        className={`text-center ${applyBorder({ year, month })}`}
                                        key={`${month}.${year}_data`}
                                    >
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
                        <TableRow className="font-medium bg-primary/30 hover:bg-primary/50">
                            <TableCell className="text-center">Total</TableCell>
                            {totalByColumn.map((sum, i) => (
                                <TableCell
                                    className={`text-center ${applyBorder({ year: columns[i].year, month: columns[i].month })}`}
                                    key={`${columns[i].year}.${columns[i].month}_total`}
                                >
                                    {sum > 0 ? formatAmountCurrency(sum) : "-"}
                                </TableCell>
                            ))}
                            <TableCell className={`text-center ${borderColorMain}`}>
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
