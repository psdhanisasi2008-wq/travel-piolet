import type {
  DayItinerary,
  Booking,
  Expense,
  Disruption,
  AlternativeOption,
  BackupPlan,
  NotificationItem,
  ChatMessage,
  TripConstraints,
  TripSummaryData
} from '../types';

export const initialConstraints: TripConstraints = {
  dates: '12 Jun 2026 – 18 Jun 2026',
  totalBudgetINR: 120000,
  travelersCount: 3,
  interests: ['Adventure + Culture'],
  pace: 'Moderate',
  hotelPreference: 'Villa Firostefani',
  transportPreference: 'Express Ferry & Rental'
};

export const initialSummary: TripSummaryData = {
  title: 'Santorini, Greece',
  dates: '12 Jun 2026 – 18 Jun 2026',
  durationDays: 7,
  travelers: 3,
  totalBookings: 11,
  confirmedBookings: 11,
  totalActivities: 18,
  estimatedCostINR: 91200,
  totalBudgetINR: 120000,
  readyBackups: 4,
  activeAlertsCount: 3
};

export const initialBookings: Booking[] = [
  {
    id: 'b-flight',
    title: 'Indigo Flight 6E 427',
    type: 'flight',
    date: '12 Jun 2026',
    time: '06:45 - 10:15',
    location: 'Chennai → Santorini (JTR)',
    status: 'confirmed',
    costINR: 32500,
    confirmationNumber: '6E-427-JTR',
    cancellationPolicy: 'Refundable up to 24h prior',
    connectedItineraryItemIds: ['d1-1', 'd1-2'],
    details: {
      departureTime: '06:45',
      arrivalTime: '10:15',
      terminal: 'Terminal 2',
      provider: 'IndiGo Airlines'
    }
  },
  {
    id: 'b-hotel',
    title: 'Villa Firostefani Resort',
    type: 'hotel',
    date: '12–18 Jun 2026',
    time: 'Check-in 15:00',
    location: 'Firostefani, Santorini',
    status: 'confirmed',
    costINR: 28000,
    confirmationNumber: 'VFR-98213',
    cancellationPolicy: 'Free cancellation until 10 Jun',
    connectedItineraryItemIds: ['d1-2', 'd2-1'],
    details: {
      roomType: 'Caldera View Suite',
      nights: 6,
      provider: 'Luxury Caldera Stays'
    },
    impactAlert: 'Hotel booking expires in 2 days. Final check-in window confirmed.'
  },
  {
    id: 'b-boattour',
    title: 'Boat Tour to Volcano & Hot Springs',
    type: 'activity',
    date: '13 Jun 2026',
    time: '09:30',
    location: 'Athinios Port, Santorini',
    status: 'confirmed',
    costINR: 8500,
    confirmationNumber: 'BOAT-8812',
    cancellationPolicy: 'Weather protection included',
    connectedItineraryItemIds: ['d2-2']
  },
  {
    id: 'b-metaxi',
    title: 'Lunch at Metaxi Mas (Greek Cuisine)',
    type: 'restaurant',
    date: '13 Jun 2026',
    time: '12:30',
    location: 'Fira, Santorini',
    status: 'confirmed',
    costINR: 4200,
    confirmationNumber: 'MET-5541',
    cancellationPolicy: 'Table reserved for 3 guests',
    connectedItineraryItemIds: ['d2-3']
  },
  {
    id: 'b-akrotiri',
    title: 'Visit Akrotiri Archaeological Site',
    type: 'activity',
    date: '13 Jun 2026',
    time: '15:00',
    location: 'Akrotiri, Santorini',
    status: 'confirmed',
    costINR: 3500,
    confirmationNumber: 'AKR-1002',
    cancellationPolicy: 'Fast-track entrance ticket',
    connectedItineraryItemIds: ['d2-4']
  }
];

export const initialDays: DayItinerary[] = [
  {
    dayNumber: 1,
    dateStr: '12 Jun 2026',
    dateFormatted: 'Day 1 · 12 Jun 2026',
    fullDate: '2026-06-12',
    dayOfWeek: 'Friday',
    weather: '22°C',
    totalTravelDistKm: 18.5,
    totalTravelTimeMin: 45,
    items: [
      {
        id: 'd1-1',
        dayId: '2026-06-12',
        dayNumber: 1,
        time: '06:45',
        endTime: '10:15',
        title: 'Flight 6E 427 (Chennai → Santorini JTR)',
        category: 'flight',
        location: { name: 'Santorini Airport (JTR)', address: 'Monolithos, Santorini', lat: 36.400, lng: 25.479, city: 'Santorini' },
        durationMinutes: 210,
        costINR: 32500,
        bookingStatus: 'confirmed',
        bookingId: 'b-flight',
        notes: 'Landing at 10:15 AM'
      },
      {
        id: 'd1-2',
        dayId: '2026-06-12',
        dayNumber: 1,
        time: '11:00',
        endTime: '13:00',
        title: 'Hotel Check-in at Villa Firostefani',
        category: 'hotel',
        location: { name: 'Villa Firostefani', address: 'Firostefani Cliffside', lat: 36.425, lng: 25.431, city: 'Santorini' },
        durationMinutes: 120,
        travelTimeFromPrevMinutes: 25,
        travelDistFromPrevKm: 6.8,
        costINR: 28000,
        bookingStatus: 'confirmed',
        bookingId: 'b-hotel',
        notes: '3 nights confirmed'
      }
    ]
  },
  {
    dayNumber: 2,
    dateStr: '13 Jun 2026',
    dateFormatted: 'Day 2 · 13 Jun 2026',
    fullDate: '2026-06-13',
    dayOfWeek: 'Saturday',
    weather: '24°C',
    totalTravelDistKm: 12.6,
    totalTravelTimeMin: 32,
    items: [
      {
        id: 'd2-1',
        dayId: '2026-06-13',
        dayNumber: 2,
        time: '09:00',
        endTime: '09:30',
        title: 'Hotel Check-out',
        category: 'hotel',
        location: { name: 'Villa Firostefani', address: 'Firostefani', lat: 36.425, lng: 25.431, city: 'Santorini' },
        durationMinutes: 30,
        costINR: 0,
        bookingStatus: 'confirmed',
        bookingId: 'b-hotel'
      },
      {
        id: 'd2-2',
        dayId: '2026-06-13',
        dayNumber: 2,
        time: '09:30',
        endTime: '12:00',
        title: 'Boat Tour to Volcano & Hot Springs',
        category: 'entertainment',
        location: { name: 'Athinios Port', address: 'Athinios Port, Santorini', lat: 36.386, lng: 25.429, city: 'Santorini' },
        durationMinutes: 150,
        travelTimeFromPrevMinutes: 15,
        travelDistFromPrevKm: 4.2,
        costINR: 8500,
        bookingStatus: 'confirmed',
        bookingId: 'b-boattour',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80',
        isNow: true
      },
      {
        id: 'd2-3',
        dayId: '2026-06-13',
        dayNumber: 2,
        time: '12:30',
        endTime: '14:30',
        title: 'Lunch at Metaxi Mas',
        category: 'food',
        location: { name: 'Fira', address: 'Exo Gonia, Fira', lat: 36.398, lng: 25.456, city: 'Santorini' },
        durationMinutes: 120,
        travelTimeFromPrevMinutes: 18,
        travelDistFromPrevKm: 3.5,
        costINR: 4200,
        bookingStatus: 'confirmed',
        bookingId: 'b-metaxi',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80',
        notes: 'Greek cuisine & wine pairing'
      },
      {
        id: 'd2-4',
        dayId: '2026-06-13',
        dayNumber: 2,
        time: '15:00',
        endTime: '17:00',
        title: 'Visit Akrotiri Archaeological Site',
        category: 'culture',
        location: { name: 'Akrotiri', address: 'Ancient Minoan City, Akrotiri', lat: 36.351, lng: 25.403, city: 'Santorini' },
        durationMinutes: 120,
        travelTimeFromPrevMinutes: 20,
        travelDistFromPrevKm: 5.1,
        costINR: 3500,
        bookingStatus: 'confirmed',
        bookingId: 'b-akrotiri',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80',
        notes: 'Ancient Minoan ruins (2 hrs)'
      },
      {
        id: 'd2-5',
        dayId: '2026-06-13',
        dayNumber: 2,
        time: '18:30',
        endTime: '20:30',
        title: 'Sunset at Oia',
        category: 'photography',
        location: { name: 'Oia Castle', address: 'Oia, Santorini', lat: 36.461, lng: 25.375, city: 'Santorini' },
        durationMinutes: 120,
        travelTimeFromPrevMinutes: 25,
        travelDistFromPrevKm: 8.5,
        costINR: 0,
        bookingStatus: 'planned',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80',
        notes: 'Iconic views & white cliffside buildings'
      }
    ]
  },
  {
    dayNumber: 3,
    dateStr: '14 Jun 2026',
    dateFormatted: 'Day 3 · 14 Jun 2026',
    fullDate: '2026-06-14',
    dayOfWeek: 'Sunday',
    weather: '25°C',
    totalTravelDistKm: 14.1,
    totalTravelTimeMin: 40,
    items: [
      {
        id: 'd3-1',
        dayId: '2026-06-14',
        dayNumber: 3,
        time: '10:00',
        endTime: '13:00',
        title: 'Red Beach Volcanic Exploration',
        category: 'nature',
        location: { name: 'Red Beach', address: 'Akrotiri, Santorini', lat: 36.348, lng: 25.395, city: 'Santorini' },
        durationMinutes: 180,
        costINR: 1500,
        bookingStatus: 'confirmed',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

export const initialDisruption: Disruption = {
  id: 'disruption-flight-delay',
  type: 'flight-delay',
  title: 'FLIGHT DELAY DETECTED',
  subtitle: '⚠ IndiGo 6E 427 delayed by 1.5 hours on 12 Jun',
  severity: 'high',
  originalTime: '06:45',
  newTime: '08:15',
  applied: false,
  detectedAt: '5m ago',
  impacts: [
    {
      itemTitle: 'Villa Firostefani Check-in',
      type: 'hotel',
      impactStatus: 'no-impact',
      detail: 'Resort front desk notified for late check-in window.'
    },
    {
      itemTitle: 'Airport Ferry Transfer',
      type: 'transfer',
      impactStatus: 'conflict',
      detail: 'Original 11:00 transfer missed. Adjusted to 12:30.'
    }
  ],
  currentTimeline: [
    { time: '06:45', event: 'Flight departure' },
    { time: '10:15', event: 'Santorini arrival' },
    { time: '11:00', event: 'Hotel check-in' }
  ],
  proposedTimeline: [
    { time: '08:15', event: 'Flight departure (Delayed)' },
    { time: '11:45', event: 'Santorini arrival (Adjusted)' },
    { time: '12:30', event: 'Hotel check-in (Adjusted)' }
  ]
};

export const initialAlternatives: AlternativeOption[] = [
  {
    id: 'alt-1',
    originalTitle: 'Boat Tour to Volcano (09:30 Slot)',
    optionTitle: 'Catamaran Sunset Cruise (Catamaran)',
    time: '15:30 – 19:30',
    location: 'Ammoudi Bay, Oia',
    travelTimeMin: 20,
    costINR: 9800,
    scheduleImpact: 'Replaces morning boat tour. Evening sunset included.',
    badge: 'Luxury Cruise',
    isRecommended: true
  },
  {
    id: 'alt-2',
    originalTitle: 'Boat Tour to Volcano (09:30 Slot)',
    optionTitle: 'Nea Kameni Volcano Hiking Tour',
    time: '10:00 – 13:00',
    location: 'Athinios Port',
    travelTimeMin: 15,
    costINR: 6500,
    scheduleImpact: 'Keeps morning slot intact.',
    badge: 'Volcano Hike'
  }
];

export const initialBackupPlans: BackupPlan[] = [
  {
    id: 'bp-1',
    category: 'Sailing Tour',
    primaryItem: 'Boat Tour to Volcano & Hot Springs',
    primaryTime: '13 Jun, 09:30',
    backupItem: 'Private Motorboat Rental',
    backupTime: '14 Jun, 11:00',
    reason: 'Backup slot in case of windy sea weather warnings.',
    transportTimeMin: 20,
    costINR: 11000,
    status: 'ready'
  },
  {
    id: 'bp-2',
    category: 'Sunset Dining',
    primaryItem: 'Oia Sunset Dining',
    primaryTime: '13 Jun, 18:30',
    backupItem: 'Pyrgos Restaurant Terrace',
    backupTime: '13 Jun, 19:00',
    reason: 'Instant backup table reservation.',
    transportTimeMin: 15,
    costINR: 5200,
    status: 'ready'
  }
];

export const initialExpenses: Expense[] = [
  { id: 'exp-1', title: 'IndiGo Flights (Chennai-Santorini)', category: 'transportation', amountINR: 32500, date: '12 Jun', paid: true, dayNumber: 1 },
  { id: 'exp-2', title: 'Villa Firostefani Resort', category: 'accommodation', amountINR: 28000, date: '12 Jun', paid: true, dayNumber: 1 },
  { id: 'exp-3', title: 'Ferry & Car Logistics', category: 'transportation', amountINR: 8700, date: '12 Jun', paid: true, dayNumber: 1 },
  { id: 'exp-4', title: 'Volcano Boat Tour & Tickets', category: 'activities', amountINR: 15000, date: '13 Jun', paid: true, dayNumber: 2 }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Hotel booking expires in 2 days',
    message: 'Villa Firostefani (12 Jun - 18 Jun) final confirmation active.',
    type: 'booking',
    timeAgo: '2h ago',
    read: false,
    actionUrl: 'bookings'
  },
  {
    id: 'n-2',
    title: 'Activity starts in 1 hour',
    message: 'Boat Tour to Volcano & Hot Springs starting at Athinios Port.',
    type: 'upcoming',
    timeAgo: '1h ago',
    read: false,
    actionUrl: 'itinerary'
  },
  {
    id: 'n-3',
    title: 'Flight check-in opens in 5 hours',
    message: 'IndiGo 6E 427 · Chennai → Santorini (JTR).',
    type: 'disruption',
    timeAgo: '5h ago',
    read: false,
    actionUrl: 'disruptions'
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'What is the plan for tomorrow morning?',
    timestamp: '10:24 AM'
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    text: `Here's your plan for **tomorrow morning (Day 2)**:

1. **8:00 AM** – Hotel Check-out (Villa Firostefani)
2. **9:30 AM** – Boat Tour to Volcano & Hot Springs (Athinios Port)
3. **12:30 PM** – Lunch at Metaxi Mas (Fira, Greek cuisine)
4. **3:00 PM** – Visit Akrotiri Archaeological Site (2 hrs)

The boat tour is close to your hotel and fits well with your schedule. Would you like me to show the route on the map?`,
    timestamp: '10:24 AM',
    contextData: {
      previousActivity: 'Hotel Check-out (09:00)',
      nextActivity: 'Lunch at Metaxi Mas (12:30)',
      slotAvailable: '09:30 – 12:00',
      suggestedTime: '09:30 AM',
      actionableActivity: {
        id: 'd2-2',
        title: 'Boat Tour to Volcano & Hot Springs',
        time: '09:30',
        endTime: '12:00',
        costINR: 8500
      }
    }
  }
];

export const activityCatalog = [
  {
    title: 'Catamaran Sunset Sailing',
    rating: 4.9,
    location: 'Amoudi Bay, Oia',
    duration: '4 hours',
    costINR: 9800,
    travelTime: '20 min from hotel',
    category: 'entertainment' as const,
    availableSlots: ['15:30', '16:30'],
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Santorini Wine Tasting Tour',
    rating: 4.8,
    location: 'Pyrgos Estate',
    duration: '3 hours',
    costINR: 6200,
    travelTime: '15 min from previous',
    category: 'food' as const,
    availableSlots: ['16:00', '18:00'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80'
  }
];
