import Activity from "../src/mongoose/models/Activity";
import "../src/mongoose/db_mongo";
import Month from "../src/mongoose/models/Month";
import User from "../src/mongoose/models/User";

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
    // Obtiene la fecha de pago como objeto Date
    const paymentDateTime = new Date(paymentDate);

    // Suma un mes a la fecha de pago
    const expirationDate = paymentDateTime.setMonth(
      paymentDateTime.getMonth() + 1
    );

    const newPayment = new Month({
      method,
      monthName,
      description,
      trainer,
      pricePay,
      user,
      activity,
      paymentDate,
      expirationDate,
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

export async function getMonths({ id }: { id: string }) {
  try {
    const payments = await Month.find({ user: id }).populate("activity");

    return payments;
  } catch (err) {
    console.log(err);
    throw new Error("Hubo un error al intentar pagar el mes");
  }
}

export async function cancelPayMonth({ id }: any) {
  try {
    // Buscar el pago por su ID
    const payment = await Month.findById(id);

    // Verificar si el pago existe
    if (!payment) {
      throw new Error("No se encoentro un pago con esa ID");
    }

    // Obtener el ID del usuario y de la actividad asociados al pago
    const userId = payment.user;
    const activityId = payment.activity;

    // Eliminar el pago
    await Month.findByIdAndDelete(id);

    // Sacar la relación del usuario con el pago cancelado
    await User.findByIdAndUpdate(userId, {
      $pull: { months: id },
    });

    // Sacar la relación de la actividad con el pago cancelado
    await Activity.findByIdAndUpdate(activityId, {
      $pull: { months: id },
    });

    return { success: true, message: "Pago cancelado exitosamente" };
  } catch (err) {
    console.log(err);
    return { error: "Error al cancelar el pago" };
  }
}
