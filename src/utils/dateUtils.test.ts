import { describe, it, expect } from "vitest"
import { getWeekNumber, getWeekDates } from "../utils/dateUtils"

describe("dateUtils", () => {
  describe("getWeekNumber", () => {
    it("should return 1 for first week of the year", () => {
      const date = new Date(2024, 0, 1) // 1er janvier 2024
      const weekNumber = getWeekNumber(date)
      expect(weekNumber).toBe(1)
    })

    it("should return correct week number for mid-year date", () => {
      const date = new Date(2024, 5, 15) // 15 juin 2024
      const weekNumber = getWeekNumber(date)
      expect(weekNumber).toBeGreaterThan(20)
      expect(weekNumber).toBeLessThan(30)
    })

    it("should return correct week number for end of year", () => {
      const date = new Date(2024, 11, 31) // 31 décembre 2024
      const weekNumber = getWeekNumber(date)
      expect(weekNumber).toBeGreaterThan(50)
    })

    it("should handle leap year correctly", () => {
      const date = new Date(2024, 1, 29) // 29 février 2024 (année bissextile)
      const weekNumber = getWeekNumber(date)
      expect(weekNumber).toBeGreaterThan(0)
      expect(weekNumber).toBeLessThan(54)
    })

    it("should handle different years consistently", () => {
      const date2023 = new Date(2023, 6, 15) // 15 juillet 2023
      const date2024 = new Date(2024, 6, 15) // 15 juillet 2024

      const week2023 = getWeekNumber(date2023)
      const week2024 = getWeekNumber(date2024)

      // Les deux devraient être dans la même plage (autour de la semaine 28-30)
      expect(Math.abs(week2023 - week2024)).toBeLessThan(3)
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
