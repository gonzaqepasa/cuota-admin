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
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function editDescription({ id, description }: any) {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        description,
      },
    });

    await prisma.$disconnect();
    return user;
  } catch (err) {
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function editActive({ id, active }: any) {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: !active,
      },
    });

    await prisma.$disconnect();
    return user;
  } catch (err) {
    await prisma.$disconnect();
    process.exit(1);
  }
}
