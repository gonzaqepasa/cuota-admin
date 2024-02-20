import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../../config/env_d";
import { typesActivity } from "../../types/types-user";
import { numberToMoney } from "../../logic/numberToMoney";

export async function createActivity({
  nameActivity,
  modality,
  price,
  color,
}: typesActivity) {
  try {
    const { data } = await axios.post(`${url}/activity/create-activity`, {
      color,
      price,
      nameActivity,
      modality,
    });
    console.log(data);
    Swal.fire({
      // background: "#202020",
      color: "black",
      icon: "success",
      title: "Actividad creada",
      text: `Se a creado la actividad ${nameActivity} ${modality}`,
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
