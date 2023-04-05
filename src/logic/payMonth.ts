import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/services-url";
import { firstLetterUpper } from "./firstLetterUpper";

export function payMonth(
  e: MouseEvent<HTMLButtonElement>,
  id: number,
  userName: string,
  monthName: string,
  addAdmin: string | null | undefined,

  price: number,
  getUserAgain: Function
) {
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
      try {
        const { data } = await axios.put(`${url}/month/pay-month`, {
          id,
          addAdmin,
          mothodPay: method,
          price,
        });

        Swal.fire({
          background: "#202020",
          color: "white",
          icon: "success",
          title: `Pago aceptado!`,
          text: `${userName} pago el mes de ${monthName}`,
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
