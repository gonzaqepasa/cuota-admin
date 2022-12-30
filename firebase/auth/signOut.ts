import { signOut } from "firebase/auth";
import { MouseEvent } from "react";
import { auth } from "../firebaseConfig";

export function signOutUser(e: MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
