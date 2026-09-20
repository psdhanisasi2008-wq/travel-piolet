export interface MapLocation {
  latitude: number;
  longitude: number;
  name?: string;
}

export interface TravelEstimate {
  distanceKm: number;
  durationMinutes: number;
  mode: 'walking' | 'transit' | 'driving';
}

export interface RoutingService {
  calculateTravelTime(origin: MapLocation, destination: MapLocation, mode?: 'walking' | 'transit' | 'driving'): Promise<TravelEstimate>;
}

export class MockRoutingService implements RoutingService {
  /**
   * Calculates Haversine distance between two coordinates in km
   */
  public calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  public async calculateTravelTime(
    origin: MapLocation,
    destination: MapLocation,
    mode: 'walking' | 'transit' | 'driving' = 'transit'
  ): Promise<TravelEstimate> {
    const distanceKm = this.calculateDistanceKm(
      origin.latitude,
      origin.longitude,
      destination.latitude,
      destination.longitude
    );

    // Realistic Tokyo transit calculation: 10 mins base + 4 mins per km
    let durationMinutes = Math.round(10 + distanceKm * 4);
    if (mode === 'walking') {
      durationMinutes = Math.round(distanceKm * 12);
    } else if (mode === 'driving') {
      durationMinutes = Math.round(8 + distanceKm * 3);
    }

    return {
      distanceKm,
      durationMinutes: Math.max(5, durationMinutes),
      mode
    };
  }
}

export const routingService = new MockRoutingService();
