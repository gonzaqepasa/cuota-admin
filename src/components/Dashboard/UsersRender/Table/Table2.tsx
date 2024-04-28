"use client";
import { useEffect, useState } from "react";
import { typesActivity, typesUser } from "../../../../types/types-user";
import { Avatar, Pagination } from "@nextui-org/react";
import PaymentCol from "./PaymentCol";
import { BtnAddPay } from "../../../Payments/BtnAddPay/BtnAddPay";
import ButtonSendWpp from "../../../UserComponent/InformationPanel/PhoneUser/ButtonSendWpp";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import { isUserWithinPaymentMonth } from "./logicPayment";
import { getByLastPay } from "../../../Payments/BtnAddPay/logicPayments";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { orderByUpdate } from "../../../../logic/orderByMonthName";

interface Props {
  users: typesUser[];
  activities: typesActivity[];
}

// Función para dividir el array de usuarios en páginas
const paginateUsers = (
  users: typesUser[],
  currentPage: number,
  pageSize: number
) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return users.slice(startIndex, endIndex);
};

const Table2: React.FC<Props> = ({ activities, users }) => {
  const [filterUsers, setFilterUsers] = useState<typesUser[]>(users);
  const [paginatedUsers, setPaginatedUser] = useState<typesUser[]>([]);
  const params = useSearchParams();
  const search = params.get("search");

  // Tamaño de la página
  const pageSize = 10; // Puedes ajustar este valor según tus necesidades

  // Estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Función para cambiar de página
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  //////// Obtener los usuarios de la página actual ////////
  useEffect(() => {
    setPaginatedUser(
      paginateUsers(orderByUpdate(filterUsers), currentPage, pageSize)
    );
  }, [currentPage, filterUsers]);

  ////////////////////////////////////////////////////////

  useEffect(() => {
    const searchKeywords = search?.toLowerCase().split(" ") || [""];

    setFilterUsers(
      users.filter((el) =>
        searchKeywords?.every((keyword) =>
          String(el.name).toLowerCase().includes(keyword)
        )
      )
    );
  }, [search, users]);
  return (
    <div className=" flex flex-col w-screen bg-primary-300 rounded-large items-center gap-4 ">
      <ol className="min-h-[50vh] w-screen  overflow-x-auto">
        {paginatedUsers.map((user: typesUser, index: number) => (
          <li
            key={index}
            className={` w-max lg:w-full   px-4 grid grid-cols-[min(20rem)_minmax(27rem,1fr)_min(12rem)] items-center py-1 ${
              index % 2 === 0 && "bg-gray-500/20"
            }`}
          >
            <Link
              className="flex w-max items-center hover:translate-x-1   transition "
              href={"/user/" + user._id}
            >
              <Avatar
                className={` mr-1 ${
                  isUserWithinPaymentMonth(getByLastPay(user)?.createdAt)
                    ? "bg-green-600 shadow-green-900 shadow-inner "
                    : "bg-primary-100"
                } `}
                size="sm"
                name={firstLetterUpper(user.name)}
              />
              <p className="text-content1-200 w-max ">
                {firstLetterUpper(user.name)}
              </p>
            </Link>
            <div className="min-w-unit-10 ">
              <PaymentCol activities={activities} user={user} />
            </div>
            <div className="flex items-center justify-end gap-1 pr-4">
              <ButtonSendWpp user={user} />
              <BtnAddPay
                userData={user}
                activities={activities}
                size="sm"
                variant="faded"
                content="Iniciar pago"
                color="success"
              />
              {/* <ButtonDeleteUser userData={user} /> */}
            </div>
          </li> // Ajusta user.name según la estructura de tus datos de usuario
        ))}
      </ol>
      <Pagination
        showControls
        variant="faded"
        showShadow
        total={Math.ceil(filterUsers.length / pageSize)}
        onChange={onPageChange}
      />
    </div>
  );
};

export default Table2;
