import { Bar, BarChart, Legend, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { formatAmountCurrency } from "@/lib/itemsUtil"

interface Props {
    data: {
        amount: number
        category: string
        fill: string
    }[],
    config: ChartConfig,
    dataKey: string,
    nameKey: string,
    className?: string
}

const BarChartCustom = ({ data, config, dataKey, nameKey, className }: Props) => {
    return (
        <ChartContainer config={config} className={className}>
            <BarChart accessibilityLayer data={data} >
                <XAxis
                    dataKey={nameKey}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />

                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel formatter={(value) => (
                        <div className="flex flex-col gap-2">
                            <span>{config.amount.label}</span>
                            <span>{formatAmountCurrency(value as number)}</span>
                        </div>
                    )} />}
                />
                <Bar dataKey={dataKey} radius={4} />
            </BarChart>
        </ChartContainer>
    )
}

export default BarChartCustom