import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../config/env_d";

export async function editName({
  id,
  newName,
  refresh,
}: {
  id: string;
  newName: string;
  refresh: any;
}) {
  try {
    await axios.put(`${url}/user/edit-name`, {
      id,
      name: newName,
    });

    Swal.fire({
      background: "green",
      color: "white",

      text: "El nombre fue cambiado con éxito.",
      timer: 2000,
      backdrop: false,
      position: "bottom-end",
      showConfirmButton: false,
    });
    refresh();
    return newName;
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
