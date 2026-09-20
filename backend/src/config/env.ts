import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const env = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/travelpilot?schema=public',
  JWT_SECRET: process.env.JWT_SECRET || 'travelpilot_super_secret_jwt_key_2026_hackathon',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  AI_API_KEY: process.env.AI_API_KEY || '',
  AI_MODEL: process.env.AI_MODEL || 'gpt-4o-mini',
  MAP_API_KEY: process.env.MAP_API_KEY || '',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};
