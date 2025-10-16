import clsx from "clsx"
import { useState } from "react"
import { useHolidays } from "../hooks/useHolidays"
import { useVacations } from "../hooks/useVacations"
import { getCalendarData } from "../utils/dateUtils"

interface CalendarCardProps {
  currentDate: Date
}

export function CalendarCard({ currentDate }: CalendarCardProps) {
  // État interne pour la navigation du calendrier
  const [calendarDate, setCalendarDate] = useState(currentDate)
  const { isHoliday } = useHolidays()
  const { isVacation } = useVacations()

  const { month, year, weeks } = getCalendarData(calendarDate)

  const goToPreviousMonth = () => {
    setCalendarDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const goToNextMonth = () => {
    setCalendarDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  return (
    <div className={clsx("week-card", "calendar-card")}>
      <div className={clsx("header", "calendar-header")}>
        <button
          type="button"
          className="nav-button nav-button-prev"
          onClick={goToPreviousMonth}
          aria-label="Mois précédent"
        >
          ‹
        </button>
        <span className="month-year">
          {month} {year}
        </span>
        <button
          type="button"
          className="nav-button nav-button-next"
          onClick={goToNextMonth}
          aria-label="Mois suivant"
        >
          ›
        </button>
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
                        holiday: isDayHoliday,
                        vacation: isDayVacation,
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
