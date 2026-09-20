import { itineraryGenerationEngine } from './generation.engine';
import { conflictDetectionService } from '../disruptions/conflict.service';
import { mockStore } from '../../utils/mockStore';

export class ItineraryService {
  public async generateItinerary(tripId: string, options: any = {}) {
    const trip = mockStore.trips.find((t) => t.id === tripId) || mockStore.trips[0];
    const generated = await itineraryGenerationEngine.generate7DayItinerary(tripId, trip.preferences, trip.constraints);

    // Save itinerary version
    const newVersion = mockStore.itineraries.length + 1;
    const itinRecord = {
      id: `itin-v${newVersion}`,
      tripId,
      version: newVersion,
      status: 'ACTIVE',
      reason: 'Generated day-by-day schedule',
      createdAt: new Date()
    };
    mockStore.itineraries.unshift(itinRecord);

    return {
      itinerary: itinRecord,
      days: generated.days
    };
  }

  public async getItinerary(tripId: string) {
    const generated = await itineraryGenerationEngine.generate7DayItinerary(tripId);
    return {
      itinerary: mockStore.itineraries[0] || { id: 'itin-v1', version: 1, status: 'ACTIVE' },
      days: generated.days
    };
  }

  public async updateItem(itemId: string, data: any) {
    // Validate conflicts after update
    const conflicts = conflictDetectionService.detectConflicts([], mockStore.bookings, 60000, 42500);

    return {
      success: true,
      itemId,
      updatedFields: data,
      conflicts
    };
  }

  public async getBackups(tripId: string) {
    return mockStore.backupPlans;
  }
}

export const itineraryService = new ItineraryService();
