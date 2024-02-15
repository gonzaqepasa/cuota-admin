import { typesActivity } from "../src/types/types-user";
import { prisma } from "./prismaConfig";

export async function createActivityService({
  color,
  modality,
  nameActivity,
  price,
}: typesActivity) {
  try {
    const activity = await prisma.activity.create({
      data: {
        modality: modality.trim().toLowerCase(),
        nameActivity: nameActivity.trim().toLowerCase(),
        price,
        color,
      },
    });
    return activity;
  } catch (e) {
    console.log(e);
  }
}

export async function getActivity({ activity }: any) {
  try {
    let data;
    activity
      ? (data = {
          where: {
            nameActivity: String(activity),
          },
        })
      : (data = undefined);

    const activities = await prisma.activity.findMany(data);
    await prisma.$disconnect();
    return activities;
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
export async function getActivities({ activity }: any) {
  try {
    let data;
    activity
      ? (data = {
          where: {
            nameActivity: String(activity),
          },
        })
      : (data = undefined);

    const activities = await prisma.activity.findMany(data);
    await prisma.$disconnect();
    return activities;
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function editPrice({ id, price }: any) {
  try {
    const activities = await prisma.activity.update({
      where: { id: Number(id) },
      data: {
        price: Number(price),
      },
    });

    await prisma.$disconnect();
    return activities;
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
export async function editColor({ id, nameActivity, color }: any) {
  try {
    const activities = await prisma.activity.updateMany({
      where: { nameActivity },
      data: {
        color: String(color),
      },
    });

    await prisma.$disconnect();
    return activities;
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function getActivityForCloseMonth() {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        User: {
          include: {
            calendar: {
              include: { months: true },
            },
          },
        },
      },
    });
    await prisma.$disconnect();
    return activities;
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
export async function deleteActivityService({ id }: any) {
  try {
    const user = await prisma.activity.delete({
      where: {
        id: Number(id),
      },
      include: {
        User: true,
      },
    });
    console.log(id);
    await prisma.$disconnect();
    return "user";
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
