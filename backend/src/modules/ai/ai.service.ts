import { env } from '../../config/env';
import { mockStore } from '../../utils/mockStore';

export class AIService {
  public async answerTripQuestion(tripId: string, question: string) {
    const q = question.toLowerCase();

    // Grounded factual data retrieval from backend
    const flight = mockStore.bookings.find((b) => b.type === 'FLIGHT') || mockStore.bookings[0];
    const hotel = mockStore.bookings.find((b) => b.type === 'HOTEL') || mockStore.bookings[1];

    if (q.includes('teamlab')) {
      return {
        answer: `Yes, you can fit TeamLab into tomorrow!

You currently have an open window from 13:10 – 17:30 on Tuesday, Oct 13 between Harajuku lunch and Ginza dinner.

• TeamLab Borderless requires approximately 2 hours.
• Travel from Harajuku: 27 minutes (Metro Hibiya line).

Recommended slot: 14:30 – 16:30. This leaves a comfortable 2-hour buffer before your Ginza dinner reservation at 18:30.`,
        contextData: {
          previousActivity: 'Harajuku Takeshita Street Lunch (13:00)',
          nextActivity: 'Ginza Sushi Omakase (18:30)',
          slotAvailable: '13:10 – 17:30',
          suggestedTime: '14:30 – 16:30',
          actionableActivity: {
            title: 'TeamLab Borderless Digital Art',
            time: '14:30',
            endTime: '16:30',
            costINR: 3200
          }
        }
      };
    }

    if (q.includes('flight') || q.includes('delay') || q.includes('jl42')) {
      return {
        answer: `Flight ${flight.name} is scheduled for ${flight.startTime} departure and ${flight.endTime} arrival at ${flight.location}.

If a 2-hour delay occurs, arrival becomes 19:10. The TravelPilot engine automatically shifts your airport monorail transfer to 19:45 and dinner to 21:00 with zero impact on hotel check-in at ${hotel.name}.`,
        contextData: {
          flightName: flight.name,
          originalArrival: flight.endTime,
          adjustedArrival: '19:10',
          affectedItems: ['Airport Monorail Transfer', 'Welcome Ramen Dinner']
        }
      };
    }

    if (q.includes('budget') || q.includes('spend') || q.includes('cost')) {
      return {
        answer: `Your current Tokyo trip budget is ₹60,000.

• Committed / Paid: ₹31,200
• Planned Total: ₹42,500
• Remaining Buffer: ₹28,800

You have a healthy budget buffer remaining for unreserved dining and shopping.`,
        contextData: {
          totalBudget: 60000,
          plannedCost: 42500,
          spentCost: 31200,
          remainingBuffer: 28800
        }
      };
    }

    return {
      answer: `Based on your Tokyo itinerary (Oct 12–18), your 7-day schedule includes 18 activities, 6 confirmed bookings, and ₹42,500 in estimated expenses. All travel segments between Shibuya, Harajuku, Tsukiji, and Asakusa have been calculated with buffers.`,
      contextData: {
        tripName: 'Tokyo Adventure',
        dates: 'October 12–18, 2026',
        totalBookings: 6
      }
    };
  }

  public async explainDisruption(disruptionType: string, oldTime: string, newTime: string) {
    return `Due to ${disruptionType} shifting arrival from ${oldTime} to ${newTime}, 2 evening logistics items (Airport transfer & Welcome Ramen) were shifted by 1 hour to prevent schedule conflicts. Hotel check-in remains fully confirmed.`;
  }
}

export const aiService = new AIService();
