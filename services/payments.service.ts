import { prisma } from "./prismaConfig";

export interface typesItemsToSearch {
  id?: number;
  pricePay?: number;
  // methodPay?: string;
  isPay?: boolean;
  activityId?: number;
  monthId?: number;
  addData?: string;
  addAdmin?: string;
}
interface typesToPay {
  monthId: number;
  activityId: number;
  isPay: boolean;
  methodPay: string;
  pricePay: number;
  addData: string;
  addAdmin: string;
}
const Payments = {
  pay: async ({
    monthId,
    isPay,
    methodPay,
    pricePay,
    activityId,
    addAdmin,
    addData,
  }: typesToPay) => {
    try {
      const data = await prisma.payments.create({
        data: {
          isPay: true,
          methodPay,
          addAdmin,
          addData: addData.split(" ")[0],
          pricePay: Number(pricePay),
          month: {
            connect: { id: Number(monthId) },
          },
          activity: {
            connect: { id: Number(activityId) },
          },
        },
      });
      await prisma.$disconnect();
      return data;
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      process.exit(1);
    }
  },
  getPaymentsServices: async ({
    pricePay,
    monthId,
    activityId,
    // methodPay,
    id,
    isPay,
    addAdmin,
    addData,
  }: typesItemsToSearch) => {
    try {
      ////// TERCERA CAPA
      // Aqui recibimos el objeto con las propiedades de busqueda
      // Se hace la consulta a la BD y devuelve segun lo encontrado
      let dataToDb: any = {};
      // console.log(addAdmin, addData);
      // if (pricePay) dataToDb.pricePay = pricePay;
      if (activityId) dataToDb.activityId = activityId;
      if (addData) dataToDb.addData = addData;
      if (addAdmin) dataToDb.addAdmin = addAdmin;

      // if (monthId) dataToDb = { monthId };
      if (id) dataToDb = { id };

      const data = await prisma.payments.findMany({
        where: dataToDb,
        include: {
          activity: true,
          month: true,
        },
      });
      // console.log("Estoy en service" + pricePay);
      await prisma.$disconnect();
      return data;
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      process.exit(1);
    }
  },
};

export default Payments;
