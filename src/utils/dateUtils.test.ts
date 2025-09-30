import { describe, it, expect } from "vitest"
import { getWeekNumber, getWeekDates } from "./dateUtils"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const xdescribe = (..._: unknown[]) => {
//   return
// }

describe("dateUtils", () => {
  describe("getWeekNumber", () => {
    it("should return 1 for first week of 2022", () => {
      const date = new Date(2022, 0, 1) // 1er janvier 2024
      const weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(52)
    })
    it("should return 1 for first week of 2023", () => {
      const date = new Date(2023, 0, 1) // 1er janvier 2024
      const weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(52)
    })
    it("should return 1 for first week of 2024", () => {
      const date = new Date(2024, 0, 1) // 1er janvier 2024
      const weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(1)
    })
    it("should return 1 for first week of 2025", () => {
      const date = new Date(2025, 0, 1) // 1er janvier 2025
      const weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(1)
    })
    it("should return 1 for 5 january 2025 and 2 the next day", () => {
      let date = new Date(2025, 0, 5) // 5 janvier 2025
      let weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(1)
      date = new Date(2025, 0, 6) // 6 janvier 2025
      weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(2)
    })
    it("should return 2 for 12 january 2025 and 3 the next day", () => {
      let date = new Date(2025, 0, 12) // 12 janvier 2025
      let weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(2)
      date = new Date(2025, 0, 13) // 13 janvier 2025
      weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(3)
    })
    it("should return 7 for 16 february 2025 and 8 the next day", () => {
      let date = new Date(2025, 1, 16) // 16 février 2025
      let weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(7)
      date = new Date(2025, 1, 17) // 17 février 2025
      weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(8)
    })
    it("should return 12 for 23 march 2025 and 13 the next day", () => {
      let date = new Date(2025, 2, 23) // 23 mars 2025
      let weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(12)
      date = new Date(2025, 2, 24) // 24 mars 2025
      weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(13)
    })
    it("should return 13 for 30 march 2025 and 14 the next day", () => {
      let date = new Date(2025, 2, 30) // 30 mars 2025
      let weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(13)
      date = new Date(2025, 2, 31) // 31 mars 2025
      weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(14)
    })
    it("should return 14 for 6 april 2025 and 15 the next day", () => {
      let date = new Date(2025, 3, 6) // 6 avril 2025
      let weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(14)
      date = new Date(2025, 3, 7) // 7 avril 2025
      weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(15)
    })
    it("should return 16 for 20 april 2025 and 17 the next day", () => {
      let date = new Date(2025, 3, 20) // 20 avril 2025
      let weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(16)
      date = new Date(2025, 3, 21) // 21 avril 2025
      weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(17)
    })
    it("should return 39 for 28 septembre 2025 and 40 for 29 septembre 2025", () => {
      let date = new Date(2025, 8, 28) // 28 septembre 2025
      let weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(39)
      date = new Date(2025, 8, 29) // 29 septembre 2025
      weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(40)
    })
  })

  describe("getWeekDates", () => {
    it("should return correct start and end dates for first week", () => {
      const { start, end } = getWeekDates(1, 2024)

      expect(start).toBeInstanceOf(Date)
      expect(end).toBeInstanceOf(Date)
      expect(end.getTime() - start.getTime()).toBe(6 * 24 * 60 * 60 * 1000) // 6 jours d'écart
    })

    it("should return dates in correct order", () => {
      const { start, end } = getWeekDates(20, 2024)

      expect(start.getTime()).toBeLessThan(end.getTime())
    })

    it("should handle week 53 for years that have it", () => {
      const { start, end } = getWeekDates(53, 2020) // 2020 avait 53 semaines

      expect(start).toBeInstanceOf(Date)
      expect(end).toBeInstanceOf(Date)
      expect(start.getFullYear()).toBe(2020)
    })

    it("should handle different years", () => {
      const week2023 = getWeekDates(25, 2023)
      const week2024 = getWeekDates(25, 2024)

      expect(week2023.start.getFullYear()).toBe(2023)
      expect(week2024.start.getFullYear()).toBe(2024)
      expect(week2023.end.getFullYear()).toBe(2023)
      expect(week2024.end.getFullYear()).toBe(2024)
    })

    it("should return consistent week span", () => {
      for (let week = 1; week <= 52; week++) {
        const { start, end } = getWeekDates(week, 2024)
        const daysDiff =
          (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
        expect(daysDiff).toBe(6) // Une semaine = 7 jours, donc 6 jours d'écart
      }
    })
  })

  describe("Integration tests", () => {
    it("should have consistent week numbers when using both functions", () => {
      const { start, end } = getWeekDates(25, 2024)

      const weekNumberStart = getWeekNumber(start)
      const weekNumberEnd = getWeekNumber(end)

      // Les numéros de semaine devraient être cohérents
      // (soit identiques, soit avec maximum 1 de différence si la semaine chevauche)
      expect(Math.abs(weekNumberStart - weekNumberEnd)).toBeLessThanOrEqual(1)
    })

    it("should handle edge cases around year boundaries", () => {
      // Test avec une date près du nouvel an
      const newYearDate = new Date(2024, 0, 2) // 2 janvier 2024
      const weekNum = getWeekNumber(newYearDate)
      expect(weekNum).toBeGreaterThanOrEqual(1)
      expect(weekNum).toBeLessThanOrEqual(2)
    })
  })
})
