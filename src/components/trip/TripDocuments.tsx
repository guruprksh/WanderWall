import React from 'react';
import { Ticket, Plus } from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';
import { TicketCard } from '../cards/TicketCard';

interface Props {
  tripId: string;
}

export const TripDocuments: React.FC<Props> = ({ tripId }) => {
  const { canvasItems, scrapbookMode, addCanvasItem } = useTravelStore();

  const ticketItems = canvasItems.filter((i) => i.tripId === tripId && i.type === 'ticket');

  const handleAddSampleTicket = () => {
    addCanvasItem({
      tripId,
      type: 'ticket',
      x: 100,
      y: 100,
      width: 280,
      rotation: -1,
      content: {
        type: 'flight',
        title: 'Flight Boarding Pass',
        from: 'Rome (FCO)',
        to: 'Venice (VCE)',
        date: '2026-05-18',
        time: '11:15',
        carrier: 'ITA Airways',
        seat: '12F',
        price: '€65',
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-black text-2xl text-stone-900">Tickets & Travel Documents</h2>
          <p className="text-stone-500 text-xs">Boarding passes, train tickets, bookings & keepsake receipts</p>
        </div>
        <button
          onClick={handleAddSampleTicket}
          className="flex items-center space-x-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Ticket</span>
        </button>
      </div>

      {ticketItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <Ticket className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="font-serif font-bold text-stone-700">No tickets saved yet</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">Add your flights, train passes, or museum bookings to keep them organized.</p>
          <button onClick={handleAddSampleTicket} className="px-4 py-2 bg-amber-600 text-white text-xs font-semibold rounded-full">
            Add Sample Ticket
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ticketItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <TicketCard content={item.content as any} mode={scrapbookMode} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
