"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomController from "../common/CustomController";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { addData, DataItem } from "@/server/items";
import { toast } from "sonner";

interface Props {
    selectedDate: Date
}

//TODO: Make categories user specific
const categories = [
    "Food",
    "Transportation",
    "Housing",
    "Utilities",
    "Entertainment",
    "Health",
    "Education",
    "Travel",
    "Other"
];

const formSchema = z.object({
    name: z
        .string()
        .min(1, "Name must be at least 1 character."),
    amount: z
        .number({ error: "Must be a number" })
        .min(1, "Amount must be at least 1."),
    categories: z
        .array(z.string())
});

export type AddNewItemFormSchema = z.infer<typeof formSchema>;


const AddNewItem = ({ selectedDate }: Props) => {
    const form = useForm<AddNewItemFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: 1,
            categories: [categories[0]],
        },
    })

    const onSubmit = async (data: AddNewItemFormSchema) => {

        const item: DataItem = {
            name: data.name,
            amount: data.amount,
            categories: data.categories,
            date: selectedDate,
        }

        const { success, message } = await addData(item);
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="primary"><PlusIcon /> Add Item</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-70">
                <form id="add-new-item-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <CustomController form={form} name="name" label="Name" type="text" placeholder="Name" />
                            <CustomController form={form} name="amount" label="Amount ($)" type="number" placeholder="Amount" />

                            <Controller
                                control={form.control}
                                name="categories"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="text-white">
                                            Category
                                        </FieldLabel>

                                        <Select
                                            value={field.value?.[0] ?? categories[0]}
                                            onValueChange={(value) => field.onChange([value])}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </div>
                    </div>
                    <Button variant="primary" className="mt-4" form="add-new-item-form" type="submit">Add Item</Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default AddNewItem