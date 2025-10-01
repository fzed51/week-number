import clsx from "clsx"
import { getCalendarData } from "../utils/dateUtils"

interface CalendarCardProps {
  currentDate: Date
}

export function CalendarCard({ currentDate }: CalendarCardProps) {
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
                  return (
                    <td
                      key={`${week.weekNumber}-${index}`}
                      className={clsx("calendar-day", {
                        "other-month": !day.isCurrentMonth,
                        "current-day": isCurrentDay,
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
