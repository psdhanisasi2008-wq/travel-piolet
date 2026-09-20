import React from 'react';
import type { DayItinerary } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  MapPin,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  MoveUp,
  MoveDown,
  Trash2
} from 'lucide-react';

interface ItineraryViewProps {
  days: DayItinerary[];
  currentDayIndex: number;
  onSelectDayIndex: (index: number) => void;
  onOpenAddActivity: () => void;
  onOpenOptimizeDay: () => void;
  onMoveActivity: (dayIndex: number, actIndex: number, direction: 'up' | 'down') => void;
  onDeleteActivity: (dayIndex: number, actId: string) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  days,
  currentDayIndex,
  onSelectDayIndex,
  onOpenAddActivity,
  onOpenOptimizeDay,
  onMoveActivity,
  onDeleteActivity
}) => {
  const currentDay = days[currentDayIndex] || days[0];

  const handlePrevDay = () => {
    if (currentDayIndex > 0) onSelectDayIndex(currentDayIndex - 1);
  };

  const handleNextDay = () => {
    if (currentDayIndex < days.length - 1) onSelectDayIndex(currentDayIndex + 1);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Top Header & Day Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Itinerary</h2>
          <p className="text-xs text-slate-500 font-medium">Your trip, organized day by day with real-time routing.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Previous / Next Day Navigator */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 text-xs font-semibold text-slate-800">
            <button
              onClick={handlePrevDay}
              disabled={currentDayIndex === 0}
              className="p-1.5 hover:bg-white rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-bold text-slate-900 min-w-[110px] text-center">
              {currentDay.dateStr}
            </span>
            <button
              onClick={handleNextDay}
              disabled={currentDayIndex === days.length - 1}
              className="p-1.5 hover:bg-white rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenOptimizeDay}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold rounded-xl transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Optimize day</span>
          </button>

          <button
            onClick={onOpenAddActivity}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-teal-400" />
            <span>Add activity</span>
          </button>
        </div>
      </div>

      {/* Days Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((d, index) => {
          const isActive = index === currentDayIndex;
          return (
            <button
              key={d.dayNumber}
              onClick={() => onSelectDayIndex(index)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>Day {d.dayNumber}</span>
              <span className="ml-1.5 text-[10px] font-normal opacity-70">({d.dateStr})</span>
            </button>
          );
        })}
      </div>

      {/* Day Overview Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div>
          <h3 className="font-bold text-sm tracking-wide">{currentDay.dateFormatted}</h3>
          <p className="text-slate-400 text-[11px]">{currentDay.items.length} Activities & Logistics Scheduled</p>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Travel</span>
            <span className="font-bold text-white">{currentDay.totalTravelDistKm} km ({currentDay.totalTravelTimeMin} mins)</span>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Est. Cost</span>
            <span className="font-bold text-teal-300">
              ₹{currentDay.items.reduce((acc, i) => acc + i.costINR, 0).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Vertical Timeline Card List */}
      <div className="space-y-4">
        {currentDay.items.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === currentDay.items.length - 1;

          return (
            <React.Fragment key={item.id}>
              {/* Travel Time Segment Badge */}
              {item.travelTimeFromPrevMinutes && (
                <div className="flex items-center gap-3 my-2 pl-6 sm:pl-10">
                  <div className="h-6 w-0.5 bg-dashed border-l-2 border-slate-300 border-dashed"></div>
                  <div className="px-3 py-1 bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-600 rounded-full flex items-center gap-1.5 shadow-2xs">
                    <Navigation className="w-3 h-3 text-slate-400" />
                    <span>
                      {item.travelTimeFromPrevMinutes} min travel ({item.travelDistFromPrevKm || 2.4} km)
                    </span>
                  </div>
                </div>
              )}

              {/* Activity Item Card */}
              <div
                className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all ${
                  item.conflictWarning
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-slate-200/80 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Time Badge */}
                    <div className="px-3 py-1.5 bg-slate-900 text-teal-400 font-extrabold text-xs rounded-xl text-center shrink-0">
                      <div>{item.time}</div>
                      <div className="text-[9px] text-slate-400 font-normal">{item.endTime}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-black text-slate-900 text-base">{item.title}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                          {item.category}
                        </span>
                        {item.bookingStatus === 'confirmed' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Confirmed
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location.name} · {item.location.address}</span>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg mt-2 border border-slate-100">
                          "{item.notes}"
                        </p>
                      )}

                      {/* Conflict Indicator */}
                      {item.conflictWarning && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 p-2 rounded-lg mt-2 border border-amber-300">
                          <AlertTriangle className="w-4 h-4 text-amber-700" />
                          <span>{item.conflictWarning}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Meta & Control Buttons */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900">
                        ₹{item.costINR.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        Duration: {item.durationMinutes} min
                      </div>
                    </div>

                    {/* Move Up / Down & Delete Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onMoveActivity(currentDayIndex, idx, 'up')}
                        disabled={isFirst}
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg disabled:opacity-20 transition-colors"
                        title="Move Earlier"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onMoveActivity(currentDayIndex, idx, 'down')}
                        disabled={isLast}
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg disabled:opacity-20 transition-colors"
                        title="Move Later"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteActivity(currentDayIndex, item.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors ml-1"
                        title="Remove activity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
