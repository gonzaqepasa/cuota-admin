import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../config/env_d";

interface Params {
  id: any;
  nameUser: string;
  setLoad: Dispatch<SetStateAction<boolean>>;
  cb: () => void;
}
export async function deleteUserLogic({ id, nameUser, cb, setLoad }: Params) {
  try {
    setLoad(true);
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
    setLoad(false);
  } catch (err) {
    console.log(err);
    setLoad(false);

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
