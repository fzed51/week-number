import { useRef, useState } from "react"
import "./App.css"
import { CalendarCard } from "./components/CalendarCard"
import { WeekCard } from "./components/WeekCard"

export function App() {
  const [currentView, setCurrentView] = useState<1 | 2>(1)
  const lastTapRef = useRef<number>(0)
  const currentDate = new Date()

  const switchView = () => {
    setCurrentView(prev => (prev === 1 ? 2 : 1))
  }

  const handleDoubleClick = () => {
    switchView()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now()
    const timeSinceLastTap = now - lastTapRef.current

    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double tap détecté
      e.preventDefault()
      switchView()
    }

    lastTapRef.current = now
  }

  return (
    <div
      className="app"
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
    >
      {currentView === 1 ? (
        <WeekCard currentDate={currentDate} />
      ) : (
        <CalendarCard currentDate={currentDate} />
      )}
    </div>
  )
}
