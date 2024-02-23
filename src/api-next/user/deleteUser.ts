import Swal from "sweetalert2";
import { deleteUser } from "../../../services/user.service";
import User from "../../mongoose/models/User";
import Activity from "../../mongoose/models/Activity";

interface Params {
  userId: string;
  cb: () => void;
}
export async function deleteUserLogic({ userId, cb }: Params) {
  try {
    // Buscar al usuario por ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("No se encontro un usuario con esa id");
    }

    // Obtener el ID de la actividad actual del usuario
    const currentActivityId = user.activity;

    // Si el usuario está asociado a una actividad, quitarlo de la lista de usuarios de esa actividad
    if (currentActivityId) {
      await User.updateOne(
        { _id: userId },
        { $unset: { activity: 1 } } // Eliminar la referencia a la actividad actual
      );

      await Activity.updateOne(
        { _id: currentActivityId },
        { $pull: { users: userId } } // Quitar al usuario de la lista de usuarios de la actividad
      );
    }

    // Eliminar al usuario
    await User.findByIdAndDelete(userId);

    Swal.fire({
      position: "bottom-end",
      background: "grey",
      color: "white",
      text: "Usuario eliminado con exito",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
    cb();
    return { success: "Usuario eliminado exitosamente" };
  } catch (err) {
    console.log(err);

    Swal.fire({
      position: "bottom-end",
      background: "red",
      color: "white",
      text: "Hubo un error, consulte con el desarrollador",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
  }
}
