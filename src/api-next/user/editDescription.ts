import Swal from "sweetalert2";
import { typesHanldeEditUser } from "../../components/UserComponent/InformationPanel/ModalEditUser";
import { updateUser } from "../../../services/user.service";
import User from "../../mongoose/models/User";

export async function editDescription({
  id,
  newVal,
  onClose,
}: typesHanldeEditUser) {
  try {
    // Verificar si se proporcionó un ID válido
    if (!id) {
      return { error: "Se requiere un ID de usuario válido" };
    }

    // Crear un objeto con las propiedades actualizadas
    const updatedFields: { [key: string]: any } = {};

    if (newVal) {
      updatedFields.description = newVal.trim();
    }

    // Actualizar el usuario con las propiedades proporcionadas
    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    // Verificar si el usuario fue encontrado y actualizado
    if (!updatedUser) {
      throw new Error("No se encontro el usuario");
    }

    onClose && onClose();
    Swal.fire({
      background: "green",
      color: "white",
      text: "La descripción fue cambiado con éxito.",
      timer: 2000,
      backdrop: false,
      position: "bottom-end",
      showConfirmButton: false,
    });
    return updatedUser;
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "bottom-end",
      background: "red",
      color: "white",
      text: "Hubo un problema, consule con el desarrollador",
      title: false,
      showConfirmButton: false,
      timer: 2500,
      backdrop: false,
    });
  }
}
