import "./App.css"
import { getWeekDates, getWeekNumber } from "./utils/dateUtils"
import { FormattedDate } from "./components/FormattedDate"

export function App() {
  const currentDate = new Date()
  const weekNumber = getWeekNumber(currentDate)
  const { start, end } = getWeekDates(weekNumber, currentDate.getFullYear())

  return (
    <div className="app">
      <div className="week-card">
        <div className="header">Numéro de semaine</div>
        <div className="week-number">{weekNumber}</div>
        <div className="week-info">
          Cette semaine commence{" "}
          <FormattedDate date={start} />{" "}
          et finie le{" "}
          <FormattedDate date={end} />
        </div>
      </div>
    </div>
  )
}
