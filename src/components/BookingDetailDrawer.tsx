import React from 'react';
import { Booking } from '../types';
import { X, CheckCircle2, AlertTriangle, CreditCard, Clock, MapPin, Calendar, FileText, ArrowRight } from 'lucide-react';

interface BookingDetailDrawerProps {
  booking: Booking | null;
  onClose: () => void;
  onViewImpact?: (booking: Booking) => void;
}

export const BookingDetailDrawer: React.FC<BookingDetailDrawerProps> = ({
  booking,
  onClose,
  onViewImpact
}) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase">
              {booking.type}
            </span>
            <h3 className="font-extrabold text-slate-900 text-lg mt-1">{booking.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {/* Status Badge & Confirmation Number */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Status</span>
              {booking.status === 'confirmed' ? (
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Confirmed
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  {booking.status}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
              <span className="text-slate-500 font-medium">Confirmation #</span>
              <span className="font-mono font-bold text-slate-900">{booking.confirmationNumber}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-3">
            <h4 className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              Booking Details
            </h4>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Date</span>
                  <span className="font-bold text-slate-900">{booking.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Time Window</span>
                  <span className="font-bold text-slate-900">{booking.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Location</span>
                  <span className="font-bold text-slate-900">{booking.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80">
                <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Cost</span>
                  <span className="font-bold text-slate-900">₹{booking.costINR.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Cancellation Policy
            </span>
            <p className="text-slate-700 font-medium">{booking.cancellationPolicy}</p>
          </div>

          {/* Impact Alert Section */}
          {booking.impactAlert && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Potential Itinerary Impact</span>
              </div>
              <p className="text-amber-800 leading-relaxed font-medium">{booking.impactAlert}</p>
              {onViewImpact && (
                <button
                  onClick={() => onViewImpact(booking)}
                  className="w-full py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View impact & resolve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
