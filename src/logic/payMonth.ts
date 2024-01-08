import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../config/env_d";
import { firstLetterUpper } from "./firstLetterUpper";
import { typesActivity, typesMonth, typesUser } from "../types/types-user";
import { monthOfPay } from "../config/moths";
import { auth } from "../../firebase/firebaseConfig";
import { Dispatch, SetStateAction } from "react";

interface typesToPay {
  activity: typesActivity;
  user: typesUser;
  getUserAgain: () => void;
  setIsLoad: Dispatch<SetStateAction<boolean>>;
}

export function payMonth({
  activity,
  user,
  getUserAgain,
  setIsLoad,
}: typesToPay) {
  Swal.fire({
    reverseButtons: true,
    background: "#202020",
    color: "white",
    title: "Estas seguro?",
    text: `${firstLetterUpper(user.name)} pago el mes de `,
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
      setIsLoad(true);
      try {
        const { data } = await axios.post(`${url}/api/payment/pay`, {
          method: "Mercado Pago",
          trainer: "Entrenador",
          amount: activity.price,
          user: user._id,
          description: "Descripcion del pago",
          status: "Completed",
          business: user.business,
          activity: user.activity,
        });

        Swal.fire({
          background: "#202020",
          color: "white",
          icon: "success",
          title: `Pago aceptado!`,
          text: `${firstLetterUpper(user.name)} pago el mes de `,
        });
        setIsLoad(false);
        getUserAgain();
        return data;
      } catch (e) {
        console.log(e);
        Swal.fire({
          background: "#202020",
          color: "white",
          icon: "error",
          title: `Error inesperado`,
          text: `Consulte con el desarrollador (detalles en consola)`,
        });
        setIsLoad(false);
        getUserAgain();
      }
    }
  });
}
