"use client";
import { useEffect, useState } from "react";
import { typesActivity, typesUser } from "../../../../types/types-user";
import { Avatar, Button, Pagination } from "@nextui-org/react";
import PaymentCol from "./PaymentCol";
import { BtnAddPay } from "../../../Payments/BtnAddPay/BtnAddPay";
import ButtonSendWpp from "../../../UserComponent/InformationPanel/PhoneUser/ButtonSendWpp";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import { isUserWithinPaymentMonth } from "./logicPayment";
import { getByLastPay } from "../../../Payments/BtnAddPay/logicPayments";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { orderByUpdate } from "../../../../logic/orderByMonthName";
import { typesPageWithUsers } from "../../../../types/types-pages";
import { getUsersForPageClient } from "../../../../api-next/user/getUser";
import Loading from "../../../../app/loading";
import { CgArrowBottomRight, CgArrowLongRight } from "react-icons/cg";

interface Props {
  // users: typesPageWithUsers;
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

const Table2: React.FC<Props> = ({ activities }) => {
  const [pageMain, setPageMain] = useState<typesPageWithUsers>();
  const [filterUsers, setFilterUsers] = useState<typesUser[]>();
  // Estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const [load, setLoad] = useState(false);
  //////
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const params = useSearchParams();
  const search = params.get("search");

  useEffect(() => {
    !load && setLoad(true);
    console.log(!load);
    setSearchTerm(search || "");
    currentPage !== 1 && setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    setLoad(true);
    getUsersForPageClient({
      page: Number(currentPage),
      search: debouncedSearchTerm,
    })
      .then((r) => {
        setPageMain(r);
        setFilterUsers(r.users);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setLoad(false);
      });
  }, [currentPage, debouncedSearchTerm]);
  // Función para cambiar de página
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className=" flex flex-col w-screen rounded-large items-center gap-4 ">
      {load ? (
        <>
          <div>
            <Loading />
          </div>
        </>
      ) : (
        <ol className="min-h-[50vh] w-screen  overflow-x-auto">
          {filterUsers?.map((user: typesUser, index: number) => (
            <li
              key={index}
              className={` w-max lg:w-full h-11  px-4 grid grid-cols-[min(20rem)_minmax(27rem,1fr)_min(12rem)] items-center py-1 ${
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
                <Button size="sm" variant="faded" color="success">
                  <Link
                    href={`user/${user._id}`}
                    className="flex items-center gap-1  group "
                  >
                    <CgArrowLongRight
                      size={18}
                      className="-translate-x-1 group-hover:translate-x-0 transition-transform"
                    />
                    <p>Ir a pagar</p>
                  </Link>
                </Button>
                {/* <ButtonDeleteUser userData={user} /> */}
              </div>
            </li> // Ajusta user.name según la estructura de tus datos de usuario
          ))}
        </ol>
      )}
      <Pagination
        showControls
        variant="faded"
        showShadow
        page={currentPage}
        total={Math.ceil(pageMain?.totalPages || 1)}
        onChange={onPageChange}
      />
    </div>
  );
};

export default Table2;
