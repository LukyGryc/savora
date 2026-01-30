"use client"

import BarChartCustom from "@/components/charts/BarChartCustom"
import PieChartCustom from "@/components/charts/PieChartCustom"
import SelectCustom from "@/components/layout/SelectCustom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig } from "@/components/ui/chart"
import { categories, getDashboardData, getDateRange, getMonthName, getYears } from "@/lib/dashboard"
import { DataItem } from "@/server/items"
import { useState } from "react"

const chartConfig = {
  amount: {
    label: "Amount"
  }
} satisfies ChartConfig

export function ChartExample({ items }: { items: DataItem[] }) {

  const [selectedMonth, setSelectedMonth] = useState("0");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedChart, setSelectedChart] = useState<("pie" | "bar")>("pie");

  const dashboardData = getDashboardData(items);
  const years = getYears(dashboardData);
  const dates = getDateRange(dashboardData);

  const dataForChart = dashboardData
    .filter((data) => data.amount[selectedYear]?.[selectedMonth] !== undefined)
    .reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = {
          amount: item.amount[selectedYear]?.[selectedMonth] ?? 0,
          category,
          fill: categories.find(({ name }) => name === category)?.fill ?? "var(--color-primary)"
        };
      } else {
        acc[category].amount += item.amount[selectedYear]?.[selectedMonth] ?? 0;
      }
      return acc;
    }, {} as Record<string, { amount: number, category: string, fill: string }>)

  const onYearChange = (value: string) => {
    setSelectedYear(value);
    setSelectedMonth(dates.filter(({ year }) => year === value)[0].month);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your spending visualized</CardTitle>
        <CardDescription>
          <div className="flex justify-between items-center">
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
            <div>
              <SelectCustom
                items={[{ value: "pie", label: "Pie Chart" }, { value: "bar", label: "Bar Chart" }]}
                value={selectedChart}
                onChange={(value) => setSelectedChart(value as "pie" | "bar")}
              />
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedChart === "pie" ? (
          <PieChartCustom data={Object.values(dataForChart)} config={chartConfig} dataKey="amount" nameKey="category" className="h-[250px] w-[400px]" />
        ) : (
          <BarChartCustom data={Object.values(dataForChart)} config={chartConfig} dataKey="amount" nameKey="category" className="h-[250px] w-[400px]" />
        )}
      </CardContent>
    </Card>
  )
}
