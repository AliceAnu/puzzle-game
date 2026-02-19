import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function keepAlive() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(`[${new Date().toLocaleTimeString()}] Neon DB awake ✅`);
  } catch (error) {
    console.error(`[${new Date().toLocaleTimeString()}] Neon DB idle / connection failed ❌`, error);
  } finally {
    // Run again in 4 minutes
    setTimeout(keepAlive, 4 * 60 * 1000);
  }
}

// Start keep-alive
keepAlive();
