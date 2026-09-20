import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelPilot API Documentation',
      version: '1.0.0',
      description: 'Intelligent Trip Planning & Disruption Management Agent - Hackathon MVP API',
      contact: {
        name: 'TravelPilot Team'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    paths: {
      '/auth/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Authentication'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Demo Traveler' },
                    email: { type: 'string', example: 'demo@travelpilot.app' },
                    password: { type: 'string', example: 'password123' }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'User created' } }
        }
      },
      '/auth/login': {
        post: {
          summary: 'User login',
          tags: ['Authentication'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'demo@travelpilot.app' },
                    password: { type: 'string', example: 'password123' }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Login successful' } }
        }
      },
      '/auth/me': {
        get: {
          summary: 'Get current user profile',
          tags: ['Authentication'],
          responses: { 200: { description: 'Current user payload' } }
        }
      },
      '/trips': {
        get: {
          summary: 'List user trips',
          tags: ['Trips'],
          responses: { 200: { description: 'Array of trips' } }
        },
        post: {
          summary: 'Create a new trip',
          tags: ['Trips'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Tokyo Adventure' },
                    destination: { type: 'string', example: 'Tokyo' },
                    country: { type: 'string', example: 'Japan' },
                    startDate: { type: 'string', example: '2026-10-12' },
                    endDate: { type: 'string', example: '2026-10-18' },
                    budget: { type: 'number', example: 60000 },
                    travelers: { type: 'number', example: 2 }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Trip created' } }
        }
      },
      '/trips/{id}/dashboard': {
        get: {
          summary: 'Get complete aggregated trip dashboard',
          tags: ['Trips'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Full trip dashboard state' } }
        }
      },
      '/trips/{tripId}/generate-itinerary': {
        post: {
          summary: 'Generate feasibility-based day-by-day itinerary',
          tags: ['Itinerary'],
          parameters: [{ name: 'tripId', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: { 'application/json': { schema: { type: 'object', properties: { regenerate: { type: 'boolean' } } } } }
          },
          responses: { 200: { description: 'Generated itinerary and days' } }
        }
      },
      '/demo/flight-delay': {
        post: {
          summary: 'Simulate flight delay disruption and trigger replan engine',
          tags: ['Hackathon Demo'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    tripId: { type: 'string', example: 'trip-tokyo-101' },
                    delayMinutes: { type: 'number', example: 120 }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Disruption impact and proposed plan' } }
        }
      },
      '/replans/{id}/apply': {
        post: {
          summary: 'Apply proposed replan to itinerary (creates Itinerary Version 2)',
          tags: ['Replanning'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Itinerary updated with new version' } }
        }
      },
      '/trips/{tripId}/ask': {
        post: {
          summary: 'Ask TravelPilot AI a grounded natural language question',
          tags: ['AI Assistant'],
          parameters: [{ name: 'tripId', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    question: { type: 'string', example: 'Can I fit TeamLab tomorrow afternoon?' }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Grounded factual answer' } }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJsdoc(options);
