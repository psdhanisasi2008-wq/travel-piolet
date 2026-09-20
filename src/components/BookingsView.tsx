import React, { useState } from 'react';
import { Booking } from '../types';
import { CreditCard, CheckCircle2, AlertTriangle, ChevronRight, Search, Plus } from 'lucide-react';

interface BookingsViewProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({ bookings, onSelectBooking }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['all', 'flights', 'hotels', 'transport', 'activities', 'restaurants'];

  const filteredBookings = bookings.filter((b) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'flights' && b.type === 'flight') ||
      (activeTab === 'hotels' && b.type === 'hotel') ||
      (activeTab === 'transport' && b.type === 'transport') ||
      (activeTab === 'activities' && b.type === 'activity') ||
      (activeTab === 'restaurants' && b.type === 'restaurant');

    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.confirmationNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalCost = bookings.reduce((sum, b) => sum + b.costINR, 0);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-600" />
            Bookings Hub
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Unified travel reservations, confirmation numbers & live impact tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Booked</span>
            <span className="font-extrabold text-slate-900">₹{totalCost.toLocaleString('en-IN')}</span>
          </div>
          <button
            onClick={() => alert('Connect booking confirmation email or PNR code')}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 text-teal-300" />
            <span>Add Booking</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize shrink-0 transition-all ${
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking or PNR..."
            className="w-full bg-slate-50 text-xs text-slate-900 placeholder-slate-400 pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead className="bg-slate-50/80 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-200/80 tracking-wider">
              <tr>
                <th className="p-4">Booking</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Cost</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => onSelectBooking(b)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                        {b.type.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{b.title}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">PNR: {b.confirmationNumber}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{b.date}</div>
                    <div className="text-[11px] text-slate-500">{b.time}</div>
                  </td>

                  <td className="p-4 font-medium text-slate-700">{b.location}</td>

                  <td className="p-4">
                    {b.status === 'confirmed' ? (
                      <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Confirmed
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px] inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        {b.status}
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right font-extrabold text-slate-900">
                    ₹{b.costINR.toLocaleString('en-IN')}
                  </td>

                  <td className="p-4 text-center">
                    <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
