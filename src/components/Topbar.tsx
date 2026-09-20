import React, { useState } from 'react';
import type { ViewMode } from '../types';
import { Search, Bell, ChevronDown, Menu, AlertCircle, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface TopbarProps {
  currentView: ViewMode;
  onSimulateDisruption: (type: 'flight-delay' | 'activity-cancelled' | 'restaurant-unavailable') => void;
  unreadNotificationCount: number;
  onToggleNotifications: () => void;
  onOpenMobileSidebar: () => void;
  demoMode: boolean;
  onToggleDemoMode: () => void;
  onSelectTrip: (tripName: string) => void;
  currentTripName: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentView,
  onSimulateDisruption,
  unreadNotificationCount,
  onToggleNotifications,
  onOpenMobileSidebar,
  demoMode,
  onToggleDemoMode,
  onSelectTrip,
  currentTripName
}) => {
  const [showTripDropdown, setShowTripDropdown] = useState(false);
  const [showDisruptionMenu, setShowDisruptionMenu] = useState(false);

  return (
    <header className="h-16 bg-[#0b0f19] border-b border-slate-800/80 px-4 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left Title & Mobile Menu button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-extrabold text-white text-base tracking-tight">
            {currentTripName} Operations
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">Continuous AI Monitoring Engine Active</p>
        </div>
      </div>

      {/* Center Live Trip Manager Badge */}
      <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-slate-200 shadow-md shadow-emerald-500/10">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-bold text-white">Live Trip Manager</span>
        <span className="text-slate-400 text-[11px]">Monitoring changes & optimizing</span>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Simulate Disruption Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDisruptionMenu(!showDisruptionMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-xl transition-all"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Simulate Disruption</span>
            <ChevronDown className="w-3 h-3 text-amber-400" />
          </button>

          {showDisruptionMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-[#111726] rounded-2xl border border-slate-700/80 shadow-2xl py-1 z-50 text-xs text-slate-200">
              <div className="px-3.5 py-2 text-[10px] font-extrabold uppercase text-slate-400 border-b border-slate-800">
                Demo Incident Triggers
              </div>
              <button
                onClick={() => {
                  onSimulateDisruption('flight-delay');
                  setShowDisruptionMenu(false);
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-slate-800/80 text-slate-200 flex items-center justify-between"
              >
                <span>✈ Flight Delayed 1.5h</span>
                <span className="text-[10px] text-amber-400 font-bold">Trigger</span>
              </button>
              <button
                onClick={() => {
                  onSimulateDisruption('activity-cancelled');
                  setShowDisruptionMenu(false);
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-slate-800/80 text-slate-200 flex items-center justify-between"
              >
                <span>🏛 Boat Tour Cancelled</span>
                <span className="text-[10px] text-rose-400 font-bold">Trigger</span>
              </button>
            </div>
          )}
        </div>

        {/* Demo Mode Toggle */}
        <button
          onClick={onToggleDemoMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
            demoMode
              ? 'bg-blue-500/15 border-blue-400/40 text-blue-300'
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden md:inline">{demoMode ? 'Demo Active' : 'Demo Mode'}</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onToggleNotifications}
          className="relative p-2 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-all border border-slate-700/60"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-slate-300" />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center ring-2 ring-[#0b0f19]">
              {unreadNotificationCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center border border-sky-400/50 shadow-md">
          MB
        </div>
      </div>
    </header>
  );
};
