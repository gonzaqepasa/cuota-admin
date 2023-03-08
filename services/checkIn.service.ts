import { prisma } from "./prismaConfig";

export async function createCheckIn() {
  try {







      await prisma.$disconnect();
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
