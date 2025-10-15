import { useState, useEffect } from "react"

type Holiday = {
  date: string;
  localName: string;
}

type HolidaysByYear = {
  [year: number]: Holiday[];
}

export function useHolidays() {
  const [holidays, setHolidays] = useState<HolidaysByYear>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Charger le fichier des jours fériés
    fetch('./holidays.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data: HolidaysByYear) => {
        setHolidays(data)
        setError(null)
      })
      .catch(error => {
        console.error('Erreur lors du chargement des jours fériés:', error)
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const isHoliday = (date: Date): boolean => {
    const year = date.getFullYear()
    const dateStr = date.toLocaleDateString('fr-FR', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('-') // Format YYYY-MM-DD avec locale Paris
    
    if (!holidays[year]) return false
    
    return holidays[year].some(holiday => holiday.date === dateStr)
  }

  const getHolidayName = (date: Date): string | null => {
    const year = date.getFullYear()
    const dateStr = date.toLocaleDateString('fr-FR', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('-') // Format YYYY-MM-DD avec locale Paris
    
    if (!holidays[year]) return null
    
    const holiday = holidays[year].find(holiday => holiday.date === dateStr)
    return holiday ? holiday.localName : null
  }

  return {
    holidays,
    loading,
    error,
    isHoliday,
    getHolidayName
  }
}