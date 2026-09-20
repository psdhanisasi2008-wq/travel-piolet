/**
 * TravelPilot Backend API Client
 * Base URL: http://localhost:5000/api
 */

const API_BASE_URL = 'http://localhost:5000/api';

class ApiClient {
  private token: string | null = localStorage.getItem('travelpilot_token');

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('travelpilot_token', token);
  }

  public getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || 'API request failed');
    }
    return data.data || data;
  }

  // Auth Endpoints
  public async login(email: string, password: string) {
    const res = await this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res.token) this.setToken(res.token);
    return res;
  }

  public async getMe() {
    return this.request('/auth/me');
  }

  // Dashboard Unified Endpoint
  public async getDashboard(tripId: string = 'trip-tokyo-101') {
    return this.request(`/trips/${tripId}/dashboard`);
  }

  // Itinerary Generation
  public async generateItinerary(tripId: string = 'trip-tokyo-101') {
    return this.request(`/trips/${tripId}/generate-itinerary`, {
      method: 'POST',
      body: JSON.stringify({ regenerate: true })
    });
  }

  // Simulate Disruption (Flight Delay)
  public async simulateFlightDelay(tripId: string = 'trip-tokyo-101', delayMinutes: number = 120) {
    return this.request('/demo/flight-delay', {
      method: 'POST',
      body: JSON.stringify({ tripId, delayMinutes })
    });
  }

  // Apply Replan
  public async applyReplan(proposalId: string) {
    return this.request(`/replans/${proposalId}/apply`, {
      method: 'POST'
    });
  }

  // Ask TravelPilot AI
  public async askAI(tripId: string = 'trip-tokyo-101', question: string) {
    return this.request(`/trips/${tripId}/ask`, {
      method: 'POST',
      body: JSON.stringify({ question })
    });
  }

  // Fetch Budget Metrics
  public async getBudget(tripId: string = 'trip-tokyo-101') {
    return this.request(`/trips/${tripId}/budget`);
  }

  // Update Budget Limit
  public async updateBudget(tripId: string = 'trip-tokyo-101', newBudget: number) {
    return this.request(`/demo/budget-change`, {
      method: 'POST',
      body: JSON.stringify({ tripId, newBudget })
    });
  }

  // Reset Demo State
  public async resetDemo() {
    return this.request('/demo/reset', { method: 'POST' });
  }
}

export const apiClient = new ApiClient();
