import { signInWithEmailAndPassword } from "firebase/auth";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import Swal from "sweetalert2";
import { validateLogin } from "../../src/components/LoginForm/logic/validateLoginInput";
import { auth } from "../firebaseConfig";

export function loginUser(
  // e: MouseEvent<HTMLButtonElement>,
  email: string,
  password: string,
  setLoad: Dispatch<SetStateAction<boolean>> 
) {
  // e.preventDefault();
  console.log(email, password);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      setLoad(false);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoad(false);

      Swal.fire({
        background: "#202020",
        color: "white",
        title: errorCode,
        icon: "error",
      });
    });
}
