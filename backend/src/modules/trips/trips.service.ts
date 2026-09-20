import { isDatabaseConnected, prisma } from '../../config/database';
import { mockStore } from '../../utils/mockStore';

export class TripsService {
  public async createTrip(userId: string, data: any) {
    const tripData = {
      userId,
      name: data.name || `${data.destination} Adventure`,
      destination: data.destination || 'Tokyo',
      country: data.country || 'Japan',
      startDate: data.startDate || '2026-10-12',
      endDate: data.endDate || '2026-10-18',
      timezone: data.timezone || 'Asia/Tokyo',
      travelers: data.travelers || 2,
      budget: data.budget || 60000,
      currency: data.currency || 'INR',
      status: 'ACTIVE' as any
    };

    if (isDatabaseConnected()) {
      const trip = await prisma.trip.create({
        data: {
          ...tripData,
          preferences: {
            create: {
              interests: data.interests || ['food', 'culture', 'photography'],
              travelPace: data.pace || 'balanced',
              preferredTransport: ['metro', 'walking']
            }
          },
          constraints: {
            create: {
              budget: data.budget || 60000,
              maxDailyTravelMinutes: 120
            }
          }
        },
        include: { preferences: true, constraints: true }
      });
      return trip;
    } else {
      const trip = {
        id: `trip-${Date.now()}`,
        ...tripData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockStore.trips.push(trip);

      const pref = {
        id: `pref-${Date.now()}`,
        tripId: trip.id,
        interests: data.interests || ['food', 'culture', 'photography'],
        travelPace: data.pace || 'balanced',
        preferredTransport: ['metro', 'walking']
      };
      mockStore.preferences.push(pref);

      const cons = {
        id: `cons-${Date.now()}`,
        tripId: trip.id,
        budget: data.budget || 60000,
        maxDailyTravelMinutes: 120
      };
      mockStore.constraints.push(cons);

      return { ...trip, preferences: pref, constraints: cons };
    }
  }

  public async getTrips(userId: string) {
    if (isDatabaseConnected()) {
      return prisma.trip.findMany({
        where: { userId },
        include: { preferences: true, constraints: true }
      });
    } else {
      return mockStore.trips.filter((t) => t.userId === userId || userId === 'demo-user-id');
    }
  }

  public async getTripById(tripId: string) {
    if (isDatabaseConnected()) {
      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        include: {
          preferences: true,
          constraints: true,
          locations: true,
          activities: true,
          itineraries: { include: { days: { include: { items: true } } } },
          bookings: true,
          expenses: true,
          disruptions: true,
          backups: true,
          notifications: true
        }
      });
      if (!trip) throw { code: 'TRIP_NOT_FOUND', message: 'Trip not found', statusCode: 404 };
      return trip;
    } else {
      const trip = mockStore.trips.find((t) => t.id === tripId) || mockStore.trips[0];
      if (!trip) throw { code: 'TRIP_NOT_FOUND', message: 'Trip not found', statusCode: 404 };
      return trip;
    }
  }

  public async updateTrip(tripId: string, data: any) {
    if (isDatabaseConnected()) {
      return prisma.trip.update({
        where: { id: tripId },
        data
      });
    } else {
      const index = mockStore.trips.findIndex((t) => t.id === tripId);
      if (index === -1) throw { code: 'TRIP_NOT_FOUND', message: 'Trip not found', statusCode: 404 };
      mockStore.trips[index] = { ...mockStore.trips[index], ...data, updatedAt: new Date() };
      return mockStore.trips[index];
    }
  }

  public async deleteTrip(tripId: string) {
    if (isDatabaseConnected()) {
      return prisma.trip.delete({ where: { id: tripId } });
    } else {
      mockStore.trips = mockStore.trips.filter((t) => t.id !== tripId);
      return { success: true };
    }
  }

  public async getDashboard(tripId: string) {
    const trip = await this.getTripById(tripId);

    // Calculate today's items & bookings
    const bookings = isDatabaseConnected()
      ? await prisma.booking.findMany({ where: { tripId } })
      : mockStore.bookings;

    const expenses = isDatabaseConnected()
      ? await prisma.expense.findMany({ where: { tripId } })
      : mockStore.expenses;

    const notifications = isDatabaseConnected()
      ? await prisma.notification.findMany({ where: { tripId } })
      : mockStore.notifications;

    const backups = isDatabaseConnected()
      ? await prisma.backupPlan.findMany({ where: { tripId } })
      : mockStore.backupPlans;

    const spentCost = expenses.reduce((sum, e) => sum + e.amount, 0);
    const plannedCost = 42500;

    return {
      trip: {
        id: trip.id,
        name: trip.name,
        destination: trip.destination,
        dates: `${trip.startDate} – ${trip.endDate}`,
        status: trip.status,
        travelers: trip.travelers
      },
      today: {
        dateStr: 'October 13',
        dayNumber: 2,
        weather: '24°C',
        activitiesCount: 6
      },
      upcoming: [
        { title: 'TeamLab Borderless Digital Art', time: '14:30 – 16:30', status: 'confirmed' },
        { title: 'Ginza Sushi Omakase Dinner', time: '18:30 – 20:30', status: 'confirmed' }
      ],
      bookings: bookings,
      budget: {
        totalLimit: trip.budget || 60000,
        plannedCost,
        spentCost,
        remainingBuffer: Math.max(0, (trip.budget || 60000) - spentCost)
      },
      alerts: notifications.filter((n) => !n.read),
      tripHealth: {
        status: notifications.some((n) => n.type === 'disruption') ? 'ATTENTION' : 'GOOD',
        scheduleStability: 'Good',
        budgetPacing: 'On track',
        bookingsVerified: '6 / 6'
      },
      backupsCount: backups.length,
      mapPoints: isDatabaseConnected() ? [] : mockStore.locations
    };
  }

  public async searchTrip(tripId: string, query: string) {
    const q = query.toLowerCase();
    const activities = mockStore.activities.filter((a) => a.name.toLowerCase().includes(q));
    const bookings = mockStore.bookings.filter((b) => b.name.toLowerCase().includes(q) || b.location.toLowerCase().includes(q));
    const locations = mockStore.locations.filter((l) => l.name.toLowerCase().includes(q));

    return {
      query,
      results: {
        activities,
        bookings,
        locations
      }
    };
  }
}

export const tripsService = new TripsService();
