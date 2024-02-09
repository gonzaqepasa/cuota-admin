import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../config/env_d";

export async function editPhoneLogic({
  id,
  newPhone,
}: {
  id: string;
  newPhone: string;
}) {
  try {
    await axios.put(`${url}/user/edit-phone`, {
      id,
      phone: newPhone,
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
    return newPhone;
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
