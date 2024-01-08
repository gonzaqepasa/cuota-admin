import Link from "next/link";
import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {
  typesActivity,
  typesBusiness,
  typesMonthNames,
  typesUser,
} from "../../types/types-user";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { visibilityUser } from "../../logic/visibilityUser";
import { orderByActive } from "../../logic/orderByMonthName";

import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { SearcherList } from "./Searcher/SearcherList";
import { FilterList } from "./Filter/FilterList";
import { arrayMonth, dateMonth, mesActual } from "../../config/moths";
import LazyLoad from "react-lazy-load";
import { MsgDeptor } from "./MsgDeptor/MsgDeptor";
import { Title } from "./Title/Title";
import { ButtonAdd } from "../AddUser/ButtonAdd/ButtomAdd";
import { AddUserForm } from "../AddUser/Form/AddUserForm";
import { getActivityFromApi } from "../../logic/getActivity";

interface Props {
  activity: string | String[] | undefined;
  businessData?: typesBusiness;
  getDataAgain: () => void;
  setLoad: Dispatch<SetStateAction<boolean>>;
  modalAdd: boolean;
  dataActivity?: typesActivity;
  setModalAdd: Dispatch<SetStateAction<boolean>>;
}

export const RenderList: React.FC<Props> = ({
  businessData,
  getDataAgain,
  setLoad,
  modalAdd,
  dataActivity,
  setModalAdd,
  activity,
}) => {
  //////// ESTADOS ////////
  // Para el buscador (Searcher)
  const [search, setSearch] = useState("");
  // Para el select de meses (FilterList)
  const [monthSelected, setMonthSelected] = useState<typesMonthNames>(
    arrayMonth[dateMonth]
  );
  // Para el resultado de la busqueda
  const [result, setResult] = useState<[] | typesUser[]>([]);
  const [resultFilter, setResultFilter] = useState(result);
  /////////////////////////

  useEffect(() => {
    (async () => {
      const data = await getActivityFromApi(String(dataActivity?._id));
      setResult(data.users);
      console.log("esto es la data ", data);
    })();
  }, [activity, dataActivity]);

  useEffect(() => {
    if (dataActivity?.users) {
      if (!search) {
        setResult(dataActivity.users);
      } else {
        setResult(
          dataActivity.users.filter((el) =>
            String(el.name).toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }
  }, [search, dataActivity?.users]);

  if (dataActivity?.users.length === 0)
    return (
      <div className={"flex flex-col min-h-screen w-screen items-center"}>
        <div className="flex flex-col items-center backg-card-user my-3 px-6 max-w-196 w-screen rounded ">
          <h3 className="text-neutral-300 my-4 text-lg">
            No hay usuarios agregados
          </h3>
          {dataActivity && (
            <AddUserForm
              dataActivity={businessData?.activities.filter(
                (a) => a.name === dataActivity.name
              )}
              // modalityOptions={modalityOptions} // Opciones para elegir a la hora de hacer el add -> es un array
              // activity={activityMain} // Es un objecto que va a ir en el modelo User.activity
              // setActivity={setactivityMain} //  Es para modificar el objecto que va a ir cuando se cree el usuario
              setModalAdd={setModalAdd} // Para cerrar la ventana cuando el usuario se cree
              // getDataAgain={getDataAgain} // Cuando el usuario se cree vuelve a llamar a la bd
            />
          )}
        </div>
      </div>
    );
  return (
    <div className={` flex flex-col min-h-screen w-screen items-center`}>
      <div className="flex flex-col items-center backg-card-user  px-6 max-w-196 w-screen rounded ">
        <FilterList
          monthSelected={monthSelected}
          setMonthSelected={setMonthSelected}
          setResultFilter={setResultFilter}
          result={result}
          search={search}
        />

        <SearcherList search={search} setSearch={setSearch} />
      </div>
      <div className="flex flex-col items-center backg-card-user my-3 px-6 max-w-196 w-screen rounded ">
        {dataActivity && (
          <ButtonAdd
            setModalAdd={setModalAdd}
            color={String(activity)}
            modalAdd={modalAdd}
          />
        )}
        {dataActivity && modalAdd && (
          <AddUserForm
            dataActivity={businessData?.activities.filter(
              (a) => a.name === dataActivity.name
            )}
            // modalityOptions={modalityOptions} // Opciones para elegir a la hora de hacer el add -> es un array
            // activity={activityMain} // Es un objecto que va a ir en el modelo User.activity
            // setActivity={setactivityMain} //  Es para modificar el objecto que va a ir cuando se cree el usuario
            setModalAdd={setModalAdd} // Para cerrar la ventana cuando el usuario se cree
            // getDataAgain={getDataAgain} // Cuando el usuario se cree vuelve a llamar a la bd
          />
        )}
      </div>
      <div
        className={`scroll flex flex-col items-start backg-card-user w-11/12 max-w-196 overflow-y-auto h-96  p-1 rounded`}
      >
        <p className="rounded-full flex items-center justify-center  text-sm text-neutral-900 mb-2 px-2">
          {resultFilter.length}
        </p>
        {resultFilter.map((el: typesUser, index) => (
          <LazyLoad
            className="w-full"
            key={el._id}
            onContentVisible={() => {
              console.log("loaded user!");
            }}
            height={42}
            // width={600}
            threshold={0.6}
          >
            <div
              key={el._id}
              className={`flex items-center rounded relative animate-one
               ${(index - 1) % 2 && "bg-cyan-900 bg-opacity-20"}   ${
                el.status !== "activo" && "opacity-30"
              } hover:bg-cyan-900`}
              /* style={{
                borderBottom: `1px solid ${selectColor(
                  userData[0].activity.nameActivity
                  )}`,
                }} */
            >
              <Link
                className="flex items-center pl-2 w-full py-2  text-neutral-300"
                href={`/user/${el._id}`}
              >
                <FaUserCheck size={15} className="mx-1" />
                {firstLetterUpper(el.name)} -{" "}
                <i className="mx-1 text-neutral-500  text-sm">
                  {
                    businessData?.activities.find(
                      (a) => a._id === String(el.activity)
                    )?.modality
                  }
                </i>
                <MsgDeptor user={el} month={monthSelected} />
              </Link>
              <div className={`absolute right-2 flex items-center`}>
                {/* <button
                  onClick={(e) => {
                    visibilityUser(
                      e,
                      { id: Number(el.id), active: el.status },
                      getDataAgain,
                      setLoad
                    );
                  }}
                >
                  {el.status === "activo" ? (
                    <MdOutlineVisibility size={20} color="white" />
                  ) : (
                    <MdOutlineVisibilityOff size={20} color="grey" />
                  )}
                </button> */}
              </div>
            </div>
          </LazyLoad>
        ))}
      </div>
    </div>
  );
};
