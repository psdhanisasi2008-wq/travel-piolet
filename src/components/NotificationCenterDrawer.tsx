import React from 'react';
import type { NotificationItem, ViewMode } from '../types';
import { X, Bell, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

interface NotificationCenterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const NotificationCenterDrawer: React.FC<NotificationCenterDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNavigate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-600" />
            <h3 className="font-extrabold text-slate-900 text-lg">Trip Alerts & Logs</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-teal-700 font-bold hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border space-y-2 text-xs transition-all ${
                !n.read
                  ? 'bg-amber-50/60 border-amber-200 shadow-2xs'
                  : 'bg-slate-50/60 border-slate-200/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  {n.type === 'disruption' && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                  {n.type === 'booking' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {n.type === 'conflict' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                  {n.title}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{n.timeAgo}</span>
              </div>

              <p className="text-slate-600 leading-relaxed font-medium">{n.message}</p>

              {n.actionUrl && (
                <button
                  onClick={() => {
                    onNavigate(n.actionUrl!);
                    onClose();
                  }}
                  className="mt-2 text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <span>Review & resolve</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50 text-center text-xs text-slate-500">
          Continuous Trip Monitoring active via TravelPilot engine.
        </div>
      </div>
    </div>
  );
};
