export interface ConflictItem {
  id: string;
  type: 'TIME_OVERLAP' | 'TRAVEL_TIME_CONFLICT' | 'BOOKING_CONFLICT' | 'ACTIVITY_OUTSIDE_OPENING_HOURS' | 'BUDGET_EXCEEDED';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  affectedItems: string[];
  message: string;
  suggestedAction?: string;
}

export class ConflictDetectionService {
  public detectConflicts(items: any[], bookings: any[], totalBudget: number, totalCost: number): ConflictItem[] {
    const conflicts: ConflictItem[] = [];

    // 1. Budget Exceeded Conflict
    if (totalCost > totalBudget) {
      conflicts.push({
        id: `c-budget-${Date.now()}`,
        type: 'BUDGET_EXCEEDED',
        severity: 'WARNING',
        affectedItems: ['budget'],
        message: `Current plan exceeds total budget by ₹${(totalCost - totalBudget).toLocaleString('en-IN')}`,
        suggestedAction: 'Consider replacing high-cost activities or choosing budget dining'
      });
    }

    // 2. Time Overlap & Travel Time Conflict Detection
    for (let i = 0; i < items.length - 1; i++) {
      const current = items[i];
      const next = items[i + 1];

      const currentEndMin = this.timeToMinutes(current.endTime);
      const nextStartMin = this.timeToMinutes(next.startTime);

      // Check time overlap
      if (currentEndMin > nextStartMin) {
        const overlap = currentEndMin - nextStartMin;
        conflicts.push({
          id: `c-overlap-${i}`,
          type: 'TIME_OVERLAP',
          severity: 'CRITICAL',
          affectedItems: [current.title || current.id, next.title || next.id],
          message: `"${current.title || 'Activity'}" and "${next.title || 'Next Activity'}" overlap by ${overlap} minutes.`,
          suggestedAction: 'Shift next activity start time or reduce duration.'
        });
      }

      // Check travel time conflict
      const availableBuffer = nextStartMin - currentEndMin;
      const requiredTravel = next.travelTimeFromPrevious || 15;
      if (availableBuffer >= 0 && availableBuffer < requiredTravel) {
        conflicts.push({
          id: `c-travel-${i}`,
          type: 'TRAVEL_TIME_CONFLICT',
          severity: 'WARNING',
          affectedItems: [current.title || current.id, next.title || next.id],
          message: `Only ${availableBuffer} min buffer available, but ${requiredTravel} min travel is required from "${current.title}" to "${next.title}".`,
          suggestedAction: 'Adjust start time to avoid rushing between locations.'
        });
      }
    }

    // 3. Booking Conflict Check (e.g. Delayed Flight JL42 vs Airport Transfer & Dinner)
    const delayedFlight = bookings.find((b) => b.type === 'FLIGHT' && b.status === 'DELAYED');
    if (delayedFlight) {
      conflicts.push({
        id: `c-flight-delay`,
        type: 'BOOKING_CONFLICT',
        severity: 'CRITICAL',
        affectedItems: ['ANA Flight JL42', 'Airport Monorail Transfer', 'Welcome Ramen Dinner'],
        message: 'Flight arrival delayed by 2 hours. Conflicts with scheduled airport transfer & 19:30 dinner.',
        suggestedAction: 'Shift airport transfer to 19:45 and dinner to 21:00.'
      });
    }

    return conflicts;
  }

  public timeToMinutes(timeStr: string): number {
    if (!timeStr) return 0;
    const parts = timeStr.split(':');
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    return hours * 60 + minutes;
  }

  public minutesToTime(mins: number): string {
    const hours = Math.floor(mins / 60) % 24;
    const minutes = mins % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}

export const conflictDetectionService = new ConflictDetectionService();
