import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
});

let isDbConnected = false;

export async function connectDatabase(): Promise<boolean> {
  try {
    await prisma.$connect();
    isDbConnected = true;
    console.log('✅ PostgreSQL database connected successfully via Prisma');
    return true;
  } catch (error) {
    isDbConnected = false;
    console.warn('⚠️ PostgreSQL database connection failed. Falling back to in-memory store for Hackathon demo.');
    return false;
  }
}

export function isDatabaseConnected(): boolean {
  return isDbConnected;
}
