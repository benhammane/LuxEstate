"use client";

import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={fr}
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col",
        month: "space-y-3",
        month_caption: "flex justify-center relative items-center h-9",
        caption_label: "text-sm font-medium capitalize",
        nav: "flex items-center gap-1 absolute inset-x-0 top-0 justify-between px-1",
        button_previous:
          "inline-flex size-8 items-center justify-center rounded-lg hover:bg-accent transition-colors",
        button_next:
          "inline-flex size-8 items-center justify-center rounded-lg hover:bg-accent transition-colors",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-9 text-[0.7rem] font-medium uppercase",
        week: "flex w-full mt-1",
        day: "size-9 text-center text-sm p-0 relative",
        day_button:
          "inline-flex size-9 items-center justify-center rounded-lg hover:bg-accent transition-colors aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:hover:bg-primary",
        today: "font-semibold text-primary",
        outside: "text-muted-foreground/40",
        disabled: "text-muted-foreground/30 pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  );
}
