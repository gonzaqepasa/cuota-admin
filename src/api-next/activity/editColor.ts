import Swal from "sweetalert2";
import { typesActivity } from "../../types/types-user";
import { updateColorForActivitiesByName } from "../../../services/activity.service";

export async function editColor({ nameActivity, color }: typesActivity) {
  try {
    const data = await updateColorForActivitiesByName(nameActivity, color);

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
