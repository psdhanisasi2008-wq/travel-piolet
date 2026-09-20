import React, { useState } from 'react';
import type { TripConstraints, ViewMode } from '../types';
import { Sparkles, CheckCircle2, Sliders } from 'lucide-react';

interface ReplanWorkspaceProps {
  constraints: TripConstraints;
  onUpdateConstraints: (newConstraints: TripConstraints) => void;
  onApplyNewItinerary: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const ReplanWorkspace: React.FC<ReplanWorkspaceProps> = ({
  constraints,
  onUpdateConstraints,
  onApplyNewItinerary,
}) => {
  const [budgetInput, setBudgetInput] = useState(constraints.totalBudgetINR.toString());
  const [travelers, setTravelers] = useState(constraints.travelersCount);
  const [pace, setPace] = useState(constraints.pace);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(constraints.interests);

  const allInterests = ['Food', 'Culture', 'Photography', 'Technology', 'Nature', 'Shopping', 'Nightlife'];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const isBudgetReduced = parseFloat(budgetInput) < 60000;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 bg-teal-500 text-slate-950 font-extrabold text-[10px] uppercase rounded">
            Interactive Trip Engine
          </span>
          <span className="text-xs text-slate-400 font-medium">Tokyo · Oct 12–18</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-teal-400" />
          Replan Workspace
        </h2>
        <p className="text-xs text-slate-300 font-medium">
          Modify budget, duration, pace or travel interests. TravelPilot rebuilds your 7-day schedule instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: CONTROLS & CONSTRAINTS (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-600" />
            CURRENT CONSTRAINTS
          </h3>

          <div className="space-y-4 text-xs">
            {/* Budget Input Slider/Field */}
            <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Total Budget Limit (INR):</span>
                <span className="text-teal-700 font-black">₹{parseFloat(budgetInput).toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="30000"
                max="100000"
                step="5000"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="w-full accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>₹30,000 (Budget)</span>
                <span>₹60,000 (Current)</span>
                <span>₹1,00,000 (Luxury)</span>
              </div>
            </div>

            {/* Travelers & Pace */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Travelers</span>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value, 10))}
                  className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 font-bold text-slate-900"
                >
                  <option value={1}>1 Solo</option>
                  <option value={2}>2 Travelers</option>
                  <option value={3}>3 Travelers</option>
                  <option value={4}>4+ Family</option>
                </select>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Travel Pace</span>
                <select
                  value={pace}
                  onChange={(e) => setPace(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 font-bold text-slate-900"
                >
                  <option value="Relaxed">Relaxed</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Packed">Packed</option>
                </select>
              </div>
            </div>

            {/* Interests Selector */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Travel Interests</span>
              <div className="flex flex-wrap gap-1.5">
                {allInterests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PLANNING IMPACT & SIDE-BY-SIDE COMPARISON (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Planning Impact Callout */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
              PLANNING IMPACT ANALYTICS
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Activities Replaced</span>
                <span className="font-black text-slate-900 text-sm">{isBudgetReduced ? '3 items' : '1 item'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Savings</span>
                <span className="font-black text-emerald-700 text-sm">
                  {isBudgetReduced ? '₹15,000' : '₹0'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Travel Time Impact</span>
                <span className="font-black text-slate-900 text-sm">-35 min/day</span>
              </div>
            </div>
          </div>

          {/* Side by Side Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CURRENT PLAN */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-black text-slate-900">CURRENT DAY 2</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-bold text-[10px] rounded">
                  ₹60,000 Budget
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg font-medium text-slate-800">
                  09:30 Shibuya Crossing
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg font-medium text-slate-800">
                  11:00 Meiji Shrine
                </div>
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg font-bold text-slate-900">
                  14:30 TeamLab Borderless (₹3,200)
                </div>
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg font-bold text-slate-900">
                  18:30 Ginza Sushi Omakase (₹6,500)
                </div>
              </div>
            </div>

            {/* PROPOSED PLAN */}
            <div className="bg-teal-50/50 p-5 rounded-2xl border border-teal-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                <span className="text-xs font-black text-teal-900">PROPOSED DAY 2</span>
                <span className="px-2 py-0.5 bg-teal-200 text-teal-950 font-bold text-[10px] rounded">
                  {isBudgetReduced ? '₹45,000 Budget' : 'Optimized'}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg font-medium text-slate-800 border border-slate-100">
                  09:30 Shibuya Crossing
                </div>
                <div className="p-2.5 bg-white rounded-lg font-medium text-slate-800 border border-slate-100">
                  11:00 Meiji Shrine & Yoyogi Park
                </div>
                <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-lg font-bold text-emerald-950">
                  14:30 Mori Art Museum View (₹1,500)
                </div>
                <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-lg font-bold text-emerald-950">
                  18:30 Afuri Izakaya Dinner (₹2,200)
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onUpdateConstraints({
                dates: 'Oct 12 – 18, 2026',
                totalBudgetINR: parseFloat(budgetInput),
                travelersCount: travelers,
                interests: selectedInterests,
                pace: pace as any,
                hotelPreference: 'Boutique Shibuya',
                transportPreference: 'JR Rail & Metro Pass'
              });
              onApplyNewItinerary();
            }}
            className="w-full py-3 bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Apply new itinerary to whole trip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
