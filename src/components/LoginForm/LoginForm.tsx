import { FormEvent, MouseEvent, useState } from "react";
import { loginUser } from "../../../firebase/auth/loginUser";
import Loading from "../Loading/Loading";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [load, setLoad] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoad(true);
    loginUser(email, pass, setLoad);
  }

  if (load)
    return (
      <div className="loadContainer">
        <Loading />;
      </div>
    );
  return (
    <div className={`${styles.allLoginForm}`}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`${styles.inputContainer}`}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Ingrese Email"
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
            placeholder="Ingrese contraseña..."
            id="pass"
            name="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
          />
        </div>
        <div className={styles.btnLogin}>
          <button>Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
}
