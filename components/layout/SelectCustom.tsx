import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface SelectCustomProps {
    items: { value: string, label: string }[],
    value: string,
    onChange: (value: string) => void,
}

const SelectCustom = ({ items, value, onChange }: SelectCustomProps) => {
    return (
        <Select
            value={value}
            onValueChange={onChange}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select a Month" />
            </SelectTrigger>
            <SelectContent>
                {items.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SelectCustom