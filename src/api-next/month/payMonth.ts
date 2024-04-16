import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../../config/env_d";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesActivity, typesUser } from "../../types/types-user";
import { mesActual } from "../../config/moths.d";
import { auth } from "../../../firebase/firebaseConfig";

interface typesToPay {
  userData: typesUser;
  method: "MP" | "EF";
  activity: typesActivity;
}

export async function payMonth({ userData, method, activity }: typesToPay) {
  const fecha = new Date();
  try {
    await axios.post(`${url}/month/pay-month`, {
      method,
      monthName: mesActual(),
      description: "",
      trainer: auth.currentUser?.email,
      pricePay: activity.price,
      user: userData._id,
      activity: activity._id,
      paymentDate: fecha.toISOString(),
    });
    Swal.fire({
      background: "#f2f2f2",
      color: "black",
      icon: "success",
      confirmButtonColor: "#005eff",
      title: `Pago aceptado!`,
      text: `${firstLetterUpper(
        userData.name
      )} pago en el mes de ${mesActual()}`,
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
