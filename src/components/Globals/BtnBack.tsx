"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
interface Params {
  url: string;
}

const BtnBack = ({ url }: Params) => {
  const router = useRouter();
  return (
    <>
      <Button
        color="primary"
        variant="light"
        className="min-w-0 mx-1 text-xl"
        onPress={() => router.push(url)}
      >
        <IoMdArrowRoundBack />
      </Button>
    </>
  );
};

export default BtnBack;
