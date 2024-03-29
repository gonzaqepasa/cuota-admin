import axios from "axios";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import Swal from "sweetalert2";
import { url } from "../config/env_d";

export function visibilityUser(
  // Primer Parametro
  e: MouseEvent<HTMLButtonElement>,
  // Segundo parametro
  { id, active }: { id: number; active: boolean },
  // Tercer Parametro
  getDataAgain: () => void,
  // Tercer Parametro
  setLoad?: Dispatch<SetStateAction<boolean>>
) {
  Swal.fire({
    reverseButtons: true,
    background: "#202020",
    color: "white",

    text: active
      ? "¿Quieres dejar inactivo al usuario?"
      : "¿Quieres activar al usuario?",

    showCancelButton: true,
    confirmButtonColor: "#77abb7",
    cancelButtonColor: "#202020",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      (async function () {
        setLoad && setLoad(true);
        try {
          const { data } = await axios.put(`${url}/user/edit-active`, {
            id,
            active,
          });

          getDataAgain();
          /*   Swal.fire({
            background: "#090202",
            color: "white",
            icon: "success",
            title: active ? `Usuario inactivo!` : "Usuario activo!",
            text: active
              ? `El usuario ahora se muestra en el fondo de la lista`
              : "El usuario se muestra activo ahora!",
          }); */
          console.log("esto llega del patch", data);
          // getUserAgain()
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
    }
  });
}
