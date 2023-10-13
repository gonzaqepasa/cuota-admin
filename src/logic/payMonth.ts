import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../config/env_d";
import { firstLetterUpper } from "./firstLetterUpper";
import { typesMonth, typesUser } from "../types/types-user";
import { monthOfPay } from "../components/Deptor/logic/moths.d";
import { auth } from "../../firebase/firebaseConfig";

interface typesToPay {
  month: typesMonth;
  userData: typesUser;
  getUserAgain: () => void;
}

export function payMonth({ month, userData, getUserAgain }: typesToPay) {
  Swal.fire({
    reverseButtons: true,
    background: "#202020",
    color: "white",
    title: "Estas seguro?",
    text: `${firstLetterUpper(userData.name)} pago el mes de ${
      month.monthName
    }`,
    icon: "warning",
    showCancelButton: true,
    showDenyButton: true,
    denyButtonColor: "#379237",
    confirmButtonColor: "#009ee3",
    cancelButtonColor: "#202020",
    denyButtonText: "Efectivo",
    confirmButtonText: "Mercado Pago",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      pay("MP");
    } else if (result.isDenied) {
      pay("EF");
    }
    function pay(method: "MP" | "EF") {
      Promise.all([
        axios.put(`${url}/month/pay-month`, {
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
        }),
        axios.post(`${url}/payment/pay`, {
          id: month.id, // ID del mes
          addAdmin: auth.currentUser?.email, //
          methodPay: method,
          pricePay: userData.activity.price,
          activityId: userData.activity.id,
          activityModality: userData.activity.modality,
          activityName: userData.activity.nameActivity,
          monthId: month.id,
          monthName: month.monthName,
          monthNum: monthOfPay(month.monthName),
          userId: userData.id,
          userName: userData.name,
        }),
      ])
        .then(([monthPay, payment]) => {
          Swal.fire({
            background: "#202020",
            color: "white",
            icon: "success",
            title: `Pago aceptado!`,
            text: `${firstLetterUpper(userData.name)} pago el mes de ${
              month.monthName
            }`,
          });
          getUserAgain();
          return [monthPay.data, payment.data];
        })

        .catch((e) => {
          console.log(e);
          Swal.fire({
            background: "#202020",
            color: "white",
            icon: "error",
            title: `Error inesperado`,
            text: `Consulte con el desarrollador (detalles en consola)`,
          });
          getUserAgain();
        });
    }
  });
}
