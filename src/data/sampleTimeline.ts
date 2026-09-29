import { TimelineDay } from '../types/travel';
import { photos } from './photos';

export const sampleTimeline: TimelineDay[] = [
  {
    id: 'tl-1', tripId: 'trip-italy-2026', dayNumber: 1, date: '2026-05-12', title: 'Roma — Arrival & Sunset',
    events: [
      { id: 'ev-1', type: 'flight', title: 'Amsterdam → Rome (KL1601)', time: '07:15', location: 'Schiphol → FCO' },
      { id: 'ev-2', type: 'hotel', title: 'Check-in: Hotel Raphael', time: '14:00', location: 'Piazza Navona', notes: 'Terrace room' },
      { id: 'ev-3', type: 'walk', title: 'Evening passeggiata', time: '18:00', location: 'Centro Storico', photo: photos.rome },
      { id: 'ev-4', type: 'food', title: 'Dinner at Trattoria da Enzo', time: '20:30', location: 'Trastevere', cost: '€48' },
    ],
  },
  {
    id: 'tl-2', tripId: 'trip-italy-2026', dayNumber: 2, date: '2026-05-13', title: 'Roma — Ancient Wonders',
    events: [
      { id: 'ev-5', type: 'cafe', title: 'Espresso at Sant\'Eustachio', time: '08:30', location: 'Piazza Sant\'Eustachio' },
      { id: 'ev-6', type: 'museum', title: 'Colosseum & Roman Forum', time: '10:00', location: 'Rome', photo: photos.colosseum },
      { id: 'ev-7', type: 'food', title: 'Lunch — Roscioli', time: '13:00', location: 'Via dei Giubbonari', cost: '€35' },
      { id: 'ev-8', type: 'activity', title: 'Trastevere hidden lanes', time: '16:00', location: 'Trastevere' },
    ],
  },
  {
    id: 'tl-3', tripId: 'trip-italy-2026', dayNumber: 3, date: '2026-05-14', title: 'Firenze — Renaissance City',
    events: [
      { id: 'ev-9', type: 'train', title: 'Frecciarossa to Florence', time: '09:30', location: 'Roma Termini → Firenze' },
      { id: 'ev-10', type: 'museum', title: 'Uffizi Gallery', time: '14:00', location: 'Florence' },
      { id: 'ev-11', type: 'walk', title: 'Sunset at Piazzale Michelangelo', time: '19:30', location: 'Florence', photo: photos.florence },
    ],
  },
];
