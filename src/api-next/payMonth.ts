import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../config/env_d";
import { firstLetterUpper } from "../logic/firstLetterUpper";
import { typesMonth, typesUser } from "../types/types-user";
import { monthOfPay } from "../config/moths.d";
import { auth } from "../../firebase/firebaseConfig";

interface typesToPay {
  month: typesMonth;
  userData: typesUser;
  method: "MP" | "EF";
}

export async function payMonth({ month, userData, method }: typesToPay) {
  try {
    await axios.put(`${url}/month/pay-month`, {
      id: month.id, // ID del mes
      addAdmin: auth.currentUser?.email, //
      mothodPay: method,
      price: userData.activity.price,
      activityId: userData.activity.id,
      activityModality: userData.activity.modality,
      activityName: userData.activity.nameActivity,
      monthId: month.id,
      monthName: month.monthName,
      monthNum: monthOfPay(month.monthName),
      userId: userData.id,
      userName: userData.name,
    });

    Swal.fire({
      background: "#f2f2f2",
      color: "black",
      icon: "success",
      confirmButtonColor: "#005eff",
      title: `Pago aceptado!`,
      text: `${firstLetterUpper(userData.name)} pago el mes de ${
        month.monthName
      }`,
    });
  } catch (e) {
    console.log(e);
    Swal.fire({
      background: "#202020",
      color: "white",
      icon: "error",
      title: `Error inesperado`,
      text: `Consulte con el desarrollador (detalles en consola)`,
    });
  }
}
