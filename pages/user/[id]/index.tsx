import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import User from "../../../src/components/UserComponent/User";
import { ID_BUSINESS, url } from "../../../src/config/env_d";
import Loading from "../../../src/components/Loading/Loading";
import { getUser } from "../../../src/logic/getUser";
import { useAppSelector } from "../../../src/redux/hooks";

export default function UserData() {
  const router = useRouter();
  const { id, idb } = router.query;

  const business = useAppSelector((state) => state.value);

  const [data, setData] = useState(false);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState({ msg: "" });
  ////////// useEffect //////////
  useEffect(() => {
    (async function () {
      try {
        setLoad(true);
        const dataUser = await getUser({
          _id: String(id),
          id_business: ID_BUSINESS,
        });
        // console.log(dataUser);
        // console.log(dataUser);
        dataUser.length === 0 && setError({ msg: "No hay gente en la bd" });
        setData(dataUser);
        setLoad(false);
        // const dataAct = await resAct.json();
      } catch (err) {
        setLoad(false);
        setError({ msg: "Problemas con la bd" });
        console.log(err);
      }
    })();
  }, [id]);

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
        <User
          userData={data}
          id={String(id)}
          id_business={String(business?._id)}
        />
      </div>
    );
}
