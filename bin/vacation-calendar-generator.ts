#!/usr/bin/env tsx

import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as ical from 'node-ical';

interface VacationEvent {
  id: string;
  summary: string;
  description?: string;
  start: string;
  end: string;
  location?: string;
  categories?: string[];
}

interface VacationCalendar {
  source: string;
  generatedAt: string;
  events: VacationEvent[];
}

interface ICalEvent {
  type?: string;
  uid?: string;
  summary?: string;
  description?: string;
  start?: Date;
  end?: Date;
  location?: string;
  categories?: string[];
}

interface ICalData {
  [key: string]: ICalEvent;
}

/**
 * Télécharge et parse un fichier iCal depuis une URL
 */
async function fetchIcalData(url: string): Promise<ICalData> {
  console.log(`📥 Téléchargement du calendrier depuis: ${url}`);
  
  try {
    const data = await ical.fromURL(url);
    console.log(`✅ Calendrier téléchargé avec succès`);
    return data as ICalData;
  } catch (error) {
    console.error(`❌ Erreur lors du téléchargement:`, error);
    throw error;
  }
}

/**
 * Convertit les données iCal en format JSON structuré
 */
function convertIcalToJson(icalData: ICalData, sourceUrl: string): VacationCalendar {
  const events: VacationEvent[] = [];
  
  console.log(`🔄 Conversion des événements...`);
  
  for (const key in icalData) {
    const event = icalData[key];
    
    // Ne traiter que les événements (pas les métadonnées du calendrier)
    if (event.type === 'VEVENT') {
      const vacationEvent: VacationEvent = {
        id: event.uid || key,
        summary: event.summary || 'Événement sans titre',
        start: event.start?.toISOString() || '',
        end: event.end?.toISOString() || '',
      };
      
      // Ajouter les champs optionnels s'ils existent
      if (event.description) {
        vacationEvent.description = event.description;
      }
      
      if (event.location) {
        vacationEvent.location = event.location;
      }
      
      if (event.categories && Array.isArray(event.categories)) {
        vacationEvent.categories = event.categories;
      }
      
      events.push(vacationEvent);
    }
  }
  
  // Trier les événements par date de début
  events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  
  console.log(`✅ ${events.length} événements convertis`);
  
  return {
    source: sourceUrl,
    generatedAt: new Date().toISOString(),
    events,
  };
}

/**
 * Sauvegarde les données JSON dans un fichier
 */
async function saveJsonFile(data: VacationCalendar, outputPath: string): Promise<void> {
  try {
    const jsonContent = JSON.stringify(data, null, 2);
    await writeFile(outputPath, jsonContent, 'utf-8');
    console.log(`💾 Fichier JSON sauvegardé: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Erreur lors de la sauvegarde:`, error);
    throw error;
  }
}

/**
 * Fonction principale
 */
async function main() {
  const ICAL_URL = 'https://fr.ftp.opendatasoft.com/openscol/fr-en-calendrier-scolaire/Zone-B.ics';
  const OUTPUT_FILE = join(process.cwd(), 'public', 'vacation-calendar.json');
  
  console.log('🚀 Générateur de calendrier de vacances scolaires');
  console.log('=' .repeat(50));
  
  try {
    // 1. Télécharger et parser le fichier iCal
    const icalData = await fetchIcalData(ICAL_URL);
    
    // 2. Convertir en JSON
    const jsonData = convertIcalToJson(icalData, ICAL_URL);
    
    // 3. Sauvegarder le fichier JSON
    await saveJsonFile(jsonData, OUTPUT_FILE);
    
    console.log('=' .repeat(50));
    console.log('🎉 Conversion terminée avec succès !');
    console.log(`📊 Statistiques:`);
    console.log(`   - Événements traités: ${jsonData.events.length}`);
    console.log(`   - Fichier de sortie: ${OUTPUT_FILE}`);
    console.log(`   - Généré le: ${jsonData.generatedAt}`);
    
    // Afficher un aperçu des prochains événements
    const now = new Date();
    const upcomingEvents = jsonData.events
      .filter(event => new Date(event.start) > now)
      .slice(0, 3);
    
    if (upcomingEvents.length > 0) {
      console.log(`\n📅 Prochains événements:`);
      upcomingEvents.forEach((event, index) => {
        const startDate = new Date(event.start).toLocaleDateString('fr-FR');
        console.log(`   ${index + 1}. ${event.summary} - ${startDate}`);
      });
    }
    
  } catch (error) {
    console.error('💥 Erreur fatale:', error);
    process.exit(1);
  }
}

// Exécuter le script si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, fetchIcalData, convertIcalToJson, saveJsonFile };
