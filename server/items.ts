"use server";

import { db } from "@/db/drizzle";
import { dataTable } from "@/db/schema";
import { getUserID } from "@/util/userUtil";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface DataItem {
    name: string;
    amount: number;
    categories: string[];
    date: Date;
}

export const addData = async (item: DataItem) => {

    try {
        const userId = await getUserID();
        await db
            .insert(dataTable)
            .values({
                userId: userId,
                date: item.date,
                name: item.name,
                amount: item.amount,
                categories: item.categories,
            })

        revalidatePath("/calendar");

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

export const updateData = async (item: DataItem, id: string) => {

    try {
        const userId = await getUserID();
        await db
            .update(dataTable)
            .set({
                name: item.name,
                amount: item.amount,
                categories: item.categories
            })
            .where(and(eq(dataTable.id, id), eq(dataTable.userId, userId)));

        revalidatePath("/calendar");

        return {
            success: true,
            message: "Item updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to update item",
        };
    }
}

export const deleteData = async (id: string) => {

    try {

        const userId = await getUserID();

        await db
            .delete(dataTable)
            .where(and(eq(dataTable.id, id), eq(dataTable.userId, userId)));

        revalidatePath("/calendar");

        return {
            success: true,
            message: "Item deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to delete item",
        };
    }
}

export async function getItemsForUser() {
    const userId = await getUserID();
    return db
        .select()
        .from(dataTable)
        .where(eq(dataTable.userId, userId));
}