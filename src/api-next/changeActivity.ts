import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../config/env_d";
import { typesActivity } from "../types/types-user";

export async function changeActivity(
  // Primer Parametro
  { id_user, activity }: { id_user?: string; activity?: typesActivity }
) {
  try {
    const { data } = await axios.put(`${url}/user/change-activity`, {
      id_user,
      id_activity: activity?.id,
    });

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
