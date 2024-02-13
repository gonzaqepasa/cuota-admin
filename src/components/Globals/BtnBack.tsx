"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

const BtnBack = () => {
  const router = useRouter();
  return (
    <>
      <Button
        color="primary"
        variant="light"
        className="min-w-0 text-xl"
        onPress={() => router.back()}
      >
        <IoMdArrowRoundBack />
      </Button>
    </>
  );
};

export default BtnBack;
