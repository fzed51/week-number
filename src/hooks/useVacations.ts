import { useEffect, useState } from "react"

type VacationEvent = {
  summary: string
  start: string
  end: string
  location?: string
}

export function useVacations() {
  const [vacations, setVacations] = useState<VacationEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Charger le fichier des vacances scolaires
    fetch("./vacation-calendar.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data: VacationEvent[]) => {
        setVacations(data)
        setError(null)
      })
      .catch(error => {
        console.error(
          "Erreur lors du chargement des vacances scolaires:",
          error
        )
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const isVacation = (date: Date): boolean => {
    const dateTime = date.getTime()

    return vacations.some(vacation => {
      const startTime = new Date(vacation.start).getTime()
      const endTime = new Date(vacation.end).getTime()

      // Vérifier si la date est dans la période de vacances (incluse)
      return dateTime >= startTime && dateTime <= endTime
    })
  }

  const getVacationPeriod = (date: Date): VacationEvent | null => {
    const dateTime = date.getTime()

    const vacation = vacations.find(vacation => {
      const startTime = new Date(vacation.start).getTime()
      const endTime = new Date(vacation.end).getTime()

      // Vérifier si la date est dans la période de vacances (incluse)
      return dateTime >= startTime && dateTime <= endTime
    })

    return vacation || null
  }

  const getUpcomingVacations = (count: number = 3): VacationEvent[] => {
    const now = Date.now()

    return vacations
      .filter(vacation => new Date(vacation.start).getTime() > now)
      .slice(0, count)
  }

  const getCurrentVacation = (): VacationEvent | null => {
    return getVacationPeriod(new Date())
  }

  const getVacationsByYear = (year: number): VacationEvent[] => {
    return vacations.filter(vacation => {
      const vacationYear = new Date(vacation.start).getFullYear()
      return vacationYear === year
    })
  }

  return {
    vacations,
    loading,
    error,
    isVacation,
    getVacationPeriod,
    getUpcomingVacations,
    getCurrentVacation,
    getVacationsByYear,
  }
}
