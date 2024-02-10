import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../config/env_d";

export async function editPhoneLogic({
  id,
  newVal,
}: {
  id: string;
  newVal: string;
}) {
  try {
    await axios.put(`${url}/user/edit-phone`, {
      id,
      phone: newVal,
    });

    Swal.fire({
      background: "green",
      color: "white",
      text: "El numero de teléfono fue cambiado con éxito.",
      timer: 2000,
      backdrop: false,
      position: "bottom-end",
      showConfirmButton: false,
    });
    newVal;
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
