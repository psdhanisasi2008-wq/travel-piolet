import { isDatabaseConnected, prisma } from '../../config/database';
import { mockStore } from '../../utils/mockStore';

export class BookingsService {
  public async getBookings(tripId: string) {
    if (isDatabaseConnected()) {
      return prisma.booking.findMany({ where: { tripId } });
    } else {
      return mockStore.bookings.filter((b) => b.tripId === tripId || tripId === 'trip-tokyo-123');
    }
  }

  public async createBooking(tripId: string, data: any) {
    const booking = {
      id: `b-${Date.now()}`,
      tripId,
      type: data.type || 'ACTIVITY',
      name: data.name,
      provider: data.provider || 'TravelPilot Partner',
      startTime: data.startTime || '10:00',
      endTime: data.endTime || '12:00',
      location: data.location || 'Tokyo',
      cost: data.cost || 0,
      status: data.status || 'CONFIRMED',
      confirmationNum: data.confirmationNum || `CONF-${Date.now()}`,
      cancellationPolicy: data.cancellationPolicy || 'Standard cancellation policy applies'
    };

    if (isDatabaseConnected()) {
      return prisma.booking.create({ data: booking });
    } else {
      mockStore.bookings.push(booking);
      return booking;
    }
  }

  public async updateBooking(bookingId: string, data: any) {
    if (isDatabaseConnected()) {
      return prisma.booking.update({
        where: { id: bookingId },
        data
      });
    } else {
      const index = mockStore.bookings.findIndex((b) => b.id === bookingId);
      if (index === -1) throw { code: 'BOOKING_NOT_FOUND', message: 'Booking not found', statusCode: 404 };
      mockStore.bookings[index] = { ...mockStore.bookings[index], ...data };
      return mockStore.bookings[index];
    }
  }

  public async deleteBooking(bookingId: string) {
    if (isDatabaseConnected()) {
      return prisma.booking.delete({ where: { id: bookingId } });
    } else {
      mockStore.bookings = mockStore.bookings.filter((b) => b.id !== bookingId);
      return { success: true };
    }
  }
}

export const bookingsService = new BookingsService();
