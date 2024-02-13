import Link from "next/link";

import { selectColor } from "../../../logic/selectColor";
import { useParams } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

interface Props {
  href: string;
  text: string;
}

export const LinkNav: React.FC<Props> = ({ href, text }) => {
  return (
    <>
      <Link className={` `} href={`${href}`}>
        {text}
      </Link>
    </>
  );
};
interface Props2 extends Props {
  activityName?: string;
}
export const LinkActivity: React.FC<Props2> = ({
  href,
  text,
  activityName,
}) => {
  return (
    <>
      <Link className={` flex items-center  my-1 `} href={`${href}`}>
        <p style={{ color: selectColor(String(activityName)) }}>
          <FaAngleRight />
        </p>
        <p className="pl-2 text-neutral-600">{text}</p>
      </Link>
    </>
  );
};
