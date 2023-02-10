import { prisma } from "./prismaConfig";

export async function payMonth({ id, addAdmin, mothodPay }: any) {
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
