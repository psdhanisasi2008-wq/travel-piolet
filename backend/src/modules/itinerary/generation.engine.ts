import { routingService } from '../../utils/travelTime';
import { mockStore } from '../../utils/mockStore';

export class ItineraryGenerationEngine {
  public async generate7DayItinerary(tripId: string, preferences: any = {}, constraints: any = {}) {
    const locations = mockStore.locations;
    const activities = mockStore.activities;

    const preferredStart = constraints.preferredStartTime || '08:00';
    const preferredEnd = constraints.preferredEndTime || '21:00';
    const totalBudget = constraints.budget || 60000;

    // Day 1: October 12 (Arrival & Hotel Transfer)
    const day1Items = [
      {
        id: 'd1-1',
        title: 'Haneda Airport Arrival',
        category: 'flight',
        startTime: '17:10',
        endTime: '18:00',
        location: { name: 'Haneda Airport', address: 'Haneda Airport, Ota City', lat: 35.5494, lng: 139.7798, city: 'Tokyo' },
        travelTimeFromPrevious: 0,
        estimatedCost: 0,
        status: 'CONFIRMED',
        bookingStatus: 'confirmed'
      },
      {
        id: 'd1-2',
        title: 'Airport Monorail Transfer to Hotel',
        category: 'transport',
        startTime: '18:15',
        endTime: '19:00',
        location: { name: 'Hotel Shibuya Stream', address: '3-21-3 Shibuya, Tokyo', lat: 35.658, lng: 139.7016, city: 'Tokyo' },
        travelTimeFromPrevious: 35,
        estimatedCost: 500,
        status: 'CONFIRMED',
        bookingStatus: 'confirmed'
      },
      {
        id: 'd1-3',
        title: 'Welcome Ramen Dinner at Ichiran',
        category: 'food',
        startTime: '19:30',
        endTime: '21:00',
        location: { name: 'Ichiran Shibuya', address: '1-22-7 Jinnan, Shibuya', lat: 35.6612, lng: 139.7008, city: 'Tokyo' },
        travelTimeFromPrevious: 10,
        estimatedCost: 1200,
        status: 'CONFIRMED',
        bookingStatus: 'confirmed'
      }
    ];

    // Day 2: October 13 (Shibuya, Meiji Shrine, TeamLab & Ginza Sushi)
    const day2Items = [
      {
        id: 'd2-1',
        title: 'Hotel Breakfast & Morning Briefing',
        category: 'food',
        startTime: '08:00',
        endTime: '09:00',
        location: { name: 'Hotel Shibuya Dining', address: 'Shibuya Stream 4F', lat: 35.658, lng: 139.7016, city: 'Tokyo' },
        travelTimeFromPrevious: 0,
        estimatedCost: 1200,
        status: 'CONFIRMED',
        bookingStatus: 'confirmed'
      },
      {
        id: 'd2-2',
        title: 'Shibuya Crossing & Scramble Walk',
        category: 'photography',
        startTime: '09:30',
        endTime: '10:30',
        location: { name: 'Shibuya Crossing', address: '2-2-1 Dogenzaka, Shibuya', lat: 35.6595, lng: 139.7005, city: 'Tokyo' },
        travelTimeFromPrevious: 12,
        estimatedCost: 0,
        status: 'CONFIRMED',
        bookingStatus: 'confirmed'
      },
      {
        id: 'd2-3',
        title: 'Meiji Shrine Tranquil Forest Walk',
        category: 'culture',
        startTime: '11:00',
        endTime: '12:30',
        location: { name: 'Meiji Jingu Shrine', address: '1-1 Yoyogikamizonocho, Shibuya', lat: 35.6764, lng: 139.6993, city: 'Tokyo' },
        travelTimeFromPrevious: 18,
        estimatedCost: 0,
        status: 'CONFIRMED',
        bookingStatus: 'confirmed'
      },
      {
        id: 'd2-4',
        title: 'Harajuku Takeshita Street Lunch',
        category: 'food',
        startTime: '13:00',
        endTime: '14:00',
        location: { name: 'Harajuku Dining', address: 'Jingumae 1-chome', lat: 35.6715, lng: 139.7032, city: 'Tokyo' },
        travelTimeFromPrevious: 10,
        estimatedCost: 1500,
        status: 'CONFIRMED',
        bookingStatus: 'confirmed'
      },
      {
        id: 'd2-5',
        title: 'TeamLab Borderless Digital Art',
        category: 'entertainment',
        startTime: '14:30',
        endTime: '16:30',
        location: { name: 'TeamLab Borderless', address: 'Azabudai Hills Garden Plaza', lat: 35.6605, lng: 139.741, city: 'Tokyo' },
        travelTimeFromPrevious: 27,
        estimatedCost: 3200,
        status: 'CONFIRMED',
        bookingStatus: 'confirmed'
      },
      {
        id: 'd2-6',
        title: 'Ginza Sushi Omakase Dinner',
        category: 'food',
        startTime: '18:30',
        endTime: '20:30',
        location: { name: 'Ginza Sushi Kuon', address: '6-chome Ginza, Chuo City', lat: 35.6712, lng: 139.7645, city: 'Tokyo' },
        travelTimeFromPrevious: 20,
        estimatedCost: 6500,
        status: 'CONFIRMED',
        bookingStatus: 'confirmed',
        conflictWarning: '⚠ Dinner reservation is 15 minutes after your train arrival.'
      }
    ];

    const days = [
      { dayNumber: 1, dateStr: 'October 12', dateFormatted: 'Monday, Oct 12', fullDate: '2026-10-12', totalTravelDistKm: 18.5, totalTravelTimeMin: 55, items: day1Items },
      { dayNumber: 2, dateStr: 'October 13', dateFormatted: 'Tuesday, Oct 13', fullDate: '2026-10-13', totalTravelDistKm: 12.4, totalTravelTimeMin: 76, items: day2Items }
    ];

    return {
      version: 1,
      status: 'ACTIVE',
      days
    };
  }
}

export const itineraryGenerationEngine = new ItineraryGenerationEngine();
