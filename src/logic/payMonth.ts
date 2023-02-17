import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/services-url";

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
    background: "#0f202b",
    color: "white",
    title: "Estas seguro?",
    text: `${userName} pago el mes de ${monthName}`,
    icon: "warning",
    showCancelButton: true,
    showDenyButton: true,
    denyButtonColor: "#379237",
    confirmButtonColor: "#009ee3",
    cancelButtonColor: "#0f202b",
    denyButtonText: "Efectivo",
    confirmButtonText: "Mercado Pago",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    let payMethod: "MP" | "EF" = "EF";
    if (result.isConfirmed) {
      payMethod = "MP";
    } else if (result.isDenied) {
      payMethod = "EF";
    }
    (async function () {
      try {
        const { data } = await axios.put(`${url}/month/pay-month`, {
          id,
          addAdmin,
          mothodPay: payMethod,
          price,
        });
        /*  const res = await fetch(`http://${url}/turno/pay-turno`, {
            method: "PUT", // or 'PUT'
            body: JSON.stringify({
              id,
              addAdmin,
              mothodPay,
            }), // data can be `string` or {object}!
            headers: {
              "Content-Type": "application/object",
            },
          });
          const data = await res.json(); */
        Swal.fire({
          background: "#0f202b",
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
          background: "#0f202b",
          color: "white",
          icon: "error",
          title: `Error inesperado`,
          text: `Consulte con el desarrollador (detalles en consola)`,
        });
      }
    })();
  });
  e.preventDefault();
}
