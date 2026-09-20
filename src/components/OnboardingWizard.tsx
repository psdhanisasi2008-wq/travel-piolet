import React, { useState } from 'react';
import { Compass, ArrowRight, MapPin, Calendar, DollarSign, AlertCircle } from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('Tokyo, Japan');
  const [dates, setDates] = useState('Oct 12 – Oct 18, 2026');
  const [budget, setBudget] = useState('60000');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Food',
    'Culture',
    'Photography',
    'Technology'
  ]);
  const [pace, setPace] = useState<'Relaxed' | 'Balanced' | 'Packed'>('Balanced');
  const [travelers, setTravelers] = useState(2);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isReadyDashboard, setIsReadyDashboard] = useState(false);

  const interestsList = [
    'Food',
    'Culture',
    'History',
    'Nature',
    'Shopping',
    'Photography',
    'Technology',
    'Nightlife',
    'Adventure',
    'Relaxation'
  ];

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else if (step === 6) {
      // Step 7: Building animation
      setIsBuilding(true);
      setTimeout(() => {
        setIsBuilding(false);
        setIsReadyDashboard(true);
      }, 2000);
    }
  };

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  if (isBuilding) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center shadow-xl animate-bounce mb-6">
          <Compass className="w-8 h-8 animate-spin-slow text-slate-950" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">Building Your Tokyo Operating System...</h2>
        <p className="text-sm text-slate-400 mt-2 max-w-sm">
          Calculating transport times, mapping coordinates, verifying buffers & budget allocations.
        </p>
      </div>
    );
  }

  if (isReadyDashboard) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 text-white flex items-center justify-center p-6 overflow-y-auto">
        <div className="bg-white text-slate-900 max-w-xl w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Tokyo trip is ready.</h2>
              <p className="text-xs text-slate-500 font-medium">Oct 12 – 18, 2026 · 2 Travelers</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-black text-slate-900 text-base block">7</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Days</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-black text-slate-900 text-base block">18</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Activities</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-black text-slate-900 text-base block">6</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Bookings</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-black text-emerald-700 text-sm block">₹42,500</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Est. Cost</span>
            </div>
          </div>

          {/* Actionable Decisions Card */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>3 DECISIONS NEED YOUR ATTENTION</span>
            </div>
            <div className="space-y-1.5 text-xs text-amber-950 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center">1</span>
                <span>Choose dinner on Day 2 (Ginza Sushi Omakase vs Afuri)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center">2</span>
                <span>Confirm airport monorail transfer timing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center">3</span>
                <span>Review TeamLab Borderless 14:30 entry buffer</span>
              </div>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3 bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Progress Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
          <span>Step {step} of 6</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <span
                key={s}
                className={`w-2 h-2 rounded-full ${s === step ? 'bg-teal-600' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Destination */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Where are you going?</h2>
            <div className="relative">
              <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Search destination city..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-900"
              />
            </div>
          </div>
        )}

        {/* Step 2: Dates */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">When are you traveling?</h2>
            <div className="relative">
              <Calendar className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="Oct 12 – Oct 18, 2026"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-900"
              />
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">What's your total budget limit?</h2>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="60000"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-900"
              />
            </div>
          </div>
        )}

        {/* Step 4: Interests */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">What are you interested in?</h2>
            <div className="flex flex-wrap gap-2">
              {interestsList.map((item) => {
                const isSelected = selectedInterests.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleInterest(item)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Pace */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">How do you like to travel?</h2>
            <div className="grid grid-cols-3 gap-3 text-xs font-bold">
              {['Relaxed', 'Balanced', 'Packed'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPace(p as any)}
                  className={`p-4 rounded-2xl border transition-all ${
                    pace === p
                      ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Travelers */}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">How many travelers?</h2>
            <div className="grid grid-cols-4 gap-3 text-xs font-bold">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setTravelers(num)}
                  className={`p-4 rounded-2xl border transition-all ${
                    travelers === num
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {num} {num === 4 ? '+' : ''}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              Back
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
          >
            <span>{step === 6 ? 'Build my trip' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
