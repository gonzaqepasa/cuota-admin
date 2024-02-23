import Swal from "sweetalert2";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesMonth, typesUser } from "../../types/types-user";
import { auth } from "../../../firebase/firebaseConfig";
import { payMonthService } from "../../../services/month.service";
import User from "../../mongoose/models/User";
import Month from "../../mongoose/models/Month";
import Activity from "../../mongoose/models/Activity";

interface typesToPay {
  monthName: string;
  userData: typesUser;
  method: "MP" | "EF";
}

export async function payMonth({ monthName, userData, method }: typesToPay) {
  const fecha = new Date();
  try {
    const newPayment = new Month({
      method,
      monthName: monthName.trim().toLowerCase(),
      description: "",
      trainer: String(auth.currentUser?.email),
      pricePay: userData.activity.price,
      user: userData._id,
      activity: userData.activity._id,
      paymentDate: fecha.toISOString(),
      isPay: true,
    });

    await newPayment.save();
    // Actualizar la referencia en la colección User
    await User.findByIdAndUpdate(userData._id, {
      $push: { months: newPayment._id }, // Asumiendo que months es el array de meses en User
    });

    // Actualizar la referencia en la colección Activity
    await Activity.findByIdAndUpdate(userData.activity._id, {
      $push: { months: newPayment._id }, // Asumiendo que months es el array de meses en Activity
    });
    
    Swal.fire({
      background: "#f2f2f2",
      color: "black",
      icon: "success",
      confirmButtonColor: "#005eff",
      title: `Pago aceptado!`,
      text: `${firstLetterUpper(userData.name)} pago el mes de ${monthName}`,
    });
    return newPayment as typesMonth;
  } catch (e) {
    console.log(e);
    Swal.fire({
      background: "#202020",
      color: "white",
      icon: "error",
      title: `Error inesperado`,
      text: `Consulte con el desarrollador (detalles en consola)`,
    });
  }
}
