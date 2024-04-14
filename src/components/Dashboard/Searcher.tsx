"use client";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { CgSearch } from "react-icons/cg";
const Searcher = () => {
  const params = useSearchParams();
  const path = usePathname();
  const route = useRouter();
  console.log(params.get("search"));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    route.replace(`${path}?search=${e.target.value}`);
  };
  return (
    <div className="w-screen flex items-center fixed bg-primary-100 gap-1 left-0 py-2 px-6 sm:px-8">
      <Input
      id="inputsearch"
        className="text-content1-100"
        label="Buscar usuario"
        onChange={handleChange}
        isClearable
        radius="lg"
        defaultValue={params.get("search") || ""}
        color="primary"
        variant="bordered"
      />
      <label htmlFor="inputsearch" className="text-content1-200 transition-colors hover:text-primary">
        <CgSearch className=" mx-2 " size={40} />
      </label>
    </div>
  );
};

export default Searcher;
