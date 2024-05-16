import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import igIcon from "../../styles/icons/ig.svg";
import wppIcon from "../../styles/icons/wpp.svg";

const SocialIcons = () => {
  return (
    <>
      <div className={`bg-image-center mt-10 w-screen py-6`}>
        <div className="flex flex-col justify-center items-center py-16 gap-2 bg-neutral-900/90">
          <div>
            <h2 className="text-neutral-400">
              Recorda cambiar tu rutina cada tres semanas
            </h2>
          </div>
          <div>
            <Button variant="light" color="success">
              <Link href={``} className="flex items-center gap-1">
                <h3 className="text-lg">Escribínos al WhatsApp</h3>
                <Image src={wppIcon} alt="" height={30} />
              </Link>
            </Button>
          </div>
          <div className="text-neutral-200">
            <Button variant="light" color="secondary">
              <Link href={``} className="flex items-center gap-1">
                <h3 className="text-xl">Seguínos en Instagram!</h3>
                <Image src={igIcon} alt="" height={36} />
              </Link>
            </Button>
          </div>
          {/* <Button>
            <Link href={``}></Link>
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default SocialIcons;
