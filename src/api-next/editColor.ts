import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../config/env_d";
import { typesActivity } from "../types/types-user";
import { numberToMoney } from "../logic/numberToMoney";

export async function editColor({
  id,
  nameActivity,
  modality,
  price,
  color,
}: typesActivity) {
  try {
    const { data } = await axios.put(`${url}/activity/edit-color`, {
      id,
      color,
      nameActivity
    });

    Swal.fire({
      // background: "#202020",
      color: "black",
      icon: "success",
      confirmButtonColor:color,
      title: "Color cambiado",
      text: `Se a asignado un nuevo color para ${nameActivity}`,
    });
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
