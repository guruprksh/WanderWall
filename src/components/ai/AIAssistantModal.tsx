import React, { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';

interface Props {
  onClose: () => void;
}

const quickQuestions = [
  'Where did I eat the best pasta?',
  'Show me all my trips in France.',
  'Which cities have I visited more than once?',
  'What was my longest trip?',
  'Show me all my beach trips.',
  'Create a summary of my Italy trip.',
];

export const AIAssistantModal: React.FC<Props> = ({ onClose }) => {
  const { trips, stats, canvasItems } = useTravelStore();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `Hi! I'm your WanderWall travel assistant ✈️\n\nI can help you explore your ${stats.tripsCount} trips across ${stats.countriesCount} countries. Ask me anything about your travels!` },
  ]);

  const generateAnswer = (q: string): string => {
    const lq = q.toLowerCase();
    if (lq.includes('pasta') || lq.includes('best meal') || lq.includes('best food'))
      return '🍝 Based on your memories, your best pasta was the **Truffle Pasta in Florence** at a tiny restaurant near the Ponte Vecchio. You rated it 5/5 and mentioned the owner poured you free limoncello!';
    if (lq.includes('france'))
      return `🇫🇷 You have **2 trips in France**:\n\n1. **Weekend in Paris** (Jun 2026) — 3 days, croissants & the Louvre\n2. **South of France** (Jul 2026) — 14 days along the Côte d'Azur\n\nCities: Paris, Lyon, Marseille, Nice, Avignon`;
    if (lq.includes('longest'))
      return `📏 Your longest trip was **South of France** (14 days, Jul 2-15 2026), covering 980 km through 5 cities along the Côte d'Azur.`;
    if (lq.includes('beach'))
      return '🏖️ Your beach trips:\n\n• **South of France** — Nice, Marseille coast\n\nYou also have New Zealand (dream trip) with beaches on the bucket list!';
    if (lq.includes('cities') && lq.includes('more than once'))
      return '🔁 Based on your trips, you haven\'t visited the same city twice yet — but Paris and France appear in multiple trips!';
    if (lq.includes('italy') || lq.includes('summary'))
      return `🇮🇹 **Italy 2026 Summary**\n\n📅 May 12-24, 2026 (13 days)\n📍 5 cities: Rome, Florence, Venice, Siena, Cinque Terre\n📸 38 places visited\n🚗 1,450 km travelled\n\nHighlights:\n• Best Meal: Truffle Pasta in Florence\n• Colosseum at sunrise\n• Grand Canal morning light\n• Gelato at Piazza Navona`;
    return `I found ${trips.length} trips with ${canvasItems.length} memories. Try asking about specific destinations, meals, or trip summaries!`;
  };

  const handleAsk = () => {
    if (!question.trim()) return;
    const q = question.trim();
    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setQuestion('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', text: generateAnswer(q) }]);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col border border-stone-200" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="font-serif font-bold text-lg text-stone-900">AI Travel Assistant</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-stone-900 text-white rounded-br-md'
                  : 'bg-amber-50 text-stone-800 border border-amber-100 rounded-bl-md'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick questions */}
        <div className="flex flex-wrap gap-1.5 px-4 pb-2">
          {quickQuestions.slice(0, 3).map((q) => (
            <button
              key={q}
              onClick={() => { setQuestion(q); }}
              className="text-[11px] px-2.5 py-1 bg-amber-100/60 text-amber-800 rounded-full border border-amber-200/50 hover:bg-amber-200/80 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center space-x-2 px-4 pb-4 pt-2 border-t border-stone-200">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask about your travels…"
            className="flex-1 px-4 py-2 rounded-full border border-stone-300 bg-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
          />
          <button
            onClick={handleAsk}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
