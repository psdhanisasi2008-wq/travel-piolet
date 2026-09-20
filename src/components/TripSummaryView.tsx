import React from 'react';
import type { DayItinerary, TripSummaryData, ViewMode } from '../types';
import { ChevronRight } from 'lucide-react';

interface TripSummaryViewProps {
  summary: TripSummaryData;
  days: DayItinerary[];
  onNavigate: (view: ViewMode) => void;
  onSelectDayIndex: (index: number) => void;
}

export const TripSummaryView: React.FC<TripSummaryViewProps> = ({
  summary,
  days,
  onNavigate,
  onSelectDayIndex
}) => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Executive Overview Card */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-teal-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-widest">
            Executive Summary
          </span>
          <span className="text-xs text-slate-400 font-medium">Tokyo Exploration 2026</span>
        </div>

        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">TOKYO</h2>
          <p className="text-sm text-teal-300 font-bold mt-0.5">
            {summary.dates} · <span className="text-white">{summary.durationDays} DAYS · {summary.travelers} TRAVELERS</span>
          </p>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-xs space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Itinerary</span>
          <div className="text-lg font-black text-slate-900">{summary.durationDays} Days</div>
          <p className="text-[10px] text-slate-500">100% mapped</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-xs space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Bookings</span>
          <div className="text-lg font-black text-teal-700">{summary.confirmedBookings} Confirmed</div>
          <p className="text-[10px] text-slate-500">6/6 verified</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-xs space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Activities</span>
          <div className="text-lg font-black text-slate-900">{summary.totalActivities} Planned</div>
          <p className="text-[10px] text-slate-500">Culture & food</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-xs space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Est. Cost</span>
          <div className="text-lg font-black text-emerald-700">₹{summary.estimatedCostINR.toLocaleString('en-IN')}</div>
          <p className="text-[10px] text-slate-500">Within ₹60,000 limit</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-xs space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Backups</span>
          <div className="text-lg font-black text-slate-900">{summary.readyBackups} Ready</div>
          <p className="text-[10px] text-slate-500">Contingency armed</p>
        </div>
      </div>

      {/* Day by Day Summary Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
          7-DAY TRIP BREAKDOWN
        </h3>

        <div className="space-y-3">
          {days.map((d, index) => (
            <div
              key={d.dayNumber}
              onClick={() => {
                onSelectDayIndex(index);
                onNavigate('itinerary');
              }}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-slate-100/80 transition-all cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                  D{d.dayNumber}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{d.dateFormatted}</h4>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600 mt-0.5">
                    {d.items.map((item) => (
                      <span key={item.id} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium">
                        {item.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
