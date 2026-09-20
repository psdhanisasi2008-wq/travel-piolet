import React from 'react';
import { BackupPlan } from '../types';
import { ShieldCheck, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';

interface BackupPlansViewProps {
  backupPlans: BackupPlan[];
}

export const BackupPlansView: React.FC<BackupPlansViewProps> = ({ backupPlans }) => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          Backup Plans
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Prepared contingency alternatives for important parts of your trip.
        </p>
      </div>

      {/* Backup Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {backupPlans.map((bp) => (
          <div key={bp.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase">
                {bp.category}
              </span>

              {bp.status === 'ready' && (
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Ready
                </span>
              )}
              {bp.status === 'not-confirmed' && (
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold text-[10px] flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-600" />
                  Not Confirmed
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Primary Item */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Primary Plan</span>
                <h4 className="font-bold text-slate-900 text-xs leading-snug">{bp.primaryItem}</h4>
                <p className="text-[10px] text-slate-500">{bp.primaryTime}</p>
              </div>

              {/* Backup Item */}
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200 space-y-1">
                <span className="text-[10px] font-bold text-teal-800 uppercase block">Backup Plan</span>
                <h4 className="font-bold text-teal-950 text-xs leading-snug">{bp.backupItem}</h4>
                <p className="text-[10px] text-teal-700">{bp.backupTime}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">Contingency Reason</span>
              <p className="text-slate-700 italic text-[11px]">"{bp.reason}"</p>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 text-slate-500 font-medium">
              <span>Transport: {bp.transportTimeMin} min</span>
              <span className="font-bold text-slate-900">₹{bp.costINR.toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
