import Activity from "../models/activity/activity.model";
import { prisma } from "./prismaConfig";

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
export async function createActivity({ name }: { name: string }) {
  try {
    const activity = new Activity({ name });
    await activity.save();

    return activity;
  } catch (err) {
    console.log(err);
    return err;
  }
}
