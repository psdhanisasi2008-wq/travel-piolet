import { disruptionService } from '../disruptions/disruptions.service';
import { mockStore } from '../../utils/mockStore';

export class DemoService {
  public async simulateFlightDelay(tripId: string, delayMinutes: number = 120) {
    const result = await disruptionService.handleFlightDelay(tripId || 'trip-tokyo-101', delayMinutes);
    return {
      success: true,
      message: `Flight delay simulated (${delayMinutes} mins).`,
      affectedItems: result.affectedItems.length,
      conflicts: result.conflicts.length,
      proposalId: result.proposal.id,
      disruption: result.disruption,
      proposal: result.proposal
    };
  }

  public async simulateActivityCancel(tripId: string, activityName?: string) {
    const target = activityName || 'TeamLab Borderless';
    const notif = {
      id: `notif-${Date.now()}`,
      tripId: tripId || 'trip-tokyo-101',
      userId: 'demo-user-id',
      type: 'warning',
      title: 'Activity Cancellation Alert',
      message: `${target} has announced an unscheduled maintenance closure for tomorrow. Alternative backup recommended.`,
      read: false,
      actionUrl: 'alternatives',
      createdAt: new Date()
    };
    mockStore.notifications.unshift(notif);
    return {
      success: true,
      message: `Activity cancellation simulated for ${target}.`,
      notification: notif
    };
  }

  public async simulateBudgetChange(tripId: string, newBudget: number) {
    const targetTrip = mockStore.trips.find(t => t.id === tripId) || mockStore.trips[0];
    const oldBudget = targetTrip.budget;
    targetTrip.budget = newBudget;

    const plannedCost = mockStore.expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const excess = Math.max(0, plannedCost - newBudget);

    const notif = {
      id: `notif-${Date.now()}`,
      tripId: tripId || 'trip-tokyo-101',
      userId: 'demo-user-id',
      type: 'budget',
      title: 'Trip Budget Updated',
      message: `Budget updated from ₹${oldBudget.toLocaleString()} to ₹${newBudget.toLocaleString()}.${excess > 0 ? ` WARNING: Current plan exceeds budget by ₹${excess.toLocaleString()}.` : ''}`,
      read: false,
      actionUrl: 'budget',
      createdAt: new Date()
    };
    mockStore.notifications.unshift(notif);

    return {
      success: true,
      message: `Budget updated to ₹${newBudget.toLocaleString()}`,
      oldBudget,
      newBudget,
      excess,
      notification: notif
    };
  }

  public async resetDemo() {
    // Re-initialize mockStore or reset mutable flags
    mockStore.disruptions.forEach(d => d.applied = false);
    mockStore.replanProposals.forEach(p => p.applied = false);
    return {
      success: true,
      message: 'Demo state reset to initial baseline.'
    };
  }

  public async seedDemo() {
    return {
      success: true,
      message: 'Demo data seeded successfully.',
      tripId: 'trip-tokyo-101',
      user: mockStore.users[0]
    };
  }
}

export const demoService = new DemoService();
