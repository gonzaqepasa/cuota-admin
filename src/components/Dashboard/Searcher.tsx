"use client";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { ButtonAdd } from "../AddUser/ButtonAdd/ButtomAdd";
import { AddUserForm } from "../AddUser/Form/AddUserForm";
const Searcher = () => {
  const params = useSearchParams();
  const path = usePathname();
  const route = useRouter();
  const search = params.get("search");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    route.replace(`${path}?search=${e.target.value}`);
  };
  return (
    <div className="w-screen flex items-center  bg-primary-100 gap-1 left-0 py-2 px-6 sm:px-8">
      <Input
        id="inputsearch"
        className="text-content1-100"
        // isClearable
        // onClear={() => route.push(`${path}?search=`)}
        // startContent={<CgSearch className=" " />}
        autoComplete="false"
        label="Buscar usuario"
        onChange={handleChange}
        defaultValue={search || ""}
        radius="lg"
        color="primary"
        variant="underlined"
      />
      <div>
        <ButtonAdd />
      </div>
    </div>
  );
};

export default Searcher;
