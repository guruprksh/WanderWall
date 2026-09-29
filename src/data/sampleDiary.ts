import { DiaryEntry } from '../types/travel';
import { photos } from './photos';

export const sampleDiary: DiaryEntry[] = [
  {
    id: 'diary-1', tripId: 'trip-italy-2026',
    date: '2026-05-12', location: 'Rome, Italy', weather: '☀️ 28°C', mood: '🤩 Over the Moon',
    title: 'Finally arrived in the Eternal City!',
    text: 'The plane touched down and even the warm air carried that unmistakable holiday scent. After checking into Hotel Raphael right next to Piazza Navona, we grabbed our first true Roman gelato. Later we sat at Da Enzo in Trastevere as night fell. String lights everywhere, laughter in the air, and the absolute best cacio e pepe and carbonara we have ever tasted.',
    photos: [photos.rome, photos.colosseum],
    placesVisited: ['Piazza Navona', 'Trastevere', 'Pantheon'],
    foodHighlights: ['Carbonara at Da Enzo', 'Pistachio gelato'],
  },
  {
    id: 'diary-2', tripId: 'trip-italy-2026',
    date: '2026-05-16', location: 'Florence, Italy', weather: '🌤️ 26°C', mood: '✨ Inspired',
    title: 'Golden Hour above Florence',
    text: 'Climbed up to Piazzale Michelangelo just before 7pm. Hundreds of people were sitting on the stone steps listening to a live acoustic guitarist playing Italian ballads. As the sun sank below the horizon, the Duomo and the Arno river lit up in deep gold and terracotta.',
    photos: [photos.florence],
    placesVisited: ['Uffizi', 'Ponte Vecchio', 'Piazzale Michelangelo'],
    foodHighlights: ['Bistecca alla Fiorentina', 'Chianti Classico'],
  }
];
