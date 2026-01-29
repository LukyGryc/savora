"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { format } from "date-fns"
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

const Tracking = ({ selectedDate, items }: TrackingProps) => {

    const onDeleteItem = async(id: string) => {
        const { success, message } = await deleteData(id);
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    }

    const onEditItem = async(data: AddNewItemFormSchema, id: string) => {
        
        const item: CreateDataItemInput = {
            name: data.name,
            amount: data.amount,
            categories: data.categories,
            date: selectedDate,
        }

        const { success, message } = await updateData(item, id);
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    }

    const onCreateItem = async (data: AddNewItemFormSchema) => {

        const item: CreateDataItemInput = {
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
    
    const itemsForDate = getItemsForDate(items, selectedDate);

    return (
        <Card className="flex flex-col min-w-[400px]">
            <CardHeader>
                <CardTitle>Selected Day</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-lg font-medium text-card-foreground">
                        {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </p>
                </div>
                <Separator className="my-4" />
                {itemsForDate.map((item) => (
                    <div key={item.id} className="flex flex-row gap-2 justify-between border border-border border-muted-foreground rounded-md p-3 mb-2 pb-2 hover:bg-accent/50 transition-colors">
                        <div className="flex flex-row gap-2 items-center">
                            <p>{item.name}</p>
                            <div title="Edit">
                                <ItemPopover 
                                    popoverTrigger={<Edit2 className="w-4 h-4 text-primary hover:text-primary/80 transition-colors cursor-pointer" />}
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
                <ItemPopover 
                    popoverTrigger={<Button variant="primary"><PlusIcon /> Add Item</Button>}
                    onSubmit={onCreateItem}
                />
            </CardContent>
        </Card>
    )
}

export default Tracking