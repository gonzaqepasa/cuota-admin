"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import Navbar from "../../src/components/Navbar/Navbar";
import LoginForm from "../../src/components/LoginForm/LoginForm";
import Loading from "./loading";

const ProviderAuth = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<string | undefined>(undefined);
  const [load, setLoad] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      setAuthUser(uid);
      setLoad(false);
    } else {
      // User is signed out
      // ...
      setAuthUser(undefined);
      setLoad(false);
    }
  });
  function render() {
    return authUser ? (
      <>
        <Navbar auth={auth} />
        {children}
      </>
    ) : (
      <LoginForm />
    );
  }
  if (load) return <Loading />;
  return <>{render()}</>;
};

export default ProviderAuth;
