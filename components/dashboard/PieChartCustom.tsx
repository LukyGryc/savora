import { Legend, Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
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

const PieChartCustom = ({ data, config, dataKey, nameKey, className }: Props) => {
    return (
        <ChartContainer config={config} className={className}>
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel formatter={(value) => (
                        <div className="flex flex-col gap-2">
                            <span>{config.amount.label}</span>
                            <span>{formatAmountCurrency(value as number)}</span>
                        </div>
                    )} />}
                />
                <Pie data={data} dataKey={dataKey} nameKey={nameKey} />
                <Legend />
            </PieChart>
        </ChartContainer>
    )
}

export default PieChartCustom