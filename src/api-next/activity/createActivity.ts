import Swal from "sweetalert2";
import Activity from "../../mongoose/models/Activity";

export async function createActivity({
  nameActivity,
  modality,
  price,
  color,
}: any) {
  try {
    const activity = new Activity({
      nameActivity: nameActivity.trim().toLowerCase(),
      modality: modality.trim().toLowerCase(),
      price,
      color,
    });
    await activity.save();
    Swal.fire({
      // background: "#202020",
      color: "black",
      icon: "success",
      title: "Actividad creada",
      text: `Se a creado la actividad ${nameActivity} ${modality}`,
    });
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
