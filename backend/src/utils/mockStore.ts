export interface MockDatabase {
  users: any[];
  trips: any[];
  preferences: any[];
  constraints: any[];
  locations: any[];
  activities: any[];
  itineraries: any[];
  bookings: any[];
  expenses: any[];
  disruptions: any[];
  replanProposals: any[];
  backupPlans: any[];
  notifications: any[];
  chatMessages: any[];
}

export function createInitialMockStore(): MockDatabase {
  return {
    users: [
      {
        id: 'demo-user-id',
        email: 'demo@travelpilot.app',
        name: 'Miruthu Bashini',
        passwordHash: '$2a$10$w8T9h3X3G0/qf3nN6nB6.O.v6ZJ8uJ6m4SgQ6L4l9/Gqg4r1'
      }
    ],
    trips: [
      {
        id: 'trip-tokyo-123',
        userId: 'demo-user-id',
        name: 'Tokyo Adventure',
        destination: 'Tokyo',
        country: 'Japan',
        startDate: '2026-10-12',
        endDate: '2026-10-18',
        timezone: 'Asia/Tokyo',
        travelers: 2,
        budget: 60000,
        currency: 'INR',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    preferences: [
      {
        id: 'pref-1',
        tripId: 'trip-tokyo-123',
        interests: ['food', 'culture', 'photography', 'technology'],
        travelPace: 'balanced',
        preferredTransport: ['metro', 'walking'],
        foodPreferences: ['sushi', 'ramen', 'matcha'],
        activityIntensity: 'moderate'
      }
    ],
    constraints: [
      {
        id: 'cons-1',
        tripId: 'trip-tokyo-123',
        budget: 60000,
        maxDailyTravelMinutes: 120,
        maxWalkingDistance: 5.0,
        requiredActivities: ['TeamLab Borderless', 'Meiji Shrine'],
        excludedActivities: [],
        preferredStartTime: '08:00',
        preferredEndTime: '21:00'
      }
    ],
    locations: [
      { id: 'loc-hnd', name: 'Haneda Airport (HND)', address: 'Haneda Airport, Ota City', latitude: 35.5494, longitude: 139.7798, city: 'Tokyo' },
      { id: 'loc-hotel', name: 'Hotel Shibuya Stream Excel', address: '3-21-3 Shibuya, Tokyo', latitude: 35.658, longitude: 139.7016, city: 'Tokyo' },
      { id: 'loc-shibuya', name: 'Shibuya Crossing', address: '2-2-1 Dogenzaka, Shibuya', latitude: 35.6595, longitude: 139.7005, city: 'Tokyo' },
      { id: 'loc-meiji', name: 'Meiji Jingu Shrine', address: '1-1 Yoyogikamizonocho, Shibuya', latitude: 35.6764, longitude: 139.6993, city: 'Tokyo' },
      { id: 'loc-[#0f766e]', name: 'TeamLab Borderless', address: 'Azabudai Hills Garden Plaza', latitude: 35.6605, longitude: 139.741, city: 'Tokyo' },
      { id: 'loc-ginza', name: 'Ginza Sushi Kuon', address: '6-chome Ginza, Chuo City', latitude: 35.6712, longitude: 139.7645, city: 'Tokyo' },
      { id: 'loc-sensoji', name: 'Senso-ji Temple', address: '2-3-1 Asakusa, Taito City', latitude: 35.7148, longitude: 139.7967, city: 'Tokyo' },
      { id: 'loc-skytree', name: 'Tokyo Skytree', address: '1-1-2 Oshiage, Sumida City', latitude: 35.7101, longitude: 139.8107, city: 'Tokyo' },
      { id: 'loc-akiba', name: 'Akihabara Electric Town', address: 'Sotokanda, Chiyoda City', latitude: 35.6983, longitude: 139.7731, city: 'Tokyo' },
      { id: 'loc-tsukiji', name: 'Tsukiji Outer Market', address: '4-16-2 Tsukiji, Chuo City', latitude: 35.6654, longitude: 139.7707, city: 'Tokyo' },
      { id: 'loc-ueno', name: 'Ueno Park', address: 'Uenokoen, Taito City', latitude: 35.7141, longitude: 139.7741, city: 'Tokyo' },
      { id: 'loc-mori', name: 'Mori Art Museum', address: '6-10-1 Roppongi, Minato City', latitude: 35.6604, longitude: 139.7292, city: 'Tokyo' },
      { id: 'loc-shinjuku', name: 'Shinjuku Gyoen Garden', address: '11 Naitomachi, Shinjuku', latitude: 35.6852, longitude: 139.71, city: 'Tokyo' },
      { id: 'loc-imperial', name: 'Imperial Palace East Gardens', address: '1-1 Chiyoda', latitude: 35.6852, longitude: 139.7528, city: 'Tokyo' },
      { id: 'loc-[#0d9488]', name: 'TeamLab Planets Tokyo', address: '6-1-16 Toyosu, Koto City', latitude: 35.6491, longitude: 139.7898, city: 'Tokyo' }
    ],
    activities: [
      { id: 'act-shibuya', name: 'Shibuya Crossing', category: 'PHOTOGRAPHY', locationId: 'loc-shibuya', durationMinutes: 60, cost: 0, openingTime: '00:00', closingTime: '23:59' },
      { id: 'act-meiji', name: 'Meiji Shrine Tranquil Forest Walk', category: 'CULTURE', locationId: 'loc-meiji', durationMinutes: 90, cost: 0, openingTime: '06:00', closingTime: '17:00' },
      { id: 'act-teamlab', name: 'TeamLab Borderless Digital Art', category: 'ENTERTAINMENT', locationId: 'loc-[#0f766e]', durationMinutes: 120, cost: 3200, openingTime: '10:00', closingTime: '21:00' },
      { id: 'act-sushi', name: 'Ginza Sushi Omakase Dinner', category: 'FOOD', locationId: 'loc-ginza', durationMinutes: 120, cost: 6500, openingTime: '18:00', closingTime: '22:00' },
      { id: 'act-sensoji', name: 'Senso-ji Temple & Asakusa', category: 'CULTURE', locationId: 'loc-sensoji', durationMinutes: 120, cost: 0, openingTime: '06:00', closingTime: '17:00' },
      { id: 'act-skytree', name: 'Tokyo Skytree Sunset Deck', category: 'ENTERTAINMENT', locationId: 'loc-skytree', durationMinutes: 120, cost: 2800, openingTime: '09:00', closingTime: '21:00' },
      { id: 'act-akiba', name: 'Akihabara Electric Town', category: 'TECHNOLOGY', locationId: 'loc-akiba', durationMinutes: 120, cost: 1500, openingTime: '10:00', closingTime: '20:00' },
      { id: 'act-tsukiji', name: 'Tsukiji Outer Market Tasting', category: 'FOOD', locationId: 'loc-tsukiji', durationMinutes: 90, cost: 2200, openingTime: '05:00', closingTime: '14:00' },
      { id: 'act-ueno', name: 'Ueno Park Walk', category: 'NATURE', locationId: 'loc-ueno', durationMinutes: 150, cost: 800, openingTime: '05:00', closingTime: '23:00' },
      { id: 'act-mori', name: 'Mori Art Museum View', category: 'CULTURE', locationId: 'loc-mori', durationMinutes: 120, cost: 1500, openingTime: '10:00', closingTime: '22:00' },
      { id: 'act-shinjuku', name: 'Shinjuku Gyoen National Garden', category: 'NATURE', locationId: 'loc-shinjuku', durationMinutes: 150, cost: 500, openingTime: '09:00', closingTime: '16:30' },
      { id: 'act-imperial', name: 'Imperial Palace East Gardens', category: 'HISTORY', locationId: 'loc-imperial', durationMinutes: 120, cost: 0, openingTime: '09:00', closingTime: '16:30' }
    ],
    bookings: [
      {
        id: 'b-flight',
        tripId: 'trip-tokyo-123',
        type: 'FLIGHT',
        name: 'ANA Flight JL42',
        provider: 'All Nippon Airways',
        startTime: '09:40',
        endTime: '17:10',
        location: 'Haneda Airport (HND)',
        cost: 18400,
        status: 'CONFIRMED',
        confirmationNum: 'JL-884920X',
        cancellationPolicy: 'Refundable up to 24h prior',
        impactAlert: 'Arrival time closely connects with evening hotel transfer & Shibuya dinner.'
      },
      {
        id: 'b-hotel',
        tripId: 'trip-tokyo-123',
        type: 'HOTEL',
        name: 'Hotel Shibuya Stream Excel',
        provider: 'Tokyu Hotels',
        startTime: '15:00',
        endTime: '11:00',
        location: 'Shibuya, Tokyo',
        cost: 24000,
        status: 'CONFIRMED',
        confirmationNum: 'HST-992144',
        cancellationPolicy: 'Free cancellation until Oct 10'
      },
      {
        id: 'b-teamlab',
        tripId: 'trip-tokyo-123',
        type: 'ACTIVITY',
        name: 'TeamLab Borderless Entry',
        provider: 'TeamLab',
        startTime: '14:30',
        endTime: '16:30',
        location: 'Azabudai Hills',
        cost: 3200,
        status: 'CONFIRMED',
        confirmationNum: 'TLB-2026-993',
        cancellationPolicy: 'Timed entry ticket. Non-refundable.'
      },
      {
        id: 'b-dinner',
        tripId: 'trip-tokyo-123',
        type: 'RESTAURANT',
        name: 'Sushi Omakase Reservation',
        provider: 'Ginza Kuon',
        startTime: '18:30',
        endTime: '20:30',
        location: 'Ginza, Tokyo',
        cost: 6500,
        status: 'CONFIRMED',
        confirmationNum: 'SUSH-7721',
        cancellationPolicy: 'Cancel 2h prior without fee',
        impactAlert: '⚠ Dinner reservation is 15 minutes after your train arrival.'
      }
    ],
    itineraries: [
      {
        id: 'itin-v1',
        tripId: 'trip-tokyo-123',
        version: 1,
        status: 'ACTIVE',
        reason: 'Initial 7-day schedule generated',
        createdAt: new Date()
      }
    ],
    expenses: [
      { id: 'exp-1', tripId: 'trip-tokyo-123', title: 'ANA Flight Tickets', category: 'transportation', amount: 18400, date: 'Oct 12', paid: true, dayNumber: 1 },
      { id: 'exp-2', tripId: 'trip-tokyo-123', title: 'Hotel Shibuya Booking', category: 'accommodation', amount: 24000, date: 'Oct 12', paid: true, dayNumber: 1 },
      { id: 'exp-3', tripId: 'trip-tokyo-123', title: 'JR Tokyo 3-Day Pass', category: 'transportation', amount: 1800, date: 'Oct 12', paid: true, dayNumber: 1 },
      { id: 'exp-4', tripId: 'trip-tokyo-123', title: 'TeamLab Tickets', category: 'activities', amount: 3200, date: 'Oct 13', paid: true, dayNumber: 2 },
      { id: 'exp-5', tripId: 'trip-tokyo-123', title: 'Sushi Omakase Dinner', category: 'food', amount: 6500, date: 'Oct 13', paid: false, dayNumber: 2 }
    ],
    disruptions: [],
    replanProposals: [],
    backupPlans: [
      {
        id: 'bp-1',
        tripId: 'trip-tokyo-123',
        category: 'Digital Art Attraction',
        primaryItem: 'TeamLab Borderless (Oct 13 — 14:30)',
        primaryTime: 'Oct 13, 14:30',
        backupItem: 'TeamLab Planets (Oct 14 — 11:00)',
        backupTime: 'Oct 14, 11:00',
        reason: 'Reserved backup slot in case of maintenance or queue delays.',
        transportTimeMin: 25,
        cost: 3900,
        status: 'READY'
      }
    ],
    notifications: [
      {
        id: 'notif-1',
        tripId: 'trip-tokyo-123',
        userId: 'demo-user-id',
        type: 'disruption',
        title: 'Flight Delay Alert',
        message: 'JL42 arrival moved from 17:10 → 19:10. 2 itinerary items affected.',
        read: false,
        actionUrl: 'disruptions',
        createdAt: new Date()
      }
    ],
    chatMessages: [
      {
        id: 'msg-1',
        conversationId: 'conv-1',
        sender: 'assistant',
        text: 'Hello! I am your TravelPilot AI assistant continuously monitoring your Tokyo trip.',
        createdAt: new Date()
      }
    ]
  };
}

export const mockStore = createInitialMockStore();
