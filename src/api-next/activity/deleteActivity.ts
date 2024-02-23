import Swal from "sweetalert2";
import { typesActivity } from "../../types/types-user";
import { deleteActivityService } from "../../../services/activity.service";
import Activity from "../../mongoose/models/Activity";

interface Params {
  _id: any;
  data: typesActivity;
}
export async function deleteActivityClient({ _id }: Params) {
  try {
    // Verificar si la actividad tiene usuarios relacionados
    const activityWithUsers = await Activity.findOne({
      _id,
      users: { $exists: true, $ne: [] }, // Verificar si el campo 'users' existe y no está vacío
    });

    if (activityWithUsers) {
      return {
        error: "No se puede eliminar la actividad con usuarios relacionados",
      };
    }

    // Si no hay usuarios relacionados, proceder con la eliminación
    const deletedActivity = await Activity.findOneAndDelete({ _id });

    if (!deletedActivity) {
      return { error: "No se encontró la actividad" };
    }

    Swal.fire({
      position: "bottom-end",
      background: "green",
      color: "white",
      text: "Actividad eliminada con exito",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
    return deletedActivity as typesActivity;
  } catch (err) {
    console.log(err);

    Swal.fire({
      position: "bottom-end",
      background: "red",
      color: "white",
      text: "Hubo un error, consulte con el desarrollador",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
  }
}
