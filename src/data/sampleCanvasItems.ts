import { CanvasItem } from '../types/travel';
import { photos } from './photos';

export const sampleCanvasItems: CanvasItem[] = [
  // Italy Canvas
  {
    id: 'ci-1', tripId: 'trip-italy-2026', type: 'photo',
    x: 60, y: 40, width: 260, rotation: -3, zIndex: 10,
    content: { url: photos.colosseum, caption: 'First glimpse of the Colosseum!', date: '12 May 2026', location: 'Rome', frameStyle: 'polaroid', hasTape: true, tapeColor: 'coral' },
  },
  {
    id: 'ci-2', tripId: 'trip-italy-2026', type: 'photo',
    x: 370, y: 50, width: 230, rotation: 4, zIndex: 9,
    content: { url: photos.florence, caption: 'Sunset at Piazzale Michelangelo', date: '16 May 2026', location: 'Florence', frameStyle: 'polaroid', hasPin: true, pinColor: 'brass' },
  },
  {
    id: 'ci-3', tripId: 'trip-italy-2026', type: 'photo',
    x: 650, y: 40, width: 240, rotation: -2, zIndex: 8,
    content: { url: photos.venice, caption: 'Morning light on the Grand Canal', date: '21 May 2026', location: 'Venice', frameStyle: 'rounded', hasTape: true, tapeColor: 'sage' },
  },
  {
    id: 'ci-4', tripId: 'trip-italy-2026', type: 'place',
    x: 60, y: 390, width: 250, rotation: 1, zIndex: 7,
    content: { name: 'Trattoria da Enzo', location: 'Rome, Italy', category: 'restaurant', rating: 5, note: 'Best carbonara in Rome. Worth the wait!', photo: photos.italyFood, dateVisited: '13 May 2026', priceLevel: '€€' },
  },
  {
    id: 'ci-5', tripId: 'trip-italy-2026', type: 'ticket',
    x: 360, y: 400, width: 280, rotation: -2, zIndex: 6,
    content: { type: 'train', title: 'Trenitalia Frecciarossa', from: 'Rome Termini', to: 'Florence SMN', date: '16 May 2026', time: '09:30', carrier: 'Trenitalia', seat: 'Car 5, Seat 23A', code: 'TI-8827-FR', price: '€45' },
  },
  {
    id: 'ci-6', tripId: 'trip-italy-2026', type: 'memory',
    x: 680, y: 350, width: 250, rotation: 3, zIndex: 5,
    content: { category: 'Best Meal', title: 'Truffle Pasta in Florence', description: 'Tiny restaurant near Ponte Vecchio. Life-changing pasta & free limoncello!', photo: photos.food, location: 'Florence', rating: 5, emoji: '🍝' },
  },
  {
    id: 'ci-7', tripId: 'trip-italy-2026', type: 'note',
    x: 120, y: 640, width: 200, rotation: -1, zIndex: 4,
    content: { text: 'Remember: the gelato place near Piazza Navona with pistachio + dark chocolate. MUST return!', color: 'yellow', fontStyle: 'handwriting', pinned: true },
  },
  {
    id: 'ci-8', tripId: 'trip-italy-2026', type: 'stamp',
    x: 420, y: 640, width: 130, rotation: -8, zIndex: 11,
    content: { text: 'ITALIA', country: 'Italy', city: 'Roma', date: '12 May 2026', color: 'red', shape: 'round' },
  },
  {
    id: 'ci-9', tripId: 'trip-italy-2026', type: 'sticker',
    x: 610, y: 620, width: 80, rotation: 12, zIndex: 12,
    content: { emoji: '🍕', label: 'Pizza Time' },
  },
  {
    id: 'ci-10', tripId: 'trip-italy-2026', type: 'ticket',
    x: 740, y: 600, width: 260, rotation: -1, zIndex: 3,
    content: { type: 'flight', title: 'Flight to Rome', from: 'AMS', to: 'FCO', date: '12 May 2026', time: '07:15', carrier: 'KLM', seat: '14F', code: 'KL1601', price: '€189' },
  },
  // Paris Canvas
  {
    id: 'ci-p1', tripId: 'trip-paris-2026', type: 'photo',
    x: 80, y: 50, width: 260, rotation: -2, zIndex: 10,
    content: { url: photos.eiffel, caption: 'Evening at the Eiffel Tower', date: '12 June 2026', location: 'Paris', frameStyle: 'polaroid', hasTape: true, tapeColor: 'navy' },
  },
  {
    id: 'ci-p2', tripId: 'trip-paris-2026', type: 'photo',
    x: 400, y: 60, width: 240, rotation: 3, zIndex: 9,
    content: { url: photos.louvre, caption: 'The Louvre at golden hour', date: '13 June 2026', location: 'Paris', frameStyle: 'rounded', hasPin: true, pinColor: 'red' },
  },
  {
    id: 'ci-p3', tripId: 'trip-paris-2026', type: 'place',
    x: 80, y: 380, width: 250, rotation: 1, zIndex: 8,
    content: { name: 'Café de Flore', location: 'Paris, France', category: 'cafe', rating: 4, note: 'Classic Parisian vibes. Espresso & croissant.', photo: photos.pariscafe, dateVisited: '12 June 2026', priceLevel: '€€€' },
  },
  {
    id: 'ci-p4', tripId: 'trip-paris-2026', type: 'ticket',
    x: 390, y: 390, width: 270, rotation: -3, zIndex: 7,
    content: { type: 'flight', title: 'Flight to Paris', from: 'AMS', to: 'CDG', date: '12 June 2026', time: '08:45', carrier: 'KLM', seat: '8A', code: 'KL1229', price: '€145' },
  },
  {
    id: 'ci-p5', tripId: 'trip-paris-2026', type: 'memory',
    x: 690, y: 220, width: 240, rotation: 2, zIndex: 6,
    content: { category: 'Best View', title: 'Seine at Sunset', description: 'Watched pink & gold reflections over Pont des Arts.', location: 'Paris', rating: 5, emoji: '🌅' },
  },
];
