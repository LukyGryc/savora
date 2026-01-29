"use client";

import CalendarCard_Big from "@/components/calendar/CalendarCard_Big";
import Tracking from "@/components/calendar/Tracking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataItem } from "@/server/items";
import { useState } from "react";

const CalendarContent = ({ items }: { items: DataItem[] }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <div className="w-fit flex-col lg:flex-row gap-10 flex">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                    <CalendarCard_Big
                        selectedDate={selectedDate}
                        onSelect={setSelectedDate}
                        items={items}
                    />
                </CardContent>
            </Card>
            <Tracking selectedDate={selectedDate} items={items}/>
        </div>
    )
}

export default CalendarContent