import clsx from "clsx"
import { getCalendarData } from "../utils/dateUtils"
import { useHolidays } from "../hooks/useHolidays"
import { useVacations } from "../hooks/useVacations"

interface CalendarCardProps {
  currentDate: Date
}

export function CalendarCard({ currentDate }: CalendarCardProps) {
  const { isHoliday } = useHolidays()
  const { isVacation } = useVacations()
  
  const { month, year, weeks } = getCalendarData(currentDate)

  return (
    <div className={clsx("week-card", "calendar-card")}>
      <div className={clsx("header", "calendar-header")}>
        {month} {year}
      </div>
      <div className="calendar-container">
        <table className="calendar-table">
          <thead>
            <tr>
              <th className="week-column">n°</th>
              <th>Lu</th>
              <th>Ma</th>
              <th>Me</th>
              <th>Je</th>
              <th>Ve</th>
              <th>Sa</th>
              <th>Di</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map(week => (
              <tr key={week.weekNumber}>
                <td className="week-number-cell">{week.weekNumber}</td>
                {week.days.map((day, index) => {
                  const isCurrentDay =
                    day.date.toDateString() === currentDate.toDateString()
                  const isDayHoliday = isHoliday(day.date)
                  const isDayVacation = isVacation(day.date)
                  return (
                    <td
                      key={`${week.weekNumber}-${index}`}
                      className={clsx("calendar-day", {
                        "other-month": !day.isCurrentMonth,
                        "current-day": isCurrentDay,
                        "holiday": isDayHoliday,
                        "vacation": isDayVacation,
                      })}
                    >
                      {day.day}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
