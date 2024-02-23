import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../../config/env_d";

interface Params {
  id: string;
  cb: () => void;
}
export async function deleteUserLogic({ id, cb }: Params) {
  try {
    const { data } = await axios.put(`${url}/user/delete-user`, { id });

    console.log(data);
    Swal.fire({
      position: "bottom-end",
      background: "grey",
      color: "white",
      text: "Usuario eliminado con exito",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
    cb();
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
