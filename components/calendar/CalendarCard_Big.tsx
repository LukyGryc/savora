"use client";
//Had to name this file this way even though I don't know whether I will need a different calendar card, but CalendarCard was throwing error
import { Calendar, CalendarDayButton } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"

interface CalendarCard_BigProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

const CalendarCard_Big = ({ selectedDate, onSelect }: CalendarCard_BigProps) => {
  return (
    <Card className="mx-auto w-fit p-0 border-white">
      <CardContent className="p-0">
        <Calendar
          required
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          numberOfMonths={1}
          captionLayout="dropdown"
          className="[--cell-size:--spacing(16)] md:[--cell-size:--spacing(24)]"
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString("default", { month: "long" })
            },
          }}
          weekStartsOn={1}
          components={{
            DayButton: ({ children, day, ...props }) => {
              return (
                <CalendarDayButton day={day} {...props} >
                  <div className="flex flex-col gap-5">
                    {children}
                    <span>xdd</span>
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