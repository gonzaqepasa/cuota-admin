import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../../services/services-url";

export function payMonth(
  e: MouseEvent<HTMLButtonElement>,
  id: number,
  userName: string,
  monthName: string,
  addAdmin: string | null | undefined,
  mothodPay: string,
  getUserAgain: Function
) {
  Swal.fire({
    reverseButtons: true,
    background: "#090202",
    color: "white",
    title: "Estas seguro?",
    text: `${userName} pago el mes de ${monthName}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si pago",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        try {
          const { data } = await axios.put(`${url}/month/pay-month`, {
            id,
            addAdmin,
            mothodPay,
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
            background: "#090202",
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
            background: "#090202",
            color: "white",
            icon: "error",
            title: `Error inesperado`,
            text: `Consulte con el desarrollador (detalles en consola)`,
          });
        }
      })();
    }
  });
  e.preventDefault();
}
