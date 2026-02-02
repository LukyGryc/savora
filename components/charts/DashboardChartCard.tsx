"use client"

import BarChartCustom from "../dashboard/BarChartCustom"
import PieChartCustom from "../dashboard/PieChartCustom"
import SelectCustom from "../layout/SelectCustom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { type ChartConfig } from "../ui/chart"
import { categories, getDashboardData, getDateRange, getMonthName, getYears } from "../../lib/dashboard"
import { DataItem } from "../../server/items"
import { useEffect, useRef, useState } from "react"

const chartConfig = {
  amount: {
    label: "Amount"
  }
} satisfies ChartConfig

export function DashboardChartCard({ items, className }: { items: DataItem[], className?: string }) {
  const dashboardData = getDashboardData(items);
  const years = getYears(dashboardData);
  const dates = getDateRange(dashboardData);
  const latest = dates[dates.length - 1];

  const [selectedMonth, setSelectedMonth] = useState(latest.month);
  const [selectedYear, setSelectedYear] = useState(latest.year);
  const [selectedChart, setSelectedChart] = useState<("pie" | "bar")>("bar");

  //This is here just to determine whether to use horizontal or vertical bar chart
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const observedElement = useRef(null);

  useEffect(() => {
    if (observedElement.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      observer.observe(observedElement.current);

      // Cleanup function
      return () => {
        observer.disconnect();
      };
    }
  }, []);
  //---
  
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
    <Card ref={observedElement} className={className}>
      <CardHeader>
        <CardTitle>Your spending visualized</CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex gap-2">
              <SelectCustom
                items={dates.filter(({ year }) => year === selectedYear).map(({ month }) => ({ value: month, label: getMonthName(month) }))}
                value={selectedMonth}
                onChange={(value) => setSelectedMonth(value)}
                groupLabel="Month"
              />
              <SelectCustom
                items={years.map((year) => ({ value: year, label: year }))}
                value={selectedYear}
                onChange={onYearChange}
                groupLabel="Year"
              />
            </div>
            <div>
              <SelectCustom
                items={[{ value: "pie", label: "Pie Chart" }, { value: "bar", label: "Bar Chart" }]}
                value={selectedChart}
                onChange={(value) => setSelectedChart(value as "pie" | "bar")}
                groupLabel="Chart Type"
              />
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedChart === "pie" ? (
          <PieChartCustom
            data={Object.values(dataForChart)}
            config={chartConfig}
            dataKey="amount"
            nameKey="category"
            className="min-h-[150px]"
          />
        ) : (
          <BarChartCustom
            data={Object.values(dataForChart)}
            config={chartConfig}
            dataKey="amount"
            nameKey="category"
            className="min-h-[150px]"
            type={dimensions.width > 500 ? "horizontal" : "vertical"}
          />
        )}
      </CardContent>
    </Card>
  )
}
