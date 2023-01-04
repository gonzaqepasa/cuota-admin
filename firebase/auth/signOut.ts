import { signOut } from "firebase/auth";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { auth } from "../firebaseConfig";

export function signOutUser(e: MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  Swal.fire({
    reverseButtons: true,
    background: "#090202",
    color: "white",
    title: "Cerrar sesión",
    text: `Seguro quieres cerrar la sesión`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    }
  });
}
