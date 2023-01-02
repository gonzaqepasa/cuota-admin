import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";

type typeMont = {
  addAdmin?: string;
  isPay: boolean;
  addData?: string;
  monthName: string;
  comment?: string;
};

export async function editTurno(
  id: string,
  mes: string,
  installments: typeMont[],
  setData: any,
  addAdmin: string | undefined | null
) {
  try {
    const fecha = new Date();
    const fechaToSend = `${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()} Hs`;
    const userRef = doc(db, "User", id);
    const dataToSend = installments.map((el) => {
      if (el.monthName === mes) {
        return {
          addAdmin,
          isPay: true,
          addData: fechaToSend,
          monthName: mes,
          comment: "",
        };
      } else {
        return el;
      }
    });

    console.log("esto es installments", installments);
    console.log("esto es aux", dataToSend);
    await updateDoc(userRef, {
      installments: {
        2023: dataToSend,
      },
    });
    await Swal.fire({
      background: "#090202",
      color: "white",
      title: "Pago Agregado!",
      text: `pago el mes de ${mes}`,
      icon: "success",
    });
    await setData(dataToSend);
  } catch (err) {
    console.log(err);
    await Swal.fire({
      background: "#090202",
      color: "white",
      title: "Hubo un problema",
      text: 'Leer la consola',
      icon: "success",
    });
  }
}
