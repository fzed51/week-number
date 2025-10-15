/**
 * @fileoverview Holiday Generator
 * Ce script permet de générer un fichier json dans le dossier public contenant 
 * les jours fériés par année pour la France.
 */

import fs from "node:fs"
import path from "node:path"

type Holiday = {
  date: string;
  localName: string;
}

type HolidaysByYear = {
  [year: number]: Holiday[];
}

/**
 * Classe pour calculer les jours fériés français
 */
class HolidayCalculator {
  
  /**
   * Nouvel An
   */
  static newYearsDay(year: number): Date {
    return new Date(year, 0, 1); // 1er janvier
  }

  /**
   * Calcul du dimanche de Pâques
   * Algorithme basé sur le code PHP fourni
   */
  static easterDay(year: number): Date {
    const n = year % 19;
    const c = Math.floor(year / 100);
    const u = year % 100;
    const s = Math.floor(c / 4);
    const t = c % 4;
    const p = Math.floor((c + 8) / 25);
    const q = Math.floor((c - p + 1) / 3);
    const e = (19 * n + c - s - q + 15) % 30;
    const b = Math.floor(u / 4);
    const d = u % 4;
    const L = (2 * t + 2 * b - e - d + 32) % 7;
    const h = Math.floor((n + 11 * e + 22 * L) / 451);
    const m = Math.floor((e + L - 7 * h + 114) / 31);
    const j = (e + L - 7 * h + 114) % 31;
    
    return new Date(year, m - 1, j + 1); // m-1 car les mois sont indexés à partir de 0 en JS
  }

  /**
   * Lundi de Pâques
   */
  static easterMonday(year: number): Date {
    const easter = this.easterDay(year);
    return new Date(easter.getTime() + 24 * 60 * 60 * 1000); // +1 jour
  }

  /**
   * Fête du travail - 1er mai
   */
  static mayDay(year: number): Date {
    return new Date(year, 4, 1); // 1er mai
  }

  /**
   * Armistice de 1945 - 8 mai
   */
  static armisticeDe1945(year: number): Date {
    return new Date(year, 4, 8); // 8 mai
  }

  /**
   * Ascension - 39 jours après Pâques
   */
  static ascension(year: number): Date {
    const easter = this.easterDay(year);
    return new Date(easter.getTime() + 39 * 24 * 60 * 60 * 1000);
  }

  /**
   * Pentecôte - 49 jours après Pâques
   */
  static pentecote(year: number): Date {
    const easter = this.easterDay(year);
    return new Date(easter.getTime() + 49 * 24 * 60 * 60 * 1000);
  }

  /**
   * Lundi de Pentecôte - 50 jours après Pâques
   */
  static lundiDePentecote(year: number): Date {
    const easter = this.easterDay(year);
    return new Date(easter.getTime() + 50 * 24 * 60 * 60 * 1000);
  }

  /**
   * Fête nationale - 14 juillet
   */
  static bastilleDay(year: number): Date {
    return new Date(year, 6, 14); // 14 juillet
  }

  /**
   * Assomption - 15 août
   */
  static assomption(year: number): Date {
    return new Date(year, 7, 15); // 15 août
  }

  /**
   * Toussaint - 1er novembre
   */
  static tousSaint(year: number): Date {
    return new Date(year, 10, 1); // 1er novembre
  }

  /**
   * Armistice de 1918 - 11 novembre
   */
  static armisticeDe1918(year: number): Date {
    return new Date(year, 10, 11); // 11 novembre
  }

  /**
   * Noël - 25 décembre
   */
  static christmasDay(year: number): Date {
    return new Date(year, 11, 25); // 25 décembre
  }

  /**
   * Génère tous les jours fériés pour une année donnée
   */
  static getHolidaysForYear(year: number): Holiday[] {
    const holidays: Holiday[] = [
      {
        date: this.formatDate(this.newYearsDay(year)),
        localName: "Nouvel An"
      },
      {
        date: this.formatDate(this.easterMonday(year)),
        localName: "Lundi de Pâques"
      },
      {
        date: this.formatDate(this.mayDay(year)),
        localName: "Fête du Travail"
      },
      {
        date: this.formatDate(this.armisticeDe1945(year)),
        localName: "Fête de la Victoire"
      },
      {
        date: this.formatDate(this.ascension(year)),
        localName: "Ascension"
      },
      {
        date: this.formatDate(this.lundiDePentecote(year)),
        localName: "Lundi de Pentecôte"
      },
      {
        date: this.formatDate(this.bastilleDay(year)),
        localName: "Fête Nationale"
      },
      {
        date: this.formatDate(this.assomption(year)),
        localName: "Assomption"
      },
      {
        date: this.formatDate(this.tousSaint(year)),
        localName: "Toussaint"
      },
      {
        date: this.formatDate(this.armisticeDe1918(year)),
        localName: "Armistice"
      },
      {
        date: this.formatDate(this.christmasDay(year)),
        localName: "Noël"
      }
    ];

    // Trier par date
    return holidays.sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Formate une date au format YYYY-MM-DD selon la locale de Paris
   */
  private static formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('-');
  }
}

/**
 * Génère le fichier JSON des jours fériés
 */
function generateHolidaysFile(): void {
  const currentYear = new Date().getFullYear();
  const startYear = 2011; // 5 années passées
  const endYear = currentYear + 10;   // 10 années futures
  
  const holidaysByYear: HolidaysByYear = {};
  
  for (let year = startYear; year <= endYear; year++) {
    holidaysByYear[year] = HolidayCalculator.getHolidaysForYear(year);
  }
  
  // Créer le dossier public s'il n'existe pas
  const publicDir = path.join('.', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Écrire le fichier JSON
  const filePath = path.join(publicDir, 'holidays.json');
  //fs.writeFileSync(filePath, JSON.stringify(holidaysByYear, null, 2), 'utf8');
  fs.writeFileSync(filePath, JSON.stringify(holidaysByYear), 'utf8');
  
  console.log(`✅ Fichier des jours fériés généré : ${filePath}`);
  console.log(`📅 Années couvertes : ${startYear} - ${endYear}`);
  console.log(`🎉 Total : ${Object.keys(holidaysByYear).length} années`);
}

// Exécuter le script
generateHolidaysFile();

