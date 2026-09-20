import { mockStore } from '../../utils/mockStore';

export class BudgetService {
  public async getBudget(tripId: string) {
    const trip = mockStore.trips.find((t) => t.id === tripId) || mockStore.trips[0];
    const totalLimit = trip.budget || 60000;

    const expenses = mockStore.expenses.filter((e) => e.tripId === tripId || tripId === 'trip-tokyo-123');
    const spentCost = expenses.reduce((sum, e) => sum + e.amount, 0);
    const plannedCost = 42500;

    return {
      totalLimit,
      totalBudget: totalLimit,
      plannedCost,
      spentCost,
      remainingBuffer: Math.max(0, totalLimit - spentCost),
      remaining: Math.max(0, totalLimit - spentCost),
      currency: trip.currency || 'INR',
      categories: {
        accommodation: 24000,
        transportation: 12500,
        activities: 8000,
        food: 10000,
        shopping: 3500,
        other: 2000
      }
    };
  }

  public async updateBudgetLimit(tripId: string, newLimit: number) {
    const trip = mockStore.trips.find((t) => t.id === tripId) || mockStore.trips[0];
    const oldLimit = trip.budget;
    trip.budget = newLimit;

    // Check if new budget limit creates budget excess warning
    const currentPlannedCost = 42500;
    const isExcess = currentPlannedCost > newLimit;

    let proposal = null;
    if (isExcess) {
      proposal = {
        message: `Current plan exceeds new budget limit of ₹${newLimit.toLocaleString('en-IN')} by ₹${(currentPlannedCost - newLimit).toLocaleString('en-IN')}.`,
        suggestedAdjustments: [
          'Replace TeamLab Borderless (₹3,200) with Mori Art Museum (₹1,500)',
          'Choose lower-cost Afuri Ramen Izakaya (₹2,200) over Ginza Omakase (₹6,500)'
        ],
        estimatedSavings: 6000
      };

      mockStore.notifications.unshift({
        id: `notif-${Date.now()}`,
        tripId,
        userId: 'demo-user-id',
        type: 'budget',
        title: 'Budget Limit Exceeded Warning',
        message: `New budget limit ₹${newLimit.toLocaleString('en-IN')} is lower than planned expenses.`,
        read: false,
        actionUrl: 'replan',
        createdAt: new Date()
      });
    }

    return {
      totalLimit: newLimit,
      oldLimit,
      isExcess,
      proposal
    };
  }

  public async getExpenses(tripId: string) {
    return mockStore.expenses.filter((e) => e.tripId === tripId || tripId === 'trip-tokyo-123');
  }

  public async addExpense(tripId: string, data: any) {
    const expense = {
      id: `exp-${Date.now()}`,
      tripId,
      title: data.title,
      category: data.category || 'other',
      amount: data.amount || 0,
      currency: data.currency || 'INR',
      date: data.date || 'Oct 13',
      paid: data.paid !== undefined ? data.paid : true,
      dayNumber: data.dayNumber || 2,
      createdAt: new Date()
    };

    mockStore.expenses.unshift(expense);
    return expense;
  }
}

export const budgetService = new BudgetService();
