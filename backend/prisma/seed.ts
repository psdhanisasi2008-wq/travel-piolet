import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding TravelPilot database...');

  const passwordHash = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@travelpilot.app' },
    update: {},
    create: {
      email: 'demo@travelpilot.app',
      name: 'Miruthu Bashini',
      passwordHash
    }
  });

  const trip = await prisma.trip.upsert({
    where: { id: 'trip-tokyo-101' },
    update: {},
    create: {
      id: 'trip-tokyo-101',
      userId: user.id,
      name: 'Tokyo Adventure 2026',
      destination: 'Tokyo',
      country: 'Japan',
      startDate: new Date('2026-10-12'),
      endDate: new Date('2026-10-18'),
      travelers: 2,
      budget: 60000,
      currency: 'INR',
      status: 'PLANNING'
    }
  });

  console.log('Seed completed successfully for user:', user.email, 'Trip:', trip.name);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
