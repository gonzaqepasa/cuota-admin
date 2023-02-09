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
