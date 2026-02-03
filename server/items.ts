"use server";

import { db } from "@/db/drizzle";
import { dataTable } from "@/db/schema";
import { getUserID } from "@/server/users";
import { CreateDataItemInput } from "@/types/itemTypes";
import { and, asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface DataItem {
  id: string;
  userId: string;
  name: string;
  amount: number;
  categories: string[];
  date: Date;
  createdAt: Date;
}

const userNotFound = {
    success: false,
    message: "User not found",
};

export const addData = async (item: CreateDataItemInput) => {

    try {
        const userId = await getUserID();

        if(!userId) {
            return userNotFound;
        }
        
        await db
            .insert(dataTable)
            .values({
                userId: userId,
                date: item.date,
                name: item.name,
                // Ensure numeric value is passed as string matching numeric column
                amount: Number(item.amount).toFixed(2),
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

export const updateData = async (item: Omit<CreateDataItemInput, "date">, id: string) => {

    try {
        const userId = await getUserID();

        if(!userId) {
            return userNotFound;
        }

        await db
            .update(dataTable)
            .set({
                name: item.name,
                amount: Number(item.amount).toFixed(2),
                categories: item.categories,
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

        if(!userId) {
            return userNotFound;
        }

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

export async function getItemsForUser(): Promise<DataItem[]> {
    const userId = await getUserID();

    if(!userId) {
        return [];
    }

    const rows = await db
        .select()
        .from(dataTable)
        .where(eq(dataTable.userId, userId))
        .orderBy(asc(dataTable.createdAt));

    return rows.map((r: any) => ({
        ...r,
        date: new Date(r.date),
        amount: typeof r.amount === "string" ? Number(r.amount) : r.amount,
    }));
}