import Swal from "sweetalert2";
import { typesActivity } from "../../types/types-user";
import { numberToMoney } from "../../logic/numberToMoney";
import { editActivity } from "../../../services/activity.service";

export async function editPrice({
  _id,
  nameActivity,
  modality,
  price,
}: typesActivity) {
  try {
    const { data } = await editActivity({
      _id,
      price,
    });
    Swal.fire({
      // background: "#202020",
      color: "black",
      icon: "success",
      title: "Precio cambiado",
      text: `El nuevo precio para ${nameActivity} - ${modality} es ${numberToMoney(
        price
      )}`,
    });

    console.log("esto llega del patch", data);
    // getUserAgain()
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
