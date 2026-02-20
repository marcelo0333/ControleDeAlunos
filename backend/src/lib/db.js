import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = createPrismaClient();