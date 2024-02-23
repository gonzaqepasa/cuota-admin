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
}: any) {
  try {
    const data = {
      color,
      price,
      nameActivity,
      modality,
    };
    const activity = await fetch(`${url}/activity/create-activity`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataActivity = await activity.json();

    console.log("ESSTO LLEGAAGAA",dataActivity);
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
