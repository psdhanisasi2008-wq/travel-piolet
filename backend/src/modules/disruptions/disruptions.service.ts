import { conflictDetectionService } from './conflict.service';
import { mockStore } from '../../utils/mockStore';

export class DisruptionService {
  public async handleFlightDelay(tripId: string, delayMinutes: number = 120) {
    const flight = mockStore.bookings.find((b) => b.type === 'FLIGHT') || mockStore.bookings[0];
    flight.status = 'DELAYED';
    flight.startTime = '09:40';
    flight.endTime = '19:10'; // Delayed from 17:10 -> 19:10

    const disruption = {
      id: `disruption-${Date.now()}`,
      tripId,
      type: 'FLIGHT_DELAY',
      title: 'FLIGHT DELAY DETECTED',
      subtitle: `⚠ ${flight.name} delayed by ${delayMinutes / 60} hours`,
      severity: 'high',
      originalTime: '17:10',
      newTime: '19:10',
      applied: false,
      detectedAt: 'Just now',
      impacts: [
        {
          itemTitle: 'Hotel Shibuya Stream Check-in',
          type: 'hotel',
          impactStatus: 'no-impact',
          detail: 'Front desk notified for late check-in. Room held.'
        },
        {
          itemTitle: 'Airport Monorail Express',
          type: 'transfer',
          impactStatus: 'conflict',
          detail: 'Original 18:15 transfer missed. Next available train at 19:45.'
        },
        {
          itemTitle: 'Welcome Ramen Dinner at Ichiran',
          type: 'dinner',
          impactStatus: 'conflict',
          detail: 'Original 19:30 slot conflicts with train arrival.'
        },
        {
          itemTitle: 'TeamLab Borderless (Oct 13)',
          type: 'activity',
          impactStatus: 'no-impact',
          detail: 'Next day schedule remains 100% stable.'
        }
      ],
      currentTimeline: [
        { time: '17:10', event: 'Airport arrival' },
        { time: '18:00', event: 'Airport transfer' },
        { time: '19:00', event: 'Hotel check-in' },
        { time: '20:00', event: 'Ramen Dinner' }
      ],
      proposedTimeline: [
        { time: '19:10', event: 'Airport arrival (Delayed)' },
        { time: '19:45', event: 'Airport transfer (Adjusted)' },
        { time: '20:30', event: 'Hotel check-in' },
        { time: '21:00', event: 'Ramen Dinner (Moved 1 hr)' }
      ]
    };

    mockStore.disruptions.unshift(disruption);

    // Create ReplanProposal
    const proposal = {
      id: `prop-${Date.now()}`,
      tripId,
      disruptionId: disruption.id,
      changes: [
        {
          item: 'Airport Monorail Express',
          oldStart: '18:15',
          newStart: '19:45',
          reason: 'Moved because flight delay shifted arrival to 19:10.'
        },
        {
          item: 'Welcome Ramen Dinner at Ichiran',
          oldStart: '19:30',
          newStart: '21:00',
          reason: 'Adjusted to fit train transfer arrival at hotel.'
        }
      ],
      travelTimeChange: 0,
      costChange: 0,
      conflictsResolved: 2,
      applied: false,
      createdAt: new Date()
    };

    mockStore.replanProposals.unshift(proposal);

    // Create Notification
    mockStore.notifications.unshift({
      id: `notif-${Date.now()}`,
      tripId,
      userId: 'demo-user-id',
      type: 'disruption',
      title: 'Flight Delay Incident Triggered',
      message: `${flight.name} delayed by ${delayMinutes} mins. 2 evening schedule items adjusted.`,
      read: false,
      actionUrl: 'disruptions',
      createdAt: new Date()
    });

    return {
      disruption,
      affectedItems: ['Airport Transfer', 'Welcome Ramen Dinner'],
      conflicts: [
        'Airport transfer timing missed due to 19:10 flight landing',
        'Dinner reservation at 19:30 conflicts with late hotel check-in'
      ],
      proposal
    };
  }

  public async getDisruptions(tripId: string) {
    return mockStore.disruptions;
  }
}

export const disruptionService = new DisruptionService();
