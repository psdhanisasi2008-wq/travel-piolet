import React, { useState } from 'react';
import type { ViewMode, DayItinerary, Booking, Disruption } from '../types';
import { MapComponent } from './MapComponent';
import {
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Clock,
  Navigation,
  MapPin,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Building,
  Plane,
  Layers,
  DollarSign,
  Car,
  Ticket,
  Users,
  Sun,
  Bot,
  Bell,
  Search,
  Send,
  Plus,
  Edit3,
  Eye,
  Box
} from 'lucide-react';

interface CommandCenterProps {
  onNavigate: (view: ViewMode) => void;
  todayItinerary: DayItinerary;
  bookings: Booking[];
  activeDisruption?: Disruption;
  selectedActivityId?: string;
  onSelectActivity: (activityId: string) => void;
  onResolveConflict: () => void;
  totalBudgetINR: number;
  spentBudgetINR: number;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onNavigate,
  todayItinerary,
  bookings,
  activeDisruption,
  selectedActivityId,
  onSelectActivity,
  onResolveConflict,
  totalBudgetINR,
  spentBudgetINR
}) => {
  const [assistantInput, setAssistantInput] = useState('');
  const [activeTab, setActiveTab] = useState<'itinerary' | 'map' | 'budget' | 'documents' | 'notes'>('itinerary');

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1680px] mx-auto text-slate-100">
      {/* 1. HERO BANNER: Santorini, Greece */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl group">
        <img
          src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80"
          alt="Santorini Greece Banner"
          className="w-full h-44 sm:h-52 object-cover object-center group-hover:scale-102 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070a12] via-[#070a12]/80 to-transparent p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/90 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/40">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Santorini, Greece
                </h2>
                <p className="text-xs text-slate-300 font-semibold mt-0.5">
                  12 Jun 2026 – 18 Jun 2026 <span className="text-slate-400 font-normal">(7 days)</span>
                </p>
              </div>
            </div>

            <div className="hidden md:block text-right">
              <p className="text-sm italic font-extrabold text-sky-300 drop-shadow-md">
                "Your trip, our AI crew ✈"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap text-xs">
            <div className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span>3 Travellers</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 font-bold flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>₹ 1,20,000 <span className="text-[10px] text-slate-400 font-normal">(Total Budget)</span></span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/40 text-sky-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Adventure + Culture</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FIVE METRICS CARDS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Estimated Cost */}
        <div className="bg-[#111726] p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Total Estimated Cost</span>
            <div className="w-7 h-7 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">₹ 91,200</div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
            <TrendingDown className="w-3 h-3" />
            <span>12% vs. last plan</span>
          </div>
        </div>

        {/* Flights */}
        <div className="bg-[#111726] p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Flights</span>
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">₹ 32,500</div>
          <p className="text-[11px] text-slate-400">1 booking</p>
        </div>

        {/* Hotels */}
        <div className="bg-[#111726] p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Hotels</span>
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">₹ 28,000</div>
          <p className="text-[11px] text-slate-400">2 bookings</p>
        </div>

        {/* Transport */}
        <div className="bg-[#111726] p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Transport</span>
            <div className="w-7 h-7 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">₹ 8,700</div>
          <p className="text-[11px] text-slate-400">3 bookings</p>
        </div>

        {/* Activities */}
        <div className="bg-[#111726] p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-lg col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Activities</span>
            <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">₹ 22,000</div>
          <p className="text-[11px] text-slate-400">5 booked</p>
        </div>
      </div>

      {/* 3. MAIN OPERATIONAL GRID (Left 8 Cols, Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT 8 COLUMNS: SATELLITE MAP & DAY 2 SCHEDULE CONTAINER */}
        <div className="lg:col-span-8 space-y-5">
          {/* MAP + DAY 2 TIMELINE BOX */}
          <div className="bg-[#111726] rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden p-5 space-y-4">
            {/* Top Sub-Tabs */}
            <div className="flex items-center gap-4 border-b border-slate-800/80 pb-3 text-xs font-bold text-slate-400 overflow-x-auto">
              {(['itinerary', 'map', 'budget', 'documents', 'notes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize pb-1 border-b-2 transition-all ${
                    activeTab === tab
                      ? 'border-blue-500 text-white font-black'
                      : 'border-transparent hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* LEFT HALF: SATELLITE 3D MAP (6 cols) */}
              <div className="md:col-span-6 relative h-[420px] rounded-2xl overflow-hidden border border-slate-800">
                <div className="absolute top-3 left-3 z-[400] bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-white shadow-md flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-sky-400" />
                  <span>3D View</span>
                </div>

                <MapComponent
                  activities={todayItinerary.items}
                  selectedActivityId={selectedActivityId}
                  onSelectActivity={onSelectActivity}
                  height="100%"
                  zoom={12}
                />

                {/* Optimized Route Overlay Card Bottom Left */}
                <div className="absolute bottom-3 left-3 z-[400] bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-700 text-xs shadow-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-sky-400 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Optimized Route</span>
                  </div>
                  <p className="text-white font-extrabold text-xs">
                    12.6 km · <span className="text-emerald-400">32 min</span> <span className="text-[10px] text-slate-400 font-normal">(less travel time)</span>
                  </p>
                </div>
              </div>

              {/* RIGHT HALF: DAY 2 SCHEDULE TIMELINE (6 cols) */}
              <div className="md:col-span-6 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div>
                    <h3 className="font-extrabold text-white text-base">Day 2 · 13 Jun 2026</h3>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    24°C
                  </span>
                </div>

                {/* Day 2 Timeline Events */}
                <div className="space-y-2.5 text-xs">
                  {todayItinerary.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectActivity(item.id)}
                      className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        item.id === selectedActivityId
                          ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-400/40'
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold font-mono text-slate-300 w-11 shrink-0">
                          {item.time}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-xs leading-tight">{item.title}</h4>
                          <span className="text-[10px] text-slate-400">{item.location.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.bookingStatus === 'confirmed' && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold">
                            Confirmed
                          </span>
                        )}
                        {item.bookingStatus === 'planned' && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[9px] font-bold">
                            Planned
                          </span>
                        )}

                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate('itinerary')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-sky-400 hover:text-white font-bold text-xs rounded-xl transition-colors border border-slate-800 flex items-center justify-center gap-1.5"
                >
                  <span>View Full Day Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* LOWER CARDS: DAY 1 FLIGHT/HOTEL & TRIP HIGHLIGHTS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* LEFT: DAY 1 CARD (5 cols) */}
            <div className="md:col-span-5 bg-[#111726] p-5 rounded-3xl border border-slate-800/80 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="font-extrabold text-white text-sm">Day 1 · 12 Jun 2026</h3>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5" /> 22°C
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* Flight Card */}
                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">Flight 6E 427</h4>
                      <p className="text-[10px] text-slate-400">Chennai → Santorini (JTR) · 06:45 - 10:15</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                    Confirmed
                  </span>
                </div>

                {/* Hotel Check-in Card */}
                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">Hotel Check-in</h4>
                      <p className="text-[10px] text-slate-400">Villa Firostefani · 3 nights</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: TRIP HIGHLIGHTS CAROUSEL/CARDS (7 cols) */}
            <div className="md:col-span-7 bg-[#111726] p-5 rounded-3xl border border-slate-800/80 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  Trip Highlights
                </h3>
              </div>

              {/* Photos Cards Row */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-28 group">
                  <img
                    src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80"
                    alt="Oia Sunset"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-2.5 flex flex-col justify-end">
                    <h5 className="font-black text-white text-xs">Oia Sunset</h5>
                    <p className="text-[9px] text-slate-300">Iconic views & white buildings</p>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-28 group">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
                    alt="Red Beach"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-2.5 flex flex-col justify-end">
                    <h5 className="font-black text-white text-xs">Red Beach</h5>
                    <p className="text-[9px] text-slate-300">Unique volcanic beach</p>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-28 group">
                  <img
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80"
                    alt="Akrotiri Ruins"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-2.5 flex flex-col justify-end">
                    <h5 className="font-black text-white text-xs">Akrotiri Ruins</h5>
                    <p className="text-[9px] text-slate-300">Ancient Minoan city</p>
                  </div>
                </div>
              </div>

              {/* Bottom Tag Pills */}
              <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-slate-300 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  🍲 Local Cuisine <span className="text-slate-500 font-normal">Greek food & wine</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  🗓 Best Time <span className="text-slate-500 font-normal">Jun – Sep</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  💡 Travel Smart <span className="text-slate-500 font-normal">Less travel, more fun</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 4 COLUMNS: ASSISTANT, UPCOMING ALERTS & AI SUGGESTIONS */}
        <div className="lg:col-span-4 space-y-5">
          {/* PANEL 1: TRAVELPILOT ASSISTANT CARD */}
          <div className="bg-[#111726] p-5 rounded-3xl border border-slate-800/80 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm">TravelPilot Assistant</h3>
                <p className="text-[10px] text-slate-400 font-medium">Your personal travel companion</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 text-xs max-h-[260px] overflow-y-auto pr-1">
              {/* User Bubble */}
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] font-medium">
                  What is the plan for tomorrow morning?
                </div>
              </div>

              {/* AI Assistant Response Bubble */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-900/90 border border-slate-800 text-slate-200 p-3.5 rounded-2xl rounded-tl-none space-y-2 leading-relaxed">
                  <p className="font-semibold text-white">Here's your plan for <strong>tomorrow morning (Day 2)</strong>:</p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300 font-medium">
                    <li><strong>8:00 AM</strong> – Boat Tour to Volcano & Hot Springs (Athinios Port)</li>
                    <li><strong>1:30 PM</strong> – Lunch at Metaxi Mas (Fira, Greek cuisine)</li>
                    <li><strong>2:00 PM</strong> – Visit Akrotiri Archaeological Site (2 hrs)</li>
                  </ol>
                  <p className="text-slate-300 font-normal">
                    The boat tour is close to your hotel and fits well with your schedule. Would you like me to show the route on the map?
                  </p>
                  <button
                    onClick={() => onNavigate('map')}
                    className="mt-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-[11px] flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Show on Map</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Prompt Pills */}
            <div className="space-y-1.5 pt-1 text-[11px]">
              <button
                onClick={() => onNavigate('ask-travelpilot')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium border border-slate-800 transition-colors"
              >
                Can I fit this activity into today's schedule?
              </button>
              <button
                onClick={() => onNavigate('ask-travelpilot')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium border border-slate-800 transition-colors"
              >
                Which activities are close to my hotel?
              </button>
              <button
                onClick={() => onNavigate('ask-travelpilot')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium border border-slate-800 transition-colors"
              >
                What if my flight is delayed?
              </button>
            </div>

            {/* Chat Input Field */}
            <div className="relative pt-1">
              <input
                type="text"
                value={assistantInput}
                onChange={(e) => setAssistantInput(e.target.value)}
                placeholder="Ask me anything about your trip..."
                className="w-full bg-slate-900/90 text-xs text-white placeholder-slate-500 pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => onNavigate('ask-travelpilot')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* PANEL 2: UPCOMING ALERTS CARD */}
          <div className="bg-[#111726] p-5 rounded-3xl border border-slate-800/80 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-rose-400" />
                Upcoming Alerts
              </h3>
              <button
                onClick={() => onNavigate('disruptions')}
                className="text-xs font-bold text-sky-400 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Alert 1 */}
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Hotel booking expires in 2 days</h4>
                    <p className="text-[10px] text-slate-400">Villa Firostefani · 12 Jun - 18 Jun</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-medium shrink-0">2h ago</span>
              </div>

              {/* Alert 2 */}
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Activity starts in 1 hour</h4>
                    <p className="text-[10px] text-slate-400">Boat Tour to Volcano & Hot Springs</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-medium shrink-0">1h ago</span>
              </div>

              {/* Alert 3 */}
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Flight check-in opens in 5 hours</h4>
                    <p className="text-[10px] text-slate-400">IndiGo 6E 427 · Chennai → Santorini</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-medium shrink-0">5h ago</span>
              </div>
            </div>
          </div>

          {/* PANEL 3: AI SUGGESTION BOX (Emerald Glow) */}
          <div className="bg-emerald-950/40 p-5 rounded-3xl border border-emerald-500/40 shadow-xl shadow-emerald-500/10 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Suggestion</span>
            </div>
            <p className="text-xs text-emerald-200 font-medium leading-relaxed">
              Considering the delayed flight, we've adjusted your Day 1 activities to reduce overlap.
            </p>
            <button
              onClick={() => onNavigate('itinerary')}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Updated Itinerary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM FLOATING ACTION BAR */}
      <div className="bg-[#111726]/95 backdrop-blur-md p-4 rounded-3xl border border-slate-800/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 sticky bottom-4 z-20">
        {/* Expense Progress Bar */}
        <div className="flex items-center gap-4 w-full md:w-auto text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Expense Tracker</span>
            <span className="font-black text-white text-sm">
              ₹ 64,200 spent <span className="text-slate-400 font-normal">/ ₹ 91,200</span>
            </span>
          </div>

          <div className="w-44 h-2.5 rounded-full bg-slate-800 overflow-hidden hidden sm:block">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-full w-[70%] rounded-full shadow-md" />
          </div>
          <span className="text-xs font-extrabold text-sky-400 hidden sm:inline">70%</span>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto justify-end">
          <button
            onClick={() => onNavigate('itinerary')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to...</span>
          </button>
          <button
            onClick={() => onNavigate('replan')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            <span>Modify</span>
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 shrink-0"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Find</span>
          </button>
          <button
            onClick={() => onNavigate('trip-summary')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 shrink-0"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
