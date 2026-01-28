"use client";

import CalendarCard_Big from "@/components/calendar/CalendarCard_Big";
import Tracking from "@/components/calendar/Tracking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(new Date().getFullYear(), 1, 3));

  return (
    <div className="bg-bg-primary w-fit flex-1 mx-auto py-10 content-center">
      <div className="w-fit flex-col lg:flex-row gap-10 flex">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarCard_Big
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
            />
          </CardContent>
        </Card>
        <Tracking selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default CalendarPage;