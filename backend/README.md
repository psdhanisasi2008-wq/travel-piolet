# TravelPilot Backend API
> Intelligent Trip Planning & Disruption Management Agent - Hackathon MVP Backend

## Overview

The **TravelPilot Backend** is a high-performance Express + TypeScript API powering the TravelPilot real-time trip operating system. It features:

- **Rule-based Feasibility Engine**: Generates 7-day day-by-day itineraries based on travel pace, category preferences, opening hours, budget, and geographic Haversine distances without depending on AI for math or schedule calculation.
- **Disruption Management Engine**: Detects flight delays, calculates schedule impacts on transfer and dinner bookings, and distinguishes between **Fixed** (flight/hotel/reservations) and **Flexible** (walk-in dining, free time) items.
- **Automated Replanning**: Generates proposed schedule adjustments (`ReplanProposal`) with clear explanations for every change, comparing `CURRENT PLAN` vs `PROPOSED PLAN`.
- **Itinerary Versioning**: Promotes approved proposals to `Itinerary Version 2` while preserving full historical audit logs.
- **Grounded AI Service**: Responds to natural language queries (`/api/trips/:id/ask`) using strict factual trip context retrieved from the database, falling back gracefully to `MockAIService` when no `AI_API_KEY` is present.
- **Zero-Config Ready**: Runs out-of-the-box using the built-in mock store fallback or PostgreSQL + Prisma.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The API will be live at `http://localhost:5000/api`.

---

## 📚 API Documentation (Swagger)

Interactive Swagger UI documentation is served automatically at:
**`http://localhost:5000/api/docs`**

---

## ⚡ Main Demo Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login with demo user (`demo@travelpilot.app`) |
| `GET` | `/api/trips/:id/dashboard` | Aggregated dashboard state for frontend |
| `POST` | `/api/trips/:id/generate-itinerary` | Generate day-by-day feasible itinerary |
| `POST` | `/api/demo/flight-delay` | **Trigger Flight Delay Disruption (120 mins delay)** |
| `GET` | `/api/trips/:id/replans` | Get generated replan proposals |
| `POST` | `/api/replans/:id/apply` | **Apply replan & bump itinerary to Version 2** |
| `POST` | `/api/trips/:id/ask` | Ask grounded AI assistant about current trip |

---

## 🧪 Running Tests

Run the full core hackathon integration test suite:

```bash
npm test
```

---

## 🐳 Docker Setup

Run backend and PostgreSQL database together via Docker Compose:

```bash
docker compose up --build
```
