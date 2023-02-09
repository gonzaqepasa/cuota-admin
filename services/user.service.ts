import { typesUser } from "../src/types/types-user";
import { prisma } from "./prismaConfig";

export async function getUsers(activity: any) {
  try {
    console.log(activity);
    let data;
    activity
      ? (data = {
          where: {
            activity: {
              nameActivity: String(activity),
            },
          },
          include: {
            activity: true,
          },
        })
      : (data = undefined);

    const users = await prisma.user.findMany(data);
    await prisma.$disconnect();
    return users;
    process.exit(1);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
