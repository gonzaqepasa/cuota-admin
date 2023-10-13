import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/env_d";
import { Dispatch, SetStateAction } from "react";
import { typesActivity } from "../types/types-user";

export function changeActivity(
  // Primer Parametro
  { id_user, activity }: { id_user?: string; activity?: typesActivity },

  // Segundo parametro
  setLoad: Dispatch<SetStateAction<boolean>>,

  // Tercer Parametro
  setEditOn: Dispatch<SetStateAction<boolean>>,

  // Cuarto Parametro
  getDataAgain: () => void

  //Quiento Parametro
) {
  (async function () {
    setLoad(true);
    try {
      const { data } = await axios.put(`${url}/user/change-activity`, {
        id_user,
        id_activity: activity?.id,
      });

      getDataAgain();
      Swal.fire({
        position: "bottom-end",
        background: "green",
        color: "white",
        text: "Actividad cambiada con éxito!",
        title: false,
        showConfirmButton: false,
        timer: 2500,
        backdrop: false,
      });
      setEditOn(false);
      setLoad(false);

      console.log("esto llega del patch", data);
      return data;
    } catch (err) {
      console.log(err);
      Swal.fire({
        background: "red",
        position: "bottom-end",
        color: "white",
        title: `Error inesperado`,
        showConfirmButton: false,
        backdrop: false,
        text: `Consulte con el desarrollador (detalles en consola)`,
      });
      setEditOn(false);
      setLoad(false);
    }
  })();
}
