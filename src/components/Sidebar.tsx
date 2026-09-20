import React from 'react';
import type { ViewMode } from '../types';
import {
  Compass,
  LayoutDashboard,
  CalendarDays,
  MapPin,
  PieChart,
  FileText,
  MessageSquare,
  Settings,
  Bot,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  GitBranch,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  activeDisruptionCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  activeDisruptionCount,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const isSelected = (view: ViewMode) => currentView === view;

  const navItem = (view: ViewMode, label: string, Icon: React.ElementType, badge?: number | string) => {
    const active = isSelected(view);
    return (
      <button
        onClick={() => {
          onNavigate(view);
          if (onCloseMobile) onCloseMobile();
        }}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
          active
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30 font-bold'
            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
          <span>{label}</span>
        </div>
        {badge !== undefined && (
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
              active ? 'bg-white text-blue-900' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 w-[240px] bg-[#090d17] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Top Header & Brand */}
      <div className="p-4 space-y-5 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 px-1 py-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/25">
            <Compass className="w-5 h-5 animate-spin-slow text-white" />
          </div>
          <div>
            <span className="font-black text-white text-base tracking-tight flex items-center gap-1">
              TravelPilot
            </span>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider">Plan · Adapt · Explore</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1.5 pt-2">
          {navItem('command-center', 'My Trip', LayoutDashboard)}
          {navItem('ask-travelpilot', 'AI Assistant', Bot)}
          {navItem('itinerary', 'Itinerary', CalendarDays)}
          {navItem('map', 'Map View', MapPin)}
          {navItem('budget', 'Budget', PieChart)}
          {navItem('bookings', 'Bookings & Docs', CreditCard)}
          {navItem('disruptions', 'Disruptions', AlertTriangle, activeDisruptionCount > 0 ? activeDisruptionCount : undefined)}
          {navItem('alternatives', 'Alternatives', GitBranch)}
          {navItem('backup-plans', 'Backup Plans', ShieldCheck)}
          {navItem('replan', 'Replan Workspace', Sparkles)}
          {navItem('trip-summary', 'Documents', FileText)}
        </div>

        {/* Promo Card: Same destination, smarter journeys */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 mt-4 shadow-xl group">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
            alt="Santorini landscape"
            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-3 flex flex-col justify-end">
            <p className="text-white font-black text-xs leading-tight drop-shadow-md">
              Same destination, smarter journeys.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-slate-800/80 bg-[#070a12]">
        <div className="flex items-center justify-between px-1 py-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center border border-sky-400/40 shadow-md">
              MB
            </div>
            <div className="text-xs">
              <p className="font-bold text-white leading-tight">Miruthu Bashini</p>
              <p className="text-[10px] text-slate-400 truncate max-w-[110px]">m******@gmail.com</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('replan')}
            title="Settings"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
