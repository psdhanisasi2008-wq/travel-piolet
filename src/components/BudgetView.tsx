import React, { useState } from 'react';
import { Expense, BudgetItem } from '../types';
import { PieChart, Plus, CheckCircle2, DollarSign, Wallet, ArrowUpRight, Lock, Edit3 } from 'lucide-react';

interface BudgetViewProps {
  totalBudgetINR: number;
  spentBudgetINR: number;
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onUpdateTotalBudget: (newLimit: number) => void;
  onToggleExpensePaid: (id: string) => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  totalBudgetINR,
  spentBudgetINR,
  expenses,
  onAddExpense,
  onUpdateTotalBudget,
  onToggleExpensePaid
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditBudget, setShowEditBudget] = useState(false);
  const [newBudgetInput, setNewBudgetInput] = useState(totalBudgetINR.toString());

  // Form states for new expense
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<Expense['category']>('food');
  const [expAmount, setExpAmount] = useState('');

  const remainingINR = Math.max(0, totalBudgetINR - spentBudgetINR);
  const percentUsed = Math.min(100, Math.round((spentBudgetINR / totalBudgetINR) * 100));

  const categoriesData: { name: BudgetItem['category']; label: string; allocated: number; spent: number; color: string }[] = [
    { name: 'accommodation', label: 'Accommodation', allocated: 24000, spent: 24000, color: 'bg-teal-600' },
    { name: 'transportation', label: 'Transportation', allocated: 12500, spent: 20200, color: 'bg-indigo-600' },
    { name: 'activities', label: 'Activities', allocated: 8000, spent: 6000, color: 'bg-amber-500' },
    { name: 'food', label: 'Food & Dining', allocated: 10000, spent: 7700, color: 'bg-orange-500' },
    { name: 'shopping', label: 'Shopping', allocated: 3500, spent: 3500, color: 'bg-pink-500' },
    { name: 'other', label: 'Other / Misc', allocated: 2000, spent: 500, color: 'bg-slate-400' }
  ];

  const dailySpending = [
    { day: 'Day 1 (Oct 12)', amount: 8400, items: 3 },
    { day: 'Day 2 (Oct 13)', amount: 6700, items: 4 },
    { day: 'Day 3 (Oct 14)', amount: 7800, items: 4 },
    { day: 'Day 4 (Oct 15)', amount: 1800, items: 2 },
    { day: 'Day 5 (Oct 16)', amount: 2500, items: 2 },
    { day: 'Day 6 (Oct 17)', amount: 5500, items: 2 },
    { day: 'Day 7 (Oct 18)', amount: 2000, items: 1 }
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle || !expAmount) return;

    onAddExpense({
      title: expTitle,
      category: expCategory,
      amountINR: parseFloat(expAmount),
      date: 'Oct 13',
      paid: true,
      dayNumber: 2
    });

    setExpTitle('');
    setExpAmount('');
    setShowAddModal(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <PieChart className="w-5 h-5 text-teal-600" />
            Trip Budget
          </h2>
          <p className="text-xs text-slate-500 font-medium">Real-time expenditure tracking & category optimization.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowEditBudget(!showEditBudget)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Budget Limit</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 text-teal-300" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Edit Budget Limit Drawer Bar */}
      {showEditBudget && (
        <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 flex items-center justify-between gap-4 text-xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-teal-700" />
            <span className="font-bold text-teal-900">Set Total Trip Budget Limit (INR):</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={newBudgetInput}
              onChange={(e) => setNewBudgetInput(e.target.value)}
              className="bg-white px-3 py-1.5 rounded-lg border border-teal-300 text-xs font-bold text-slate-900 w-36"
            />
            <button
              onClick={() => {
                onUpdateTotalBudget(parseFloat(newBudgetInput));
                setShowEditBudget(false);
              }}
              className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-lg"
            >
              Save Limit
            </button>
          </div>
        </div>
      )}

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Estimated Total Budget
          </span>
          <div className="text-2xl font-black text-slate-900">
            ₹{totalBudgetINR.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Target budget for 7 days (2 travelers)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Committed / Spent
          </span>
          <div className="text-2xl font-black text-teal-700">
            ₹{spentBudgetINR.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">{percentUsed}% of allocated budget utilized</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Remaining Buffer
          </span>
          <div className="text-2xl font-black text-emerald-700">
            ₹{remainingINR.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">Healthy buffer for dining & activities</p>
        </div>
      </div>

      {/* Clean Horizontal Breakdown Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm">Category Budget Allocation</h3>
          <span className="text-xs text-slate-500 font-medium">₹{spentBudgetINR} / ₹{totalBudgetINR}</span>
        </div>

        {/* Multi-segment progress bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
          {categoriesData.map((cat) => {
            const width = ((cat.spent / totalBudgetINR) * 100).toFixed(1);
            return (
              <div
                key={cat.name}
                style={{ width: `${width}%` }}
                className={`${cat.color} h-full transition-all`}
                title={`${cat.label}: ₹${cat.spent}`}
              />
            );
          })}
        </div>

        {/* Category Legend Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2 text-xs">
          {categoriesData.map((cat) => (
            <div key={cat.name} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                <span className="font-bold text-slate-800 text-[11px] truncate">{cat.label}</span>
              </div>
              <div className="font-extrabold text-slate-900">₹{cat.spent.toLocaleString('en-IN')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Spending & Expense List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Daily Spending List (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3">
            DAILY SPENDING BREAKDOWN
          </h3>

          <div className="space-y-2.5 text-xs">
            {dailySpending.map((ds) => (
              <div
                key={ds.day}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{ds.day}</span>
                  <span className="text-[10px] text-slate-400">{ds.items} items logged</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm">
                  ₹{ds.amount.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itemized Expenses Table (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Itemized Expense Log</h3>
            <span className="text-xs text-slate-500 font-medium">{expenses.length} Records</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {expenses.map((exp) => (
              <div key={exp.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleExpensePaid(exp.id)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                      exp.paid ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {exp.paid ? '✓' : ''}
                  </button>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{exp.title}</h4>
                    <span className="text-[10px] text-slate-400 capitalize">{exp.category} · {exp.date}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-slate-900 text-xs">
                    ₹{exp.amountINR.toLocaleString('en-IN')}
                  </span>
                  <span className={`block text-[9px] font-bold ${exp.paid ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {exp.paid ? 'PAID' : 'PENDING'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSubmit}
            className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <h3 className="font-extrabold text-slate-900 text-lg">Add New Expense</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Expense Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Souvenir shopping in Shibuya"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="food">Food & Dining</option>
                  <option value="activities">Activities</option>
                  <option value="transportation">Transportation</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="shopping">Shopping</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Amount (INR)</label>
                <input
                  type="number"
                  required
                  placeholder="2500"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Save Expense
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
