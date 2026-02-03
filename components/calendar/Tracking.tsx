"use client";
import { startTransition, useOptimistic } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { CircleXIcon, Edit2, PlusIcon } from "lucide-react";
import { addData, DataItem, deleteData, updateData } from "@/server/items";
import { formatAmountCurrency, getItemsForDate } from "@/lib/itemsUtil";
import { toast } from "sonner";
import ItemPopover, { AddNewItemFormSchema } from "./ItemPopover";
import { Button } from "../ui/button";
import { CreateDataItemInput } from "@/types/itemTypes";

interface TrackingProps {
    selectedDate: Date;
    items: DataItem[];
}

type OptimisticAction =
    | { type: "add"; item: DataItem }
    | { type: "edit"; id: string; data: AddNewItemFormSchema }
    | { type: "delete"; id: string };

function itemsReducer(currentItems: DataItem[], action: OptimisticAction): DataItem[] {
    switch (action.type) {
        case "add":
            return [...currentItems, action.item];
        case "edit":
            return currentItems.map((item) =>
                item.id === action.id
                    ? {
                        ...item,
                        name: action.data.name,
                        amount: action.data.amount,
                        categories: action.data.categories,
                    }
                    : item,
            );
        case "delete":
            return currentItems.filter((item) => item.id !== action.id);
        default:
            return currentItems;
    }
}

const Tracking = ({ selectedDate, items }: TrackingProps) => {
    const [optimisticItems, dispatchOptimistic] = useOptimistic(items, itemsReducer);

    const onDeleteItem = (id: string) => {
        startTransition(async () => {
            dispatchOptimistic({ type: "delete", id });

            const { success, message } = await deleteData(id);

            if (success) {
                toast.success(message);
            } else {
                toast.error(message);
                // Optimistic state reverts automatically when `items` prop doesn't change
            }
        });
    };

    const onEditItem = (data: AddNewItemFormSchema, id: string) => {
        startTransition(async () => {
            dispatchOptimistic({ type: "edit", id, data });

            const payload: Omit<CreateDataItemInput, "date"> = {
                name: data.name,
                amount: data.amount,
                categories: data.categories,
            };

            const { success, message } = await updateData(payload, id);

            if (success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        });
    };

    const onCreateItem = (data: AddNewItemFormSchema) => {
        startTransition(async () => {
            const optimisticItem: DataItem = {
                id: `temp-${Date.now()}`,
                userId: "optimistic",
                name: data.name,
                amount: data.amount,
                categories: data.categories,
                date: selectedDate,
                createdAt: new Date(),
            };

            dispatchOptimistic({ type: "add", item: optimisticItem });

            const item: CreateDataItemInput = {
                name: data.name,
                amount: data.amount,
                categories: data.categories,
                date: selectedDate,
            };

            const { success, message } = await addData(item);

            if (success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        });
    };

    const itemsForDate = getItemsForDate(optimisticItems, selectedDate);

    return (
        <Card className="flex flex-col lg:w-[400px] w-full">
            <CardHeader>
                <CardTitle className="text-base md:text-xl">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </CardTitle>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent>
                {itemsForDate.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-row gap-2 justify-between border border-border border-muted-foreground rounded-md p-3 mb-2 pb-2 hover:bg-accent/50 transition-colors text-sm sm:text-base"
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <p>{item.name}</p>
                            <div title="Edit">
                                <ItemPopover
                                    popoverTrigger={
                                        <Edit2 className="w-4 h-4 text-primary hover:text-primary/80 transition-colors cursor-pointer" />
                                    }
                                    onSubmit={(data) => onEditItem(data, item.id)}
                                    item={item}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 items-center">
                            <p>{formatAmountCurrency(item.amount)}</p>
                            <div title="Delete">
                                <CircleXIcon
                                    className="w-4 h-4 text-destructive hover:text-destructive/80 transition-colors cursor-pointer"
                                    onClick={() => onDeleteItem(item.id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <ItemPopover
                    popoverTrigger={
                        <Button variant="primary">
                            <PlusIcon /> Add Item
                        </Button>
                    }
                    onSubmit={onCreateItem}
                />
            </CardFooter>
        </Card>
    );
};

export default Tracking;