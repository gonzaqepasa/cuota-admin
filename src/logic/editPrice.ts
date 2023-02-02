import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { typesActivity } from "../types/types-user";
import { numberToMoney } from "./numberToMoney";

export function editPrice(
  // Primer Parametro
  e: MouseEvent<HTMLButtonElement>,
  // Segundo parametro
  { id, nameActivity, modality, price }: typesActivity,
  // Tercer Parametro
  setPrice: Function,
  // Cuarto Parametro
  setEditOn: Function
) {
  Swal.fire({
    reverseButtons: true,
    background: "#090202",
    color: "white",
    title: `Cambiar precio a ${nameActivity} - ${modality}`,
    text: `El nuevo precio sería ${price}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Cambiar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        try {
          const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
          const { data } = await axios.put(
            `http://${url}/activity/price-edit`,
            {
              id,
              price,
            }
          );

          Swal.fire({
            background: "#090202",
            color: "white",
            icon: "success",
            title: "Precio cambiado",
            text: `El nuevo precio para ${nameActivity} - ${modality} es ${numberToMoney(
              price
            )}`,
          });
          setPrice(price);
          setEditOn(false);
          console.log("esto llega del patch", data);
          // getUserAgain()
        } catch (err) {
          console.log(err);

          Swal.fire({
            background: "#090202",
            color: "white",
            icon: "error",
            title: `Error inesperado`,
            text: `Consulte con el desarrollador (detalles en consola)`,
          });
          setEditOn(false);
        }
      })();
    }
  });
}
