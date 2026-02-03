"use client";
import { DataItem } from "@/server/items";
//Had to name this file this way even though I don't know whether I will need a different calendar card, but CalendarCard was throwing error
import { Calendar, CalendarDayButton } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"
import { formatAmountCurrency, getItemsForDate } from "@/lib/itemsUtil";
import { getMonthName } from "@/lib/dashboard";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarCard_BigProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  items: DataItem[];
}

const CalendarCard_Big = ({ selectedDate, onSelect, items }: CalendarCard_BigProps) => {

  return (
    <Card className="w-fit p-0 border-white">
      <CardContent className="p-0">
        <Calendar
          //2026 app start
          startMonth={new Date("2026-01-01")}
          //Current year +1 so you can "predict" or "plan" even for next year
          endMonth={new Date(`${new Date().getFullYear()+1}-12-31`)}
          required
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          numberOfMonths={1}
          captionLayout="dropdown"
          className="[--cell-size:--spacing(6)] sm:[--cell-size:--spacing(12)] lg:[--cell-size:--spacing(16)] xl:[--cell-size:--spacing(24)]"
          formatters={{
            formatMonthDropdown: (date) => getMonthName(date.getMonth().toString()),
          }}
          weekStartsOn={1}
          components={{
            //Hotfix for mobile so the dropdown and chevrons don't overlap
            Chevron({ orientation, className, ...props }) {
              return orientation === "right" 
              ? <ChevronRightIcon {...props} className={cn(className, "hidden md:block")} /> 
              : <ChevronLeftIcon className={cn(className, "hidden md:block")} {...props} />
            },
            DayButton: ({ children, day, ...props }) => {
              const amount = getItemsForDate(items, day.date).reduce((acc, item) => acc + item.amount, 0);
              return (
                <CalendarDayButton day={day} {...props} >
                  <div className="flex flex-col gap-5 text-xs md:text-base">
                    {children}
                    <span className="hidden md:block text-xs">{amount === 0 ? "" : formatAmountCurrency(amount)}</span>
                  </div>
                </CalendarDayButton>
              )
            },
          }}
        />
      </CardContent>
    </Card>
  )
}

export default CalendarCard_Big