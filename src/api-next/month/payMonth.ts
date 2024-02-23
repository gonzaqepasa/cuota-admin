import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../../config/env_d";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesMonth, typesUser } from "../../types/types-user";
import { monthOfPay } from "../../config/moths";
import { auth } from "../../../firebase/firebaseConfig";
import { revalidatePath } from "next/cache";

interface typesToPay {
  monthName: string;
  userData: typesUser;
  method: "MP" | "EF";
}

export async function payMonth({ monthName, userData, method }: typesToPay) {
  const fecha = new Date();
  try {
    await axios.post(`${url}/month/pay-month`, {
      method,
      monthName: monthName.trim().toLowerCase(),
      description: "",
      trainer: auth.currentUser?.email,
      pricePay: userData.activity.price,
      user: userData._id,
      activity: userData.activity._id,
      paymentDate: fecha.toISOString(),
    });
    Swal.fire({
      background: "#f2f2f2",
      color: "black",
      icon: "success",
      confirmButtonColor: "#005eff",
      title: `Pago aceptado!`,
      text: `${firstLetterUpper(userData.name)} pago el mes de ${monthName}`,
    });
    revalidatePath(`/activity/[activity]`, "layout");
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
