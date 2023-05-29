import { FormEvent, MouseEvent, useState } from "react";
import { loginUser } from "../../../firebase/auth/loginUser";
import Loading from "../Loading/Loading";

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
    <div
      className={`flex backg-1 items-center justify-center min-h-screen   w-full`}
    >
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className={`space-y-6`} onSubmit={(e) => handleSubmit(e)}>
          <div className={``}>
            <label
              className={`block text-sm font-medium leading-6 text-gray-200`}
              htmlFor="email"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                required
                className={`block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                placeholder="Ingrese Email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
          </div>
          <div className={` `}>
            <label
              htmlFor="pass"
              className={`block text-sm font-medium leading-6 text-gray-200`}
            >
              Contraseña
            </label>
            <div className="mt-2">
              <input
                required
                className={`block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                placeholder="Ingrese contraseña..."
                id="pass"
                name="pass"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
              />
            </div>
          </div>
          <div
            className={`flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            <button className="w-full h-full">Iniciar sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
}
