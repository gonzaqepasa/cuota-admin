import Swal from "sweetalert2";
import { typesActivity } from "../../types/types-user";
import { numberToMoney } from "../../logic/numberToMoney";
import { editActivity } from "../../../services/activity.service";
import Activity from "../../mongoose/models/Activity";

export async function updatePrice({
  _id,
  nameActivity,
  modality,
  price,
}: typesActivity) {
  try {
    // Verificar si se proporcionó un ID válido
    if (!_id) {
      return { error: "Se requiere un ID de actividad válido" };
    }

    // Crear un objeto con las propiedades actualizadas
    const updatedFields: { [key: string]: any } = {};
    if (price) {
      updatedFields.price = price;
    }

    // Actualizar la actividad con las propiedades proporcionadas
    const editedActivity = await Activity.findByIdAndUpdate(
      _id,
      updatedFields,
      { new: true }
    );

    // Verificar si la actividad fue encontrada y actualizada
    if (!editedActivity) {
      return { error: "No se encontró la actividad o no se pudo actualizar" };
    }
    Swal.fire({
      // background: "#202020",
      color: "black",
      icon: "success",
      title: "Precio cambiado",
      text: `El nuevo precio para ${nameActivity} - ${modality} es ${numberToMoney(
        price
      )}`,
    });
    console.log("esto llega del patch", editedActivity);
    return editedActivity as typesActivity;

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
  }
}
