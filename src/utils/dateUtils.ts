/**
 * Calcule le numéro de semaine pour une date donnée
 * @param date La date pour laquelle calculer le numéro de semaine
 * @returns Le numéro de semaine (1-52/53)
 */
export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
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
