import React from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface OptimizeItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyOptimization: () => void;
  dayName?: string;
}

export const OptimizeItineraryModal: React.FC<OptimizeItineraryModalProps> = ({
  isOpen,
  onClose,
  onApplyOptimization,
  dayName = 'Tuesday, Oct 13'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Optimize {dayName}</h3>
              <p className="text-xs text-slate-500 font-medium">Algorithmic route streamlining & buffer optimization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* CURRENT PLAN */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Current Plan
              </span>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Distance:</span>
                  <span className="font-bold text-slate-900">4.8 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Travel:</span>
                  <span className="font-bold text-slate-900">76 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Backtracking:</span>
                  <span className="font-bold text-rose-600">Moderate</span>
                </div>
              </div>
            </div>

            {/* PROPOSED PLAN */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                Proposed Plan (Optimized)
              </span>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-teal-900">Total Distance:</span>
                  <span className="font-bold text-teal-900">3.2 km (-1.6 km)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-900">Total Travel:</span>
                  <span className="font-bold text-teal-900">49 min (-27 min)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-900">Backtracking:</span>
                  <span className="font-bold text-emerald-700">Zero</span>
                </div>
              </div>
            </div>
          </div>

          {/* Concrete Explanations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Proposed Adjustments & Concrete Reasons
            </h4>

            {/* Adjustment 1 */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Moved: Meiji Shrine</span>
                <span className="text-teal-700 flex items-center gap-1">
                  11:30 <ArrowRight className="w-3 h-3" /> 10:40
                </span>
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong className="text-slate-800">Reason:</strong> Reordered activities geographically to eliminate 1.6km of backtracking between Shibuya and Harajuku.
              </p>
            </div>

            {/* Adjustment 2 */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Moved: Harajuku Lunch</span>
                <span className="text-teal-700 flex items-center gap-1">
                  13:00 <ArrowRight className="w-3 h-3" /> 12:30
                </span>
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong className="text-slate-800">Reason:</strong> Creates a comfortable 20-minute safety buffer before TeamLab Borderless timed entry.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Keep current plan
          </button>
          <button
            onClick={() => {
              onApplyOptimization();
              onClose();
            }}
            className="px-5 py-2.5 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Apply changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
