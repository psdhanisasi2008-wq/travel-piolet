export type ViewMode =
  | 'command-center'
  | 'itinerary'
  | 'map'
  | 'calendar'
  | 'bookings'
  | 'budget'
  | 'activities'
  | 'transportation'
  | 'disruptions'
  | 'alternatives'
  | 'backup-plans'
  | 'ask-travelpilot'
  | 'replan'
  | 'trip-summary'
  | 'onboarding';

export type ActivityCategory =
  | 'food'
  | 'culture'
  | 'shopping'
  | 'nature'
  | 'entertainment'
  | 'photography'
  | 'nightlife'
  | 'relaxation'
  | 'technology'
  | 'transport'
  | 'hotel'
  | 'flight';

export interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
  city: string;
}

export interface ActivityItem {
  id: string;
  dayId: string;
  dayNumber: number;
  time: string;
  endTime: string;
  title: string;
  category: ActivityCategory;
  location: Location;
  durationMinutes: number;
  travelTimeFromPrevMinutes?: number;
  travelDistFromPrevKm?: number;
  costINR: number;
  bookingStatus: 'confirmed' | 'pending' | 'conflict' | 'delayed' | 'cancelled' | 'planned';
  bookingId?: string;
  isNow?: boolean;
  notes?: string;
  conflictWarning?: string;
  rating?: number;
  image?: string;
}

export interface DayItinerary {
  dayNumber: number;
  dateStr: string;
  dateFormatted: string;
  fullDate: string;
  dayOfWeek: string;
  weather?: string;
  items: ActivityItem[];
  totalTravelDistKm: number;
  totalTravelTimeMin: number;
}

export interface Booking {
  id: string;
  title: string;
  type: 'flight' | 'hotel' | 'transport' | 'activity' | 'restaurant';
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'delayed' | 'conflict' | 'cancelled';
  costINR: number;
  confirmationNumber: string;
  cancellationPolicy: string;
  connectedItineraryItemIds: string[];
  impactAlert?: string;
  details?: {
    departureTime?: string;
    arrivalTime?: string;
    terminal?: string;
    roomType?: string;
    nights?: number;
    provider?: string;
  };
}

export interface BudgetItem {
  id: string;
  category: 'accommodation' | 'transportation' | 'activities' | 'food' | 'shopping' | 'other';
  name: string;
  allocatedINR: number;
  spentINR: number;
}

export interface Expense {
  id: string;
  title: string;
  category: BudgetItem['category'];
  amountINR: number;
  date: string;
  paid: boolean;
  dayNumber: number;
}

export interface DisruptionImpact {
  itemTitle: string;
  type: 'hotel' | 'transfer' | 'dinner' | 'activity' | 'flight';
  impactStatus: 'no-impact' | 'conflict' | 'delayed' | 'rescheduled';
  detail: string;
}

export interface Disruption {
  id: string;
  type: 'flight-delay' | 'activity-cancelled' | 'restaurant-unavailable' | 'hotel-changed' | 'transport-delayed';
  title: string;
  subtitle: string;
  severity: 'high' | 'medium' | 'low';
  originalTime: string;
  newTime: string;
  impacts: DisruptionImpact[];
  currentTimeline: { time: string; event: string }[];
  proposedTimeline: { time: string; event: string }[];
  applied: boolean;
  detectedAt: string;
}

export interface AlternativeOption {
  id: string;
  disruptionId?: string;
  originalTitle: string;
  optionTitle: string;
  time: string;
  location: string;
  travelTimeMin: number;
  costINR: number;
  scheduleImpact: string;
  badge?: string;
  isRecommended?: boolean;
}

export interface BackupPlan {
  id: string;
  category: string;
  primaryItem: string;
  primaryTime: string;
  backupItem: string;
  backupTime: string;
  reason: string;
  transportTimeMin: number;
  costINR: number;
  status: 'ready' | 'not-confirmed' | 'unavailable';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'disruption' | 'conflict' | 'booking' | 'budget' | 'upcoming';
  timeAgo: string;
  read: boolean;
  actionUrl?: ViewMode;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  contextData?: {
    previousActivity?: string;
    nextActivity?: string;
    slotAvailable?: string;
    suggestedTime?: string;
    actionableActivity?: Partial<ActivityItem>;
  };
}

export interface TripConstraints {
  dates: string;
  totalBudgetINR: number;
  travelersCount: number;
  interests: string[];
  pace: 'Relaxed' | 'Moderate' | 'Packed';
  hotelPreference: string;
  transportPreference: string;
}

export interface TripSummaryData {
  title: string;
  dates: string;
  durationDays: number;
  travelers: number;
  totalBookings: number;
  confirmedBookings: number;
  totalActivities: number;
  estimatedCostINR: number;
  totalBudgetINR: number;
  readyBackups: number;
  activeAlertsCount: number;
}
