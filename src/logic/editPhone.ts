import axios from "axios";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { url } from "../config/env_d";
import { Dispatch, SetStateAction } from "react";
import { typesEditName } from "../types/types-user";

export function editPhoneLogic(
  // Primer Parametro
  { id, phone }: any,

  // Segundo parametro
  getDataAgain: () => void,

  // Tercer Parametro
  setEditOn: Dispatch<SetStateAction<boolean>>,

  // Cuarto Parametro
  setLoad: Dispatch<SetStateAction<boolean>>,

  //Quiento Parametro
  setPhone: Dispatch<SetStateAction<string>>
) {
  (async function () {
    setLoad(true);
    try {
      const { data } = await axios.put(`${url}/user/edit-phone`, {
        id,
        phone,
      });

      // Swal.fire({
      //   background: "#090202",
      //   color: "white",
      //   icon: "success",
      //   title: "Descripción cambiada!",
      //   text: "Descripción cambiada con éxito!",
      // });
      getDataAgain();
      setEditOn(false);
      setLoad(false);
      setPhone(data.phone);
      console.log("esto llega del patch", data);
      // getUserAgain()
    } catch (err) {
      console.log(err);
      Swal.fire({
        background: "#202020",
        color: "white",
        icon: "error",
        title: `Error inesperado`,
        text: `Consulte con el desarrollador (detalles en consola)`,
      });
      setEditOn(false);
      setLoad(false);
    }
  })();
}
