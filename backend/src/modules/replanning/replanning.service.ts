import { mockStore } from '../../utils/mockStore';

export class ReplanningService {
  public async getProposals(tripId: string) {
    return mockStore.replanProposals;
  }

  public async applyReplan(proposalId: string) {
    const proposal = mockStore.replanProposals.find((p) => p.id === proposalId) || mockStore.replanProposals[0];
    if (proposal) {
      proposal.applied = true;
    }

    // Mark active disruption as applied
    if (mockStore.disruptions.length > 0) {
      mockStore.disruptions[0].applied = true;
    }

    // Create Itinerary Version 2
    const currentVersion = mockStore.itineraries.length + 1;
    const newItineraryVersion = {
      id: `itin-v${currentVersion}`,
      tripId: 'trip-tokyo-123',
      version: currentVersion,
      status: 'ACTIVE',
      reason: `Applied Replan Proposal: ${proposal?.id || 'Disruption shift'}`,
      createdAt: new Date()
    };

    mockStore.itineraries.unshift(newItineraryVersion);

    // Create Notification
    mockStore.notifications.unshift({
      id: `notif-${Date.now()}`,
      tripId: 'trip-tokyo-123',
      userId: 'demo-user-id',
      type: 'booking',
      title: 'Itinerary Version 2 Applied',
      message: 'Flight delay resolution applied. Timeline & map route updated.',
      read: false,
      actionUrl: 'itinerary',
      createdAt: new Date()
    });

    return {
      success: true,
      version: currentVersion,
      itineraryVersion: currentVersion,
      message: `Itinerary Version ${currentVersion} is now active`,
      proposal
    };
  }

  public async getItineraryVersions(tripId: string) {
    return mockStore.itineraries;
  }
}

export const replanningService = new ReplanningService();
