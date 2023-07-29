import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/services-url";
import { firstLetterUpper } from "./firstLetterUpper";

interface typesToPay {
  e: MouseEvent<HTMLButtonElement>;
  id: number;
  userName: string;
  monthName: string;
  addAdmin: string | null | undefined;
  activityId: number;
  pricePay: number;
  getUserAgain: Function;
}

export function payMonth({
  e,
  id,
  userName,
  monthName,
  addAdmin,
  activityId,
  pricePay,
  getUserAgain,
}: typesToPay) {
  Swal.fire({
    reverseButtons: true,
    background: "#202020",
    color: "white",
    title: "Estas seguro?",
    text: `${firstLetterUpper(userName)} pago el mes de ${monthName}`,
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
    async function pay(method: "MP" | "EF") {
      ////// PRIEMRA CAPA (1°)
      // se hacen las llamadas a la api para pagar el mes
      try {
        const { data } = await axios.put(`${url}/month/pay-month`, {
          id,
          addAdmin,
          mothodPay: method,
          pricePay,
          activityId,
        });

        Swal.fire({
          background: "#202020",
          color: "white",
          icon: "success",
          title: `Pago aceptado!`,
          text: `${firstLetterUpper(userName)} pago el mes de ${monthName}`,
        });
        console.log("esto llega del patch", data);
        getUserAgain();
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
  });
  e.preventDefault();
}
