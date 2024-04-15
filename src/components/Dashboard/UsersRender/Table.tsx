"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Avatar,
} from "@nextui-org/react";
import { typesUser } from "../../../types/types-user";
import { useEffect, useState } from "react";
import { getUsers } from "../../../../services/user.service";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface Props {
  users: typesUser[];
}
const TableRenderUser: React.FC<Props> = ({ users }) => {
  const [filterUsers, setFilterUsers] = useState<typesUser[]>(users);
  ////////// LOGICA DE PARAMS //////////
  const params = useSearchParams();
  const path = usePathname();
  const route = useRouter();
  const search = params.get("search");

  useEffect(() => {
    const searchKeywords = search?.toLowerCase().split(" ");
    setFilterUsers(
      users.filter((el) =>
        searchKeywords?.every((keyword) =>
          String(el.name).toLowerCase().includes(keyword)
        )
      )
    );
  }, [search, users]);

  /////// ////////// ////////// ///////
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];
  return (
    <>
      <Table
        isStriped
        aria-label="Example table with dynamic content"
        className="scroll max-w-3xl flex    overflow-y-auto max-h-[500px] "
      >
        <TableHeader columns={columns} className="text-content1-100 ">
          {(column) => (
            <TableColumn className="text-content1-100" key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {filterUsers.map((u) => (
            <TableRow key={u._id} className="text-content1-300  w-max ">
              <TableCell>
                <Link
                  className="flex w-max items-center hover:translate-x-1   transition "
                  href={"/"}
                >
                  <Avatar
                    className="text-white mr-1 bg-primary  "
                    size="sm"
                    name={firstLetterUpper(u.name)}
                  />
                  {firstLetterUpper(u.name)}
                </Link>
              </TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableRenderUser;
