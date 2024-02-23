import Swal from "sweetalert2";
import { typesActivity } from "../../types/types-user";
import { changeActivityService } from "../../../services/user.service";
import User from "../../mongoose/models/User";

export async function changeActivity(
  // Primer Parametro
  {
    userId,
    activity,
    onClose,
  }: { userId: string; activity: typesActivity; onClose: () => void }
) {
  try {
    // Verificar si se proporcionó un ID válido
    if (!userId || !activity._id) {
      return { error: "Se requieren ID de usuario y actividad válidos" };
    }

    // Buscar el usuario por ID y obtener la actividad actual
    const user = await User.findById(userId).populate("activity");

    if (!user) {
      return { error: "No se encontró el usuario" };
    }

    const currentActivity = user.activity;

    // Verificar si el usuario ya pertenece a la nueva actividad
    if (currentActivity && currentActivity._id.equals(activity._id)) {
      return { error: "El usuario ya pertenece a la nueva actividad" };
    }

    // Paso 1: Eliminar al usuario de la actividad actual
    if (currentActivity) {
      currentActivity.users.pull(userId);
      await currentActivity.save();
    }

    // Paso 2: Agregar al usuario a la nueva actividad
    const newActivity = await User.findByIdAndUpdate(
      userId,
      { activity: activity._id },
      { new: true }
    );

    // Verificar si la nueva actividad fue encontrada y actualizada
    if (!newActivity) {
      return {
        error: "No se encontró la nueva actividad o no se pudo actualizar",
      };
    }

    // Actualizar la lista de usuarios de la nueva actividad
    await User.findByIdAndUpdate(activity._id, {
      $addToSet: { users: userId },
    });

    onClose && onClose();

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

    return newActivity;
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
  }
}
