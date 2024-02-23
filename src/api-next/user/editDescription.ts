import Swal from "sweetalert2";
import { typesHanldeEditUser } from "../../components/UserComponent/InformationPanel/ModalEditUser";
import { updateUser } from "../../../services/user.service";

export async function editDescription({
  id,
  newVal,
  onClose,
}: typesHanldeEditUser) {
  try {
    await updateUser({ description: newVal, userId: id });
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
