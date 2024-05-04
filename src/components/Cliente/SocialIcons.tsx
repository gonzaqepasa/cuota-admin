import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import igIcon from "../../styles/icons/ig.svg";
import wppIcon from "../../styles/icons/wpp.svg";

const SocialIcons = () => {
  return (
    <>
      <div className={`bg-image-center w-screen `}>
        <div className="flex flex-col items-start py-6 gap-5 bg-neutral-900/80">
          <Button variant="light" color="secondary">
            <Link href={``}>
              <Image src={igIcon} alt="" height={36} />
            </Link>
          </Button>
          <Button variant="light" color="success">
            <Link href={``}>
              <Image src={wppIcon} alt="" height={36} />
            </Link>
          </Button>
          {/* <Button>
            <Link href={``}></Link>
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default SocialIcons;
