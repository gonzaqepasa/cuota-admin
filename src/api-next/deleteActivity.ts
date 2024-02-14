import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../config/env_d";
import { typesActivity } from "../types/types-user";

interface Params {
  id: any;
  data: typesActivity;
}
export async function deleteActivity({ id }: Params) {
  try {
    const { data } = await axios.delete(
      `${url}/activity/delete-activity?id=${id}`
    );
    console.log(data);
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
