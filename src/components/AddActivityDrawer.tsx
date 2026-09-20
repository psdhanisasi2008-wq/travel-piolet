import React, { useState } from 'react';
import { activityCatalog } from '../data/mockData';
import { ActivityCategory } from '../types';
import { X, Search, Star, Clock, MapPin, Navigation, DollarSign, Plus } from 'lucide-react';

interface AddActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (activity: typeof activityCatalog[0], selectedSlot: string) => void;
}

export const AddActivityDrawer: React.FC<AddActivityDrawerProps> = ({
  isOpen,
  onClose,
  onAddActivity
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>({
    'Sushi Making Masterclass': '15:00',
    'Ghibli Museum Tour': '10:00',
    'Shinjuku Night Food Tour': '18:30',
    'Kabukicho Tower Arcade & Tech': '15:30',
    'Nezu Museum & Japanese Tea Garden': '13:00'
  });

  if (!isOpen) return null;

  const categories = [
    'all',
    'food',
    'culture',
    'shopping',
    'nature',
    'entertainment',
    'photography',
    'nightlife',
    'relaxation'
  ];

  const filteredActivities = activityCatalog.filter((act) => {
    const matchesCategory = selectedCategory === 'all' || act.category === selectedCategory;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Add Activity</h3>
            <p className="text-xs text-slate-500 font-medium">Auto-calculates schedule slot & route travel time</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-5 border-b border-slate-100 space-y-3 bg-slate-50/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to do? (e.g. Sushi, Museum, Shopping)"
              className="w-full bg-white text-xs text-slate-900 placeholder-slate-400 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold capitalize shrink-0 border transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filteredActivities.map((act) => {
            const currentSlot = selectedSlots[act.title] || act.availableSlots[0];
            return (
              <div key={act.title} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 hover:border-slate-300 transition-all shadow-2xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-bold text-[10px] uppercase">
                      {act.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{act.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {act.rating}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {act.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-slate-900 text-sm">
                      ₹{act.costINR.toLocaleString('en-IN')}
                    </span>
                    <p className="text-[10px] text-slate-400">{act.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                  <Navigation className="w-3.5 h-3.5 text-teal-600" />
                  <span>{act.travelTime}</span>
                </div>

                {/* Slot Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Available Slots</label>
                  <div className="flex items-center gap-2">
                    {act.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() =>
                          setSelectedSlots((prev) => ({ ...prev, [act.title]: slot }))
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                          currentSlot === slot
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddActivity(act, currentSlot);
                    onClose();
                  }}
                  className="w-full py-2 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4 text-teal-300" />
                  <span>Add to itinerary ({currentSlot})</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50 text-xs text-slate-500 text-center">
          TravelPilot engine automatically recalculates travel times upon insertion.
        </div>
      </div>
    </div>
  );
};
