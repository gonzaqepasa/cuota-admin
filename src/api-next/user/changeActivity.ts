import Swal from "sweetalert2";
import { typesActivity } from "../../types/types-user";
import { changeActivityService } from "../../../services/user.service";

export async function changeActivity(
  // Primer Parametro
  {
    id_user,
    activity,
    onClose,
  }: { id_user: string; activity: typesActivity; onClose: () => void }
) {
  try {
    const { data } = await changeActivityService({
      userId: id_user,
      newActivityId: activity._id,
    });
    onClose && onClose();

    Swal.fire({
      position: "bottom-end",
      background: "green",
      color: "white",
      text: "Actividad cambiada con éxito!",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });

    return data;
  } catch (err) {
    console.log(err);
    Swal.fire({
      background: "red",
      position: "bottom-end",
      color: "white",
      title: `Error inesperado`,
      showConfirmButton: false,
      backdrop: false,
      text: `Consulte con el desarrollador (detalles en consola)`,
    });
  }
}
