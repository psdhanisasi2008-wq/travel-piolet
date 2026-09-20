import React from 'react';
import { AlternativeOption, ViewMode } from '../types';
import { GitBranch, MapPin, Clock, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

interface AlternativesViewProps {
  alternatives: AlternativeOption[];
  onSelectAlternative: (option: AlternativeOption) => void;
  onNavigate: (view: ViewMode) => void;
}

export const AlternativesView: React.FC<AlternativesViewProps> = ({
  alternatives,
  onSelectAlternative,
  onNavigate
}) => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-teal-600" />
            Smart Alternatives
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
            Factual Tradeoffs
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          When an attraction or restaurant slot is unavailable, TravelPilot calculates distance, schedule impact & cost trade-offs.
        </p>
      </div>

      {/* Original Disrupted Slot Box */}
      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
            Original Requested Slot
          </span>
          <h4 className="font-bold text-slate-900 text-sm">TeamLab Borderless (Oct 13 — 14:30 Slot)</h4>
          <p className="text-amber-800 text-[11px]">Azabudai Hills · 14:30 Entry (Sold Out / Unavailable)</p>
        </div>
        <span className="px-3 py-1 rounded bg-amber-200 text-amber-900 font-extrabold text-xs">
          Unavailable
        </span>
      </div>

      {/* Alternative Options Grid */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider text-slate-400">
          Calculated Alternatives & Factual Tradeoffs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternatives.map((opt, idx) => (
            <div
              key={opt.id}
              className={`bg-white p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow-xs ${
                opt.isRecommended
                  ? 'border-teal-400 ring-2 ring-teal-500/20'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">OPTION {idx + 1}</span>
                  {opt.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      {opt.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-snug">{opt.optionTitle}</h4>
                  <p className="text-xs text-slate-500 mt-1">{opt.time}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Location:</span>
                    <span className="font-medium truncate max-w-[150px]">{opt.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Travel Time:</span>
                    <span className="font-bold text-slate-900">{opt.travelTimeMin} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Cost:</span>
                    <span className="font-bold text-slate-900">₹{opt.costINR.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Schedule Impact */}
                <div className="text-xs p-3 rounded-xl bg-slate-100 text-slate-800 font-medium">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">
                    Schedule Impact:
                  </span>
                  {opt.scheduleImpact}
                </div>
              </div>

              <button
                onClick={() => onSelectAlternative(opt)}
                className="w-full py-2.5 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Choose Option {idx + 1}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
