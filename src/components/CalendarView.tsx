import React, { useState } from 'react';
import type { DayItinerary, ActivityCategory } from '../types';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarViewProps {
  days: DayItinerary[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ days }) => {
  const [viewMode, setViewMode] = useState<'day' | '3day' | 'week'>('week');

  const categoryColorMap: Record<ActivityCategory, { bg: string; text: string; border: string }> = {
    flight: { bg: 'bg-indigo-50', text: 'text-indigo-900', border: 'border-indigo-300' },
    hotel: { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300' },
    transport: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' },
    food: { bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-300' },
    culture: { bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-300' },
    shopping: { bg: 'bg-pink-50', text: 'text-pink-900', border: 'border-pink-300' },
    nature: { bg: 'bg-teal-50', text: 'text-teal-900', border: 'border-teal-300' },
    entertainment: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' },
    photography: { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300' },
    nightlife: { bg: 'bg-rose-50', text: 'text-rose-900', border: 'border-rose-300' },
    relaxation: { bg: 'bg-teal-50', text: 'text-teal-900', border: 'border-teal-300' },
    technology: { bg: 'bg-teal-50', text: 'text-teal-900', border: 'border-teal-300' }
  };

  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-teal-600" />
            Trip Calendar
          </h2>
          <p className="text-xs text-slate-500 font-medium">Real-time synchronized visual schedule for Tokyo.</p>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60 text-xs font-bold">
          <button
            onClick={() => setViewMode('day')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'day' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Day View
          </button>
          <button
            onClick={() => setViewMode('3day')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === '3day' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3 Days
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'week' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Full Week (7 Days)
          </button>
        </div>
      </div>

      {/* Category Legend Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 text-xs text-slate-600 font-medium">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categories:</span>
        <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-900 border border-indigo-200 font-semibold">Flights</span>
        <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold">Hotels</span>
        <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold">Activities</span>
        <span className="px-2.5 py-1 rounded bg-orange-50 text-orange-900 border border-orange-200 font-semibold">Meals</span>
        <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 font-semibold">Transport</span>
      </div>

      {/* Grid Calendar Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Calendar Headers: Days */}
          <div className="grid grid-cols-8 border-b border-slate-200/80 bg-slate-50/70 text-xs">
            <div className="p-3 border-r border-slate-200/60 font-bold text-slate-400 uppercase tracking-wider text-center">
              Time
            </div>
            {days.map((d) => (
              <div key={d.dayNumber} className="p-3 border-r border-slate-200/60 text-center">
                <span className="font-extrabold text-slate-900 block">Day {d.dayNumber}</span>
                <span className="text-[11px] text-slate-500 font-medium">{d.dateStr}</span>
              </div>
            ))}
          </div>

          {/* Calendar Body Rows */}
          <div className="divide-y divide-slate-100 text-xs">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 min-h-[90px]">
                {/* Time Column */}
                <div className="p-3 border-r border-slate-200/60 text-slate-400 font-bold text-[11px] text-center bg-slate-50/30">
                  {hour}
                </div>

                {/* Days Columns */}
                {days.map((d) => {
                  // Find items matching this hour slot approximately
                  const hourNum = parseInt(hour.split(':')[0], 10);
                  const matchingItems = d.items.filter((item) => {
                    const itemHour = parseInt(item.time.split(':')[0], 10);
                    return itemHour === hourNum || (itemHour === hourNum + 1 && hourNum % 2 === 0);
                  });

                  return (
                    <div key={d.dayNumber} className="p-1.5 border-r border-slate-200/40 space-y-1.5 hover:bg-slate-50/40 transition-colors">
                      {matchingItems.map((item) => {
                        const style = categoryColorMap[item.category] || categoryColorMap.culture;
                        return (
                          <div
                            key={item.id}
                            className={`p-2 rounded-xl border ${style.bg} ${style.border} ${style.text} space-y-0.5 shadow-2xs`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-extrabold">
                              <span>{item.time}</span>
                              <span className="uppercase tracking-wider">{item.category}</span>
                            </div>
                            <h5 className="font-bold text-xs leading-tight truncate">{item.title}</h5>
                            <p className="text-[10px] font-medium opacity-80 truncate">{item.location.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
