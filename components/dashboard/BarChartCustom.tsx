import { Bar, BarChart, XAxis, YAxis } from "recharts"
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
    className?: string,
    type: "horizontal" | "vertical"
}

const BarChartCustom = ({ data, config, dataKey, nameKey, className, type }: Props) => {

    const getXAxis = () => {
        if (type === "vertical") {
            return <XAxis type="number" dataKey={dataKey} />
        } else {
            return <XAxis type="category" dataKey={nameKey} />
        }
    }

    const getYAxis = () => {
        if (type === "vertical") {
            return <YAxis
                type="category"
                dataKey={nameKey}
                tickFormatter={(value) => {
                    if (typeof value !== "string") return "";
                    return value.length > 8 ? `${value.slice(0, 8)}...` : value
                }}
            />
        } else {
            return <YAxis type="number" dataKey={dataKey} />
        }
    }

    const getChartHeight = () => {
        if (type === "vertical") {
            return data.length * 50 + 150
        } else {
            return 150
        }
    }

    return (
        <ChartContainer
            config={config}
            //Had to add the aspect-auto w-full because the chart was not being displayed correctly on mobile, trying to preserve the original 16:9 ratio
            className={type === "vertical" ? `aspect-auto w-full ${className ?? ""}`.trim() : className}
            style={type === "vertical" ? { height: getChartHeight(), width: "100%" } : undefined}
        >
            <BarChart
                accessibilityLayer
                data={data}
                layout={type}
            >
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel formatter={(value) => (
                        <div className="flex flex-col gap-2">
                            <span>{config.amount.label}</span>
                            <span>{formatAmountCurrency(value as number)}</span>
                        </div>
                    )} />}
                />
                {getXAxis()}
                {getYAxis()}
                <Bar dataKey={dataKey} radius={4} />
            </BarChart>
        </ChartContainer>
    )
}

export default BarChartCustom