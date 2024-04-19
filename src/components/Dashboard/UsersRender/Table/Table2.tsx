"use client";
import { useEffect, useState } from "react";
import { typesActivity, typesUser } from "../../../../types/types-user";
import { Avatar, Pagination } from "@nextui-org/react";
import PaymentCol from "./PaymentCol";
import { BtnAddPay } from "../../../Payments/BtnAddPay/BtnAddPay";
import ButtonSendWpp from "../../../UserComponent/InformationPanel/PhoneUser/ButtonSendWpp";
import ButtonDeleteUser from "../../../UserComponent/Config/ButtonDeleteUser";
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

  // Obtener los usuarios de la página actual
  const paginatedUsers = paginateUsers(filterUsers, currentPage, pageSize);
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
    <div className=" flex flex-col items-center gap-4 ">
      <ul className="min-h-[50vh] overflow-x-auto">
        {orderByUpdate(paginatedUsers).map((user: typesUser, index: number) => (
          <li
            key={index}
            className={` w-screen px-4 flex gap-10 items-center justify-between ${
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
            <div>
              <PaymentCol activities={activities} user={user} />
            </div>
            <div className="flex items-center gap-1">
              <BtnAddPay
                userData={user}
                size="sm"
                variant="bordered"
                content="Pagar"
                color="success"
              />
              <ButtonSendWpp user={user} />
              <ButtonDeleteUser userData={user} />
            </div>
          </li> // Ajusta user.name según la estructura de tus datos de usuario
        ))}
      </ul>
      <Pagination
        showControls
        variant="faded"
        total={Math.ceil(users.length / pageSize)}
        onChange={onPageChange}
      />
    </div>
  );
};

export default Table2;
