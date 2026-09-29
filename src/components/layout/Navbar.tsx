import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  BookOpen, 
  Heart, 
  BarChart3, 
  Plus, 
  Scroll, 
  Layers,
  Sparkle,
  Library
} from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';
import { AIAssistantModal } from '../ai/AIAssistantModal';
import { NewTripModal } from '../modals/NewTripModal';
import { StoryGeneratorModal } from '../story/StoryGeneratorModal';

export const Navbar: React.FC = () => {
  const { scrapbookMode, setScrapbookMode } = useTravelStore();
  const [showAI, setShowAI] = useState(false);
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [showStoryGen, setShowStoryGen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Wall', icon: Layers, exact: true },
    { to: '/trips', label: 'My Trips', icon: BookOpen },
    { to: '/stories', label: 'Stories', icon: Library },
    { to: '/map', label: 'Map', icon: MapPin },
    { to: '/memories', label: 'Memories', icon: Heart },
    { to: '/wishlist', label: 'Wishlist', icon: Compass },
    { to: '/passport', label: 'Passport', icon: Scroll },
    { to: '/museum', label: 'Museum', icon: Sparkle },
    { to: '/stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E6DEC8] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-600/90 text-white flex items-center justify-center shadow-md shadow-amber-900/10 group-hover:rotate-6 transition-transform">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-2xl tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
                  WanderWall
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-600 font-sans -mt-1 font-semibold">
                  Visual Scrapbook & Journal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-amber-100/80 text-amber-900 shadow-sm border border-amber-200/60'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              {/* Turn Trip into Story Button */}
              <button
                onClick={() => setShowStoryGen(true)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full text-xs font-bold hover:brightness-105 shadow-sm transition-all hover:scale-105"
                title="Turn My Trip into a Story"
              >
                <span>✨</span>
                <span className="hidden sm:inline">Story Maker</span>
              </button>

              {/* Scrapbook Mode Pill */}
              <button
                onClick={() => setScrapbookMode(scrapbookMode === 'physical' ? 'clean' : 'physical')}
                title="Toggle between Physical Scrapbook & Clean Digital"
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  scrapbookMode === 'physical'
                    ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm'
                    : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                }`}
              >
                <span className="text-sm">{scrapbookMode === 'physical' ? '📌' : '✨'}</span>
                <span className="hidden xl:inline">
                  {scrapbookMode === 'physical' ? 'Physical' : 'Clean'}
                </span>
              </button>

              {/* AI Travel Assistant Button */}
              <button
                onClick={() => setShowAI(true)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-full text-xs font-medium border border-stone-300 transition-all"
                title="Ask AI Travel Assistant"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline font-sans">AI Chat</span>
              </button>

              {/* New Trip Button */}
              <button
                onClick={() => setShowNewTrip(true)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-medium shadow transition-all hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">New</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* AI Assistant Modal */}
      {showAI && <AIAssistantModal onClose={() => setShowAI(false)} />}

      {/* Story Generator Modal */}
      {showStoryGen && <StoryGeneratorModal isOpen={showStoryGen} onClose={() => setShowStoryGen(false)} />}

      {/* New Trip Modal */}
      {showNewTrip && (
        <NewTripModal
          onClose={() => setShowNewTrip(false)}
          onCreated={(newId) => {
            setShowNewTrip(false);
            navigate(`/trip/${newId}/canvas`);
          }}
        />
      )}
    </>
  );
};
