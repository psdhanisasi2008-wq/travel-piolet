import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger';
import { errorHandler } from './middleware/errorHandler';

// Import Route modules
import authRoutes from './modules/auth/auth.routes';
import tripsRoutes from './modules/trips/trips.routes';
import itineraryRoutes from './modules/itinerary/itinerary.routes';
import activitiesRoutes from './modules/activities/activities.routes';
import bookingsRoutes from './modules/bookings/bookings.routes';
import disruptionsRoutes from './modules/disruptions/disruptions.routes';
import replanningRoutes from './modules/replanning/replanning.routes';
import aiRoutes from './modules/ai/ai.routes';
import budgetRoutes from './modules/budget/budget.routes';
import notificationsRoutes from './modules/notifications/notifications.routes';
import demoRoutes from './modules/demo/demo.routes';

const app: Application = express();

// Global Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'TravelPilot API', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api', itineraryRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api', bookingsRoutes);
app.use('/api', disruptionsRoutes);
app.use('/api', replanningRoutes);
app.use('/api', aiRoutes);
app.use('/api', budgetRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/demo', demoRoutes);

// Backup direct aliases for frontend API contract convenience
app.use('/api', (req: Request, res: Response, next) => {
  if (req.path === '/notifications' && req.method === 'GET') {
    return res.redirect(307, '/api/notifications');
  }
  next();
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
