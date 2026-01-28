"use server";

import { Item } from "@/components/calendar/AddNewItem";
import { db } from "@/db/drizzle";
import { dataTable } from "@/db/schema";

export const addData = async (item: Item) => {

    try {
        await db.insert(dataTable).values({
            email: item.email,
            date: item.date.toISOString(),
            name: item.name,
            amount: item.amount,
            categories: item.categories,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return {
            success: true,
            message: "Item added successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to add item",
        };
    }
}