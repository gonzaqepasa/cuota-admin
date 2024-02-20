import Activity from "../src/mongoose/models/Activity";
import Month from "../src/mongoose/models/Month";
import User from "../src/mongoose/models/User";
import { prisma } from "./prismaConfig";

interface CreatePaymentParams {
  method: string;
  monthName: string;
  description?: string;
  trainer: string;
  pricePay: number;
  user: string; // Aquí debes pasar el ID del usuario
  activity: string; // Aquí debes pasar el ID de la actividad
  paymentDate: string;
}

export async function payMonth({
  method,
  monthName,
  description,
  trainer,
  pricePay,
  user,
  activity,
  paymentDate,
}: CreatePaymentParams) {
  try {
    console.log({
      method,
      monthName,
      description,
      trainer,
      pricePay,
      user,
      activity,
      paymentDate,
    });
    const newPayment = new Month({
      method,
      monthName,
      description,
      trainer,
      pricePay,
      user,
      activity,
      paymentDate,
      isPay: true,
    });

    await newPayment.save();
    // Actualizar la referencia en la colección User
    await User.findByIdAndUpdate(user, {
      $push: { months: newPayment._id }, // Asumiendo que months es el array de meses en User
    });

    // Actualizar la referencia en la colección Activity
    await Activity.findByIdAndUpdate(activity, {
      $push: { months: newPayment._id }, // Asumiendo que months es el array de meses en Activity
    });
    return newPayment;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating payment.");
  }
}

export async function getMonths({
  monthName,
  isPay,
}: {
  monthName: string;
  isPay: boolean;
}) {
  try {
    return "months";
  } catch (err) {
    console.log(err);
    throw new Error("Hubo un error al intentar pagar el mes");
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
        addDataIso: " ",
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
