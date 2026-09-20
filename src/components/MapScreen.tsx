import React, { useState } from 'react';
import type { DayItinerary } from '../types';
import { MapComponent } from './MapComponent';
import { MapPin, Compass, ExternalLink } from 'lucide-react';

interface MapScreenProps {
  days: DayItinerary[];
  selectedDayIndex: number;
  onSelectDayIndex: (index: number) => void;
  onOpenAddActivity: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  days,
  selectedDayIndex,
  onSelectDayIndex,
  onOpenAddActivity
}) => {
  const currentDay = days[selectedDayIndex] || days[0];
  const [selectedActivityId, setSelectedActivityId] = useState<string>(
    currentDay.items[0]?.id || ''
  );

  const activeActivity =
    currentDay.items.find((a) => a.id === selectedActivityId) || currentDay.items[0];

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-slate-900 overflow-hidden">
      {/* Interactive Map Component taking 100% space */}
      <MapComponent
        activities={currentDay.items}
        selectedActivityId={selectedActivityId}
        onSelectActivity={(id) => setSelectedActivityId(id)}
        height="100%"
        zoom={13}
      />

      {/* LEFT OVERLAY: Trip Day Selector */}
      <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 shadow-xl max-w-[220px] hidden sm:block space-y-2">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
          Select Trip Day
        </div>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto">
          {days.map((d, index) => {
            const isSelected = index === selectedDayIndex;
            return (
              <button
                key={d.dayNumber}
                onClick={() => {
                  onSelectDayIndex(index);
                  if (d.items[0]) setSelectedActivityId(d.items[0].id);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div>Day {d.dayNumber}</div>
                  <div className="text-[10px] font-normal opacity-70">{d.dateStr}</div>
                </div>
                <span className="text-[10px] opacity-80">{d.items.length} acts</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT OVERLAY: Selected Activity Details Card */}
      {activeActivity && (
        <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-2xl max-w-sm w-full space-y-4 animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase">
              {activeActivity.category}
            </span>
            <span className="text-xs font-extrabold text-slate-900">
              {activeActivity.time} – {activeActivity.endTime}
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900 text-lg leading-tight">{activeActivity.title}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{activeActivity.location.name}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Prev Travel</span>
              <span className="font-bold text-slate-800">
                {activeActivity.travelTimeFromPrevMinutes || 15} min
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Estimated Cost</span>
              <span className="font-bold text-slate-800">
                {activeActivity.costINR === 0 ? 'Free' : `₹${activeActivity.costINR.toLocaleString('en-IN')}`}
              </span>
            </div>
          </div>

          {activeActivity.notes && (
            <p className="text-xs text-slate-600 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
              "{activeActivity.notes}"
            </p>
          )}

          <div className="space-y-2 pt-1">
            <button
              onClick={onOpenAddActivity}
              className="w-full py-2 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              Add to itinerary
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => alert(`Showing route details for ${activeActivity.title}`)}
                className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
              >
                <Compass className="w-3.5 h-3.5 text-slate-500" />
                <span>Navigate</span>
              </button>
              <button
                onClick={() => alert(`Opening details for ${activeActivity.title}`)}
                className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>View details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
