import { prisma } from "./prismaConfig";

export async function payMonth({ id, addAdmin, mothodPay, pricePay }: any) {
  try {
    if (!id || !addAdmin || !mothodPay) {
      throw new Error("Faltan argumentos");
    }
    const fecha = new Date();
    console.log(id, addAdmin, mothodPay);
    const addData = `${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()} Hs`;
    const month = await prisma.month.update({
      where: {
        id,
      },
      data: {
        isPay: true,
        addData,
        addAdmin,
        mothodPay,
        pricePay: pricePay,
      },
    });

    await prisma.$disconnect();
    return month;
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function getMonths({
  monthName,
  isPay,
  addData,
}: {
  monthName: string | undefined;
  isPay: boolean | undefined;
  addData: String | any;
}) {
  try {
    const months = await prisma.month.findMany({
      where: {
        isPay,
        monthName,
        addData
      },
      include: {
        calendar: {
          include: {
            User: {
              include: { activity: true },
            },
          },
        },
      },
    });
    await prisma.$disconnect();
    return months;
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function cancelPayMonth({ id, addAdmin }: any) {
  try {
    if (!id) {
      throw new Error("Faltan argumentos");
    }

    const month = await prisma.month.update({
      where: {
        id,
      },
      data: {
        isPay: false,
        addData: " ",
        addAdmin: " ",
      },
    });

    await prisma.$disconnect();
    return month;
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
