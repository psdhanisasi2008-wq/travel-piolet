import React from 'react';
import type { Disruption, ViewMode } from '../types';
import { AlertTriangle, CheckCircle2, ShieldAlert, GitBranch } from 'lucide-react';

interface DisruptionCenterProps {
  disruption: Disruption;
  onApplyChanges: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const DisruptionCenter: React.FC<DisruptionCenterProps> = ({
  disruption,
  onApplyChanges,
  onNavigate
}) => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Header Banner */}
      <div className="bg-rose-900 text-white p-6 rounded-2xl shadow-lg border border-rose-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-rose-800 text-rose-200 font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            Incident Operations Active
          </span>
          <span className="text-xs text-rose-300 font-medium">{disruption.detectedAt}</span>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-7 h-7 text-amber-400" />
            1 Issue Requires Attention
          </h2>
          <p className="text-sm text-rose-200 font-medium mt-1">{disruption.subtitle}</p>
        </div>

        <div className="flex items-center gap-4 text-xs pt-2 border-t border-rose-800/80 text-rose-200">
          <div>
            <span className="text-rose-400 text-[10px] font-bold uppercase block">Original Arrival</span>
            <span className="font-mono font-bold text-white text-sm">{disruption.originalTime}</span>
          </div>
          <div className="h-6 w-px bg-rose-800"></div>
          <div>
            <span className="text-rose-400 text-[10px] font-bold uppercase block">Updated Arrival</span>
            <span className="font-mono font-bold text-amber-300 text-sm">{disruption.newTime}</span>
          </div>
        </div>
      </div>

      {/* Impact Analysis Checklist */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          IMPACT ANALYSIS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {disruption.impacts.map((imp, i) => {
            const isConflict = imp.impactStatus === 'conflict';
            return (
              <div
                key={i}
                className={`p-4 rounded-xl border space-y-2 text-xs transition-all ${
                  isConflict
                    ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                    : 'bg-slate-50 border-slate-200/60 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{imp.type.toUpperCase()}</span>
                  {isConflict ? (
                    <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-extrabold text-[9px]">
                      CONFLICT
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[9px]">
                      NO IMPACT
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-xs leading-snug">{imp.itemTitle}</h4>
                <p className="text-[11px] opacity-80 leading-relaxed">{imp.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline Comparison: Current Plan vs Proposed Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CURRENT PLAN */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider text-slate-400">
              CURRENT PLAN (DISRUPTED)
            </h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-bold text-[10px] rounded">
              Original
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {disruption.currentTimeline.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60"
              >
                <span className="font-mono font-bold text-slate-900">{item.time}</span>
                <span className="font-semibold text-slate-700">{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PROPOSED PLAN */}
        <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-teal-200 pb-3">
            <h3 className="font-extrabold text-teal-900 text-sm uppercase tracking-wider">
              PROPOSED RE-SCHEDULE PLAN
            </h3>
            <span className="px-2 py-0.5 bg-teal-200 text-teal-900 font-bold text-[10px] rounded">
              Recommended
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {disruption.proposedTimeline.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-teal-200 shadow-2xs"
              >
                <span className="font-mono font-bold text-teal-900">{item.time}</span>
                <span className="font-bold text-slate-900">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decision Action Buttons Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-600 font-medium">
          TravelPilot engine preserves rest of 7-day trip stability. Approval required.
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('alternatives')}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <GitBranch className="w-4 h-4 text-slate-500" />
            <span>View other options</span>
          </button>

          <button
            onClick={onApplyChanges}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Apply proposed changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
