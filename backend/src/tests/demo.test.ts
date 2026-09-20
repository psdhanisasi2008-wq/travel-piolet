import request from 'supertest';
import app from '../app';

describe('TravelPilot Hackathon Core Engine End-to-End Tests', () => {
  let authToken: string;
  const tripId = 'trip-tokyo-101';
  let proposalId: string;

  it('1. Authentication: Register and Login', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'demo@travelpilot.app', password: 'password123' });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.success).toBe(true);
    expect(loginRes.body.data.token).toBeDefined();
    authToken = loginRes.body.data.token;
  });

  it('2. Itinerary Generation: Generate 7-day feasibility itinerary', async () => {
    const res = await request(app)
      .post(`/api/trips/${tripId}/generate-itinerary`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ regenerate: true });

    expect([200, 201]).toContain(res.status);
    expect(res.body.success).toBe(true);
    expect(res.body.data.days).toBeDefined();
    expect(res.body.data.days.length).toBeGreaterThan(0);
  });

  it('3. Flight Delay Detection & Replanning Proposal Generation', async () => {
    const delayRes = await request(app)
      .post('/api/demo/flight-delay')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ tripId, delayMinutes: 120 });

    expect(delayRes.status).toBe(200);
    expect(delayRes.body.success).toBe(true);
    expect(delayRes.body.data.affectedItems).toBeGreaterThan(0);
    expect(delayRes.body.data.proposalId).toBeDefined();

    proposalId = delayRes.body.data.proposalId;
  });

  it('4. Apply Replan Proposal & Create Itinerary Version 2', async () => {
    expect(proposalId).toBeDefined();

    const applyRes = await request(app)
      .post(`/api/replans/${proposalId}/apply`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(applyRes.status).toBe(200);
    expect(applyRes.body.success).toBe(true);
    expect(applyRes.body.data.version).toBeGreaterThanOrEqual(2);
  });

  it('5. Budget Calculation: Fetch budget metrics', async () => {
    const budgetRes = await request(app)
      .get(`/api/trips/${tripId}/budget`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(budgetRes.status).toBe(200);
    expect(budgetRes.body.success).toBe(true);
    expect(budgetRes.body.data.totalBudget).toBeDefined();
    expect(budgetRes.body.data.remaining).toBeDefined();
  });

  it('6. Grounded AI Q&A: Answer natural language itinerary query', async () => {
    const aiRes = await request(app)
      .post(`/api/trips/${tripId}/ask`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ question: 'Can I fit TeamLab tomorrow afternoon?' });

    expect(aiRes.status).toBe(200);
    expect(aiRes.body.success).toBe(true);
    expect(aiRes.body.data.answer).toBeDefined();
    expect(aiRes.body.data.answer.length).toBeGreaterThan(10);
  });

  it('7. Dashboard API: Return unified single payload for frontend', async () => {
    const dashRes = await request(app)
      .get(`/api/trips/${tripId}/dashboard`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(dashRes.status).toBe(200);
    expect(dashRes.body.success).toBe(true);
    expect(dashRes.body.data.trip).toBeDefined();
    expect(dashRes.body.data.today).toBeDefined();
    expect(dashRes.body.data.budget).toBeDefined();
    expect(dashRes.body.data.alerts).toBeDefined();
  });
});
