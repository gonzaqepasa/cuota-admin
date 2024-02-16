import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/env_d";
import { Dispatch, SetStateAction } from "react";
import { typesHanldeEditUser } from "../components/UserComponent/InformationPanel/ModalEditUser";

export async function editDescription({
  id,
  newVal,
  onClose,
}: typesHanldeEditUser) {
  try {
    await axios.put(`${url}/user/edit-description`, {
      id,
      description: newVal,
    });
    onClose && onClose();
    Swal.fire({
      background: "green",
      color: "white",
      text: "La descripción fue cambiado con éxito.",
      timer: 2000,
      backdrop: false,
      position: "bottom-end",
      showConfirmButton: false,
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "bottom-end",
      background: "red",
      color: "white",
      text: "Hubo un problema, consule con el desarrollador",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
  }
}
