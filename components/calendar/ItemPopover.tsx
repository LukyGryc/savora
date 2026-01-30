"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomController from "../common/CustomController";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { JSX } from "react";
import { DataItem } from "@/server/items";
import { categories } from "@/lib/dashboard";

interface Props {
    popoverTrigger: JSX.Element,
    onSubmit: (data: AddNewItemFormSchema) => void
    item?: DataItem
}

const formSchema = z.object({
    name: z
        .string()
        .min(1, "Name must be at least 1 character."),
    // allow decimals, minimum $0.01
    amount: z
        .number({ error: "Must be a number" })
        .min(0.01, "Amount must be at least 0.01."),
    categories: z
        .array(z.string())
});

export type AddNewItemFormSchema = z.infer<typeof formSchema>;

const ItemPopover = ({ popoverTrigger, onSubmit, item }: Props) => {
    const form = useForm<AddNewItemFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: item?.name ?? "",
            amount: item?.amount ?? 1,
            categories: item?.categories ?? [categories[0].name],
        },
    })


    const onSubmitHandler = (data: AddNewItemFormSchema) => {
        onSubmit(data);
        form.reset();
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                { popoverTrigger }
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-70">
                <form id="add-new-item-form" onSubmit={form.handleSubmit(onSubmitHandler)}>
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
                                                    {categories.map(({ name }) => (
                                                        <SelectItem key={name} value={name}>
                                                            {name}
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

export default ItemPopover