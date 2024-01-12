import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import User from "../../../src/components/UserComponent/User";
import { url } from "../../../src/config/env_d";
import Loading from "../../../src/components/Loading/Loading";


export default function UserData() {
  const route = useRouter();
  // console.log(route.query.id);
  // console.log(props.data);

  const [data, setData] = useState(false);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState({ msg: "" });
  ////////// useEffect //////////
  useEffect(() => {
    (async function () {
      try {
        setLoad(true);
        const resUser = await fetch(`${url}/user/user?USER=${route.query.id}`);
        const dataUser = await resUser.json();

        // console.log(dataUser);
        (await dataUser.length) === 0 &&
          setError({ msg: "No hay gente en la bd" });
        setData(dataUser);
        setLoad(false);
        // const dataAct = await resAct.json();
      } catch (err) {
        setLoad(false);
        setError({ msg: "Problemas con la bd" });
        console.log(err);
      }
    })();
  }, [route.query.id]);

  //////////////////////////////
  if (load)
    return (
      <main className="main">
        <Loading />;
      </main>
    );
  if (error.msg) {
    return <div className={`main backg-1`}>{error.msg}</div>;
  }
  if (typeof data !== "boolean")
    return (
      <div className={`main backg-1`}>
        <User userData={data} id={String(route.query.id)} />
      </div>
    );
}
