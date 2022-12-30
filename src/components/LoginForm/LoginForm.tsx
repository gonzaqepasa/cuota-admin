import { FormEvent, MouseEvent, useState } from "react";
import { loginUser } from "../../../firebase/auth/loginUser";
import Loading from "../Loading/Loading";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [load, setLoad] = useState(false);

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoad(true);
    loginUser(email, pass, setLoad);
  }

  if (load) return <Loading />;
  return (
    <div className={`${styles.allLoginForm}`}>
      <div>
        <div className={`${styles.inputContainer}`}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className={`${styles.inputContainer}`}>
          <label htmlFor="pass">Contraseña</label>
          <input
            id="pass"
            name="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
          />
        </div>
        <div>
          <button onClick={(e) => handleSubmit(e)}>Iniciar sesión</button>
        </div>
      </div>
    </div>
  );
}
