import { typesUser } from "../src/types/types-user";
import { prisma } from "./prismaConfig";
import { arrayWithNamesMonths } from "../src/config/infoMonths";

export async function createUser({
  name,
  email,
  phone,
  description,
  activityId,
}: any) {
  try {
    ////////////////////////////////////
    const user = await prisma.user.create({
      data: {
        // Información personal
        name,
        email,
        phone,
        description,
        //Informacion de actividad
        active: true,
        activity: {
          connect: {
            id: activityId,
          },
        },
        //Informacion de pago
        calendar: {
          create: {
            months: {
              create: arrayWithNamesMonths.map((obj) => {
                return {
                  monthNum: obj.num,
                  monthName: obj.name,
                  addData: "",
                  addAdmin: "",
                  isPay: false,
                  mothodPay: "",
                  pricePay: 0,
                };
              }),
            },
          },
        },
      },
    });
    ////////////////////////////////////
  } catch (err) {
    console.log(err);
  }
}

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
            calendar: {
              include: { months: true },
            },
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

export async function getUser({ id }: any) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        activity: true,
        calendar: {
          include: {
            months: true,
          },
        },
      },
    });
    return user;
  } catch (err) {}
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
