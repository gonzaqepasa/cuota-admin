import Swal from "sweetalert2";
import { cancelPayMonth } from "../../../services/month.service";
import Activity from "../../mongoose/models/Activity";
import User from "../../mongoose/models/User";
import Month from "../../mongoose/models/Month";

interface payCancelProps {
  id: string;
  monthName: string;
}

export async function payCancel({ id, monthName }: payCancelProps) {
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

    Swal.fire({
      background: "#f2f2f2",
      color: "black",
      icon: "success",
      title: `Pago Cancelado!`,
      text: `Cancelaste el pago del mes de ${monthName}`,
      confirmButtonColor: "#476d7c",
    });
    return { success: true, message: "Pago cancelado exitosamente" };
  } catch (err) {
    console.log(err);
    Swal.fire({
      background: "#202020",
      color: "white",
      icon: "error",
      title: `Error inesperado`,
      text: `Consulte con el desarrollador (detalles en consola)`,
    });
  }
}
