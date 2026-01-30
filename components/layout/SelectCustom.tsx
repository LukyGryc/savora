import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface SelectCustomProps {
    items: { value: string, label: string }[],
    value: string,
    onChange: (value: string) => void,
    groupLabel: string
}

const SelectCustom = ({ items, value, onChange, groupLabel }: SelectCustomProps) => {
    return (
        <Select
            value={value}
            onValueChange={onChange}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select a Month" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{groupLabel}</SelectLabel>
                    {items.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectCustom