import Swal from "sweetalert2";
import { typesActivity } from "../../types/types-user";
import { updateColorForActivitiesByName } from "../../../services/activity.service";
import Activity from "../../mongoose/models/Activity";

export async function editColor({ nameActivity, color }: typesActivity) {
  try {
    // Actualizar el color de todas las actividades con el mismo nombre
    const updatedActivities = await Activity.updateMany(
      { nameActivity },
      { color }
    );

    return { success: `Color actualizado` };
    Swal.fire({
      // background: "#202020",
      color: "black",
      icon: "success",
      confirmButtonColor: color,
      title: "Color cambiado",
      text: `Se a asignado un nuevo color para ${nameActivity}`,
    });
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
