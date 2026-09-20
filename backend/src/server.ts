import app from './app';
import { env } from './config/env';

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 TravelPilot Backend Engine active on port ${PORT}`);
  console.log(`📚 Swagger Docs available at http://localhost:${PORT}/api/docs`);
  console.log(`⚡ Mode: ${env.NODE_ENV}`);
  console.log(`==================================================`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection error:', err);
});

export default server;
