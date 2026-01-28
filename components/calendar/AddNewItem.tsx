"use client";
import { Label } from "@radix-ui/react-label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue, useComboboxAnchor } from "../ui/combobox";

interface Props {
    selectedDate: Date
}

const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
];

const AddNewItem = ({ selectedDate }: Props) => {

    const anchor = useComboboxAnchor()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="primary"><PlusIcon /> Add Item</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-90">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="amount">Amount ($)</Label>
                            <Input
                                id="amount"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="amount">Categories</Label>
                            <div className="col-span-2">
                                <Combobox
                                    multiple
                                    autoHighlight
                                    items={frameworks}
                                    defaultValue={[frameworks[0]]}
                                >
                                    <ComboboxChips ref={anchor}>
                                        <ComboboxValue>
                                            {(values) => (
                                                <>
                                                    {values.map((value: string) => (
                                                        <ComboboxChip key={value}>{value}</ComboboxChip>
                                                    ))}
                                                    <ComboboxChipsInput />
                                                </>
                                            )}
                                        </ComboboxValue>
                                    </ComboboxChips>
                                    <ComboboxContent anchor={anchor}>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item} value={item}>
                                                    {item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                        </div>
                    </div>
                </div>
                <Button variant="primary" className="mt-4">Add Item</Button>
            </PopoverContent>
        </Popover>
    )
}

export default AddNewItem