import Swal from "sweetalert2";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesUser } from "../../types/types-user";
import { auth } from "../../../firebase/firebaseConfig";
import { payMonthService } from "../../../services/month.service";

interface typesToPay {
  monthName: string;
  userData: typesUser;
  method: "MP" | "EF";
}

export async function payMonth({ monthName, userData, method }: typesToPay) {
  const fecha = new Date();
  try {
    await payMonthService({
      method,
      monthName: monthName.trim().toLowerCase(),
      description: "",
      trainer: String(auth.currentUser?.email),
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
