import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/services-url";

export function visibilityUser(
  // Primer Parametro
  e: MouseEvent<HTMLButtonElement>,
  // Segundo parametro
  { id, active }: { id: number; active: boolean },
  // Tercer Parametro
  getDataAgain: Function
) {
  Swal.fire({
    reverseButtons: true,
    background: "#090202",
    color: "white",
    title: active ? "Usuario Activo!" : "Usuario Inactivo",
    text: active
      ? "¿Quieres dejar inactivo al usuario?"
      : "¿Quieres activar al usuario?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        try {
          const { data } = await axios.put(`${url}/user/edit-active`, {
            id,
            active,
          });

          Swal.fire({
            background: "#090202",
            color: "white",
            icon: "success",
            title: active ? `Usuario inactivo!` : "Usuario activo!",
            text: active
              ? `El usuario ahora se muestra en el fondo de la lista`
              : "El usuario se muestra activo ahora!",
          });
          getDataAgain();
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
        }
      })();
    }
  });
}
