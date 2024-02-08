"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  typesActivity,
  typesMonthNames,
  typesUser,
} from "../../types/types-user";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Avatar,
} from "@nextui-org/react";
import { orderByActive } from "../../logic/orderByMonthName";
import { selectColor } from "../../logic/selectColor";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { SearcherList } from "./Searcher/SearcherList";
import { FilterList } from "./Filter/FilterList";
import { arrayMonth, dateMonth } from "../../config/moths.d";
import LazyLoad from "react-lazy-load";
import { MsgDeptor } from "./MsgDeptor/MsgDeptor";
import { Title } from "../Title/Title";

interface Props {
  activity: string | String[];
  userData: typesUser[];
  dataActivity: typesActivity[];
}

export const RenderList: React.FC<Props> = ({
  userData,
  dataActivity,
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
    if (userData) {
      if (!search) {
        setResult(userData);
      } else {
        setResult(
          userData.filter((el) =>
            String(el.name).toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }
  }, [search, userData]);

  if (userData.length === 0)
    return (
      <div className={"flex flex-col min-h-screen w-screen items-center"}>
        <div className="flex flex-col items-center backg-card-user my-3 px-6 max-w-196 w-screen rounded ">
          <h3 className="text-neutral-300 my-4 text-lg">
            No hay usuarios agregados
          </h3>
          {/* {dataActivity && (
            <AddUserForm
              dataActivity={dataActivity}
              // modalityOptions={modalityOptions} // Opciones para elegir a la hora de hacer el add -> es un array
              // activity={activityMain} // Es un objecto que va a ir en el modelo User.activity
              // setActivity={setactivityMain} //  Es para modificar el objecto que va a ir cuando se cree el usuario
            />
          )} */}
        </div>
      </div>
    );
  return (
    <div className={` flex flex-col gap-3 min-h-screen w-screen items-center`}>
      <div className="flex flex-col items-center backg-card-user  px-6 max-w-3xl w-screen rounded ">
        <FilterList
          monthSelected={monthSelected}
          setMonthSelected={setMonthSelected}
          setResultFilter={setResultFilter}
          result={result}
          search={search}
        />

        <SearcherList search={search} setSearch={setSearch} />
      </div>

      <Table
        color="secondary"
        shadow="md"
        className={`scroll max-w-3xl flex flex-col items-start backg-card-user w-11/12 max-w-196 overflow-y-auto h-96  p-1 rounded`}
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn width={10}>OPCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {orderByActive(resultFilter).map((el: typesUser, index) => (
            <TableRow key={el.id}>
              <TableCell className="flex items-center">
                <Avatar
                  style={{
                    backgroundColor: selectColor(el.activity.nameActivity),
                  }}
                  className="text-white mr-2"
                  size="sm"
                  name={firstLetterUpper(el.name)[0]}
                />
                {firstLetterUpper(el.name)} -{" "}
                <i
                  className="mx-1  text-sm"
                  style={{ color: selectColor(el.activity.nameActivity) }}
                >
                  {el.activity.modality}
                </i>
              </TableCell>
              <TableCell className="w-10">
                <MsgDeptor user={el} month={monthSelected} />
              </TableCell>
              <TableCell className="flex justify-end ">
                <div>1</div>
                <div>2</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// <div
//                key={el.id}
//              className={`flex items-center rounded relative animate-one
//          ${(index - 1) % 2 && "bg-cyan-900 bg-opacity-20"}   ${
//            !el.active && "opacity-30"
//        } hover:bg-cyan-900`}
//      /* style={{
//    borderBottom: `1px solid ${selectColor(
//    userData[0].activity.nameActivity
//  )}`,
//           }} */
//       >
//       <Link
//       className="flex items-center pl-2 w-full py-2  text-neutral-300"
//     href={`/user/${el.id}`}
// >
//             <FaUserCheck
//              size={15}
//             className="mx-1"
//            color={selectColor(userData[0].activity.nameActivity)}
//         />
//        {firstLetterUpper(el.name)} -{" "}
//       <i
//        className="mx-1  text-sm"
//       style={{ color: selectColor(el.activity.nameActivity) }}
//    >
//     {el.activity.modality}
//  </i>
// <MsgDeptor user={el} month={monthSelected} />
//                 </Link>
//                <div className={`absolute right-2 flex items-center`}>
//                 <button
//                // onClick={(e) => {
//               //   visibilityUser(e, { id: Number(el.id), active: el.active });
//              // }}
//             >
//              {el.active ? (
//               <MdOutlineVisibility size={20} color="white" />
//            ) : (
//             <MdOutlineVisibilityOff size={20} color="grey" />
//          )}
//       </button>
//    </div>
// </div>
