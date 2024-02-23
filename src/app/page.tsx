import { Metadata } from "next";
import Image from "next/image";
import Logo from "../styles/images/fevicon.png";

export const metadata: Metadata = {

};

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
        <Image src={Logo} alt="" height={200} />
        <p className="text-neutral-200">En construcción...</p>
      </main>
    </>
  );
}
