"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  typesActivity,
  typesMonthNames,
  typesUser,
} from "../../types/types-user";
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
import { orderByActive, orderByName } from "../../logic/orderByMonthName";

import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { SearcherList } from "./Searcher/SearcherList";
import { FilterList } from "./Filter/FilterList";
import { arrayMonth, dateMonth } from "../../config/moths.d";
import { MsgDeptor } from "./MsgDeptor/MsgDeptor";
import { ButtonAdd } from "../AddUser/ButtonAdd/ButtomAdd";
import ButtonDeleteUser from "../UserComponent/Config/ButtonDeleteUser";

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
  console.log("Esto es userdata",userData)
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
console.log(dataActivity)
  useEffect(() => {
    if (userData) {
      if (!search) {
        setResult(userData);
      } else {
        const searchKeywords = search.toLowerCase().split(" ");
        setResult(
          userData.filter((el) =>
            searchKeywords.every((keyword) =>
              String(el.name).toLowerCase().includes(keyword)
            )
          )
        );
      }
    }
  }, [search, userData]);

  return (
    <div  className={`bg-neutral-200/90 flex flex-col gap-3 min-h-screen w-screen items-center`}>
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

      <div className="flex flex-col items-end backg-card-user max-w-3xl px-1  w-11/12">
        <ButtonAdd color="green" dataActivity={dataActivity} />
      </div>
      <Table
        color="secondary"
        aria-labelledby="algo"
        shadow="md"
        className={`scroll max-w-3xl flex flex-col items-start  w-11/12  overflow-y-auto h-96   rounded-xl`}
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn width={3}>ESTADO</TableColumn>
          <TableColumn width={10}>OPCIONES</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No hay usuarios para mostrar."} className="">
          {orderByName(orderByActive(resultFilter)).map(
            (el: typesUser, index) => (
              <TableRow key={el._id}>
                <TableCell>
                  <Link
                    className="flex items-center hover:translate-x-1 hover:text-neutral-600 font-medium transition text-neutral-900"
                    href={`/user/${el._id}`}
                  >
                    <Avatar
                      style={{
                        backgroundColor: dataActivity[0].color,
                      }}
                      className="text-white mr-2"
                      size="sm"
                      name={firstLetterUpper(el.name)[0]}
                    />
                    {firstLetterUpper(el.name)}
                    <i
                      className="mx-1  text-sm"
                      style={{ color: dataActivity[0].color }}
                    >
                      {firstLetterUpper(dataActivity[0].modality)}
                    </i>
                  </Link>
                </TableCell>
                <TableCell>
                  <MsgDeptor user={el} month={monthSelected} />
                </TableCell>
                <TableCell className="flex justify-end ">
                  <ButtonDeleteUser userData={el} />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

//
