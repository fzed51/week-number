import { FormattedDate } from "./FormattedDate"
import { getWeekDates, getWeekNumber } from "../utils/dateUtils"

interface WeekCardProps {
  currentDate: Date
}

export function WeekCard({ currentDate }: WeekCardProps) {
  const weekNumber = getWeekNumber(currentDate)
  const { start, end } = getWeekDates(weekNumber, currentDate.getFullYear())

  return (
    <div className="week-card">
      <div className="header">Numéro de semaine</div>
      <div className="week-number">{weekNumber}</div>
      <div className="week-info">
        Cette semaine commence <FormattedDate date={start} /> et finie le{" "}
        <FormattedDate date={end} />
      </div>
    </div>
  )
}
