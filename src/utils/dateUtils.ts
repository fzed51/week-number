/**
 * Calcule le numéro de semaine pour une date donnée
 * @param date La date pour laquelle calculer le numéro de semaine
 * @returns Le numéro de semaine (1-52/53)
 */
export function getWeekNumber(date: Date): number {
  // Copie de la date pour éviter les effets de bord
  const d = new Date(date.getTime())

  // Régler l'heure à midi pour éviter les problèmes de changement d'heure
  d.setHours(12, 0, 0, 0)

  // Jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
  const dayOfWeek = d.getDay()

  // Convertir pour que lundi = 0, ..., dimanche = 6
  const mondayBasedDay = (dayOfWeek + 6) % 7

  // Trouver le jeudi de cette semaine
  const thursday = new Date(d)
  thursday.setDate(d.getDate() - mondayBasedDay + 3) // 3 = jeudi (lundi=0, mardi=1, mercredi=2, jeudi=3)

  // L'année ISO 8601 est l'année du jeudi de cette semaine
  const year = thursday.getFullYear()

  // Trouver le jeudi de la première semaine de cette année ISO
  const jan4 = new Date(year, 0, 4) // 4 janvier
  jan4.setHours(12, 0, 0, 0)

  const jan4DayOfWeek = jan4.getDay()
  const jan4MondayBased = (jan4DayOfWeek + 6) % 7

  // Le jeudi de la semaine contenant le 4 janvier
  const firstThursday = new Date(jan4)
  firstThursday.setDate(jan4.getDate() - jan4MondayBased + 3)

  // Calculer la différence en semaines
  const diffInMs = thursday.getTime() - firstThursday.getTime()
  const diffInWeeks = Math.round(diffInMs / (7 * 24 * 60 * 60 * 1000))

  return diffInWeeks + 1
}

/**
 * Calcule les dates de début et fin d'une semaine donnée
 * @param weekNumber Le numéro de semaine
 * @param year L'année
 * @returns Un objet contenant les dates de début et fin de semaine
 */
export function getWeekDates(
  weekNumber: number,
  year: number
): { start: Date; end: Date } {
  const firstDayOfYear = new Date(year, 0, 1)
  const daysToFirstWeek = (weekNumber - 1) * 7
  const firstWeekStart = new Date(
    firstDayOfYear.getTime() - (firstDayOfYear.getDay() - 1) * 86400000
  )
  const weekStart = new Date(
    firstWeekStart.getTime() + daysToFirstWeek * 86400000
  )
  const weekEnd = new Date(weekStart.getTime() + 6 * 86400000)

  return { start: weekStart, end: weekEnd }
}

/**
 * Obtient le nom du mois en français
 */
export function getMonthName(date: Date): string {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]
  return months[date.getMonth()]
}

/**
 * Génère les données du calendrier pour un mois donné
 */
export interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  weekNumber: number
}

export interface CalendarWeek {
  weekNumber: number
  days: CalendarDay[]
}

export function getCalendarData(date: Date): {
  month: string
  year: number
  weeks: CalendarWeek[]
} {
  const year = date.getFullYear()
  const month = date.getMonth()
  const monthName = getMonthName(date)

  // Premier jour du mois
  const firstDayOfMonth = new Date(year, month, 1)
  // Dernier jour du mois
  const lastDayOfMonth = new Date(year, month + 1, 0)

  // Premier lundi à afficher (peut être du mois précédent)
  const startDate = new Date(firstDayOfMonth)
  const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7 // Lundi = 0
  startDate.setDate(firstDayOfMonth.getDate() - firstDayWeekday)

  // Dernier dimanche à afficher (peut être du mois suivant)
  const endDate = new Date(lastDayOfMonth)
  const lastDayWeekday = (lastDayOfMonth.getDay() + 6) % 7 // Lundi = 0
  endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayWeekday))

  const weeks: CalendarWeek[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const weekNumber = getWeekNumber(currentDate)
    const days: CalendarDay[] = []

    // Générer les 7 jours de la semaine
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(currentDate)
      dayDate.setDate(currentDate.getDate() + i)

      days.push({
        date: new Date(dayDate),
        day: dayDate.getDate(),
        isCurrentMonth: dayDate.getMonth() === month,
        weekNumber: getWeekNumber(dayDate),
      })
    }

    weeks.push({ weekNumber, days })
    currentDate.setDate(currentDate.getDate() + 7)
  }

  return { month: monthName, year, weeks }
}
