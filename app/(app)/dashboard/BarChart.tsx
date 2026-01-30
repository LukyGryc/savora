"use client"

import SelectCustom from "@/components/layout/SelectCustom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDashboardData, getDateRange, getMonthName, getYears } from "@/lib/dashboard"
import { formatAmountCurrency } from "@/lib/itemsUtil"
import { DataItem } from "@/server/items"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#2563eb"
  }
} satisfies ChartConfig

export function ChartExample({ items }: { items: DataItem[] }) {

  const [selectedMonth, setSelectedMonth] = useState("0");
  const [selectedYear, setSelectedYear] = useState("2026");

  const dashboardData = getDashboardData(items);
  const years = getYears(dashboardData);
  const dates = getDateRange(dashboardData);

  const dataForChart = dashboardData
    .filter((data) => data.amount[selectedYear]?.[selectedMonth] !== undefined)
    .reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = { amount: item.amount[selectedYear]?.[selectedMonth] ?? 0, category };
      } else {
        acc[category].amount += item.amount[selectedYear]?.[selectedMonth] ?? 0;
      }
      return acc;
    }, {} as Record<string, { amount: number, category: string }>)

  const onYearChange = (value: string) => {
    setSelectedYear(value);
    setSelectedMonth(dates.filter(({ year }) => year === value)[0].month);
  }

  return (
    <Card className="h-fit w-full bg-secondary">
      <CardHeader>
        <CardTitle>Your spending visualized</CardTitle>
        <CardDescription>
          <div className="flex gap-2">
            <SelectCustom
              items={years.map((year) => ({ value: year, label: year }))}
              value={selectedYear}
              onChange={onYearChange}
            />
            <SelectCustom
              items={dates.filter(({ year }) => year === selectedYear).map(({ month }) => ({ value: month, label: getMonthName(month) }))}
              value={selectedMonth}
              onChange={(value) => setSelectedMonth(value)}
            />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>

        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <BarChart accessibilityLayer data={Object.values(dataForChart)} >
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel formatter={(value) => (
                <div className="flex flex-col gap-2">
                  <span>{chartConfig.amount.label}</span>
                  <span>{formatAmountCurrency(value as number)}</span>
                </div>
              )} />}
            />

            <Bar dataKey="amount" fill={`var(--color-primary)`} radius={4} />

          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
