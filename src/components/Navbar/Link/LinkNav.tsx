import Link from "next/link";

import { FaAngleRight } from "react-icons/fa";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";

interface Props {
  href: string;
  text: string;
  color?: string;
}

export const LinkNav: React.FC<Props> = ({ href, text }) => {
  return (
    <>
      <Link
        className={`flex items-center rounded  my-1   pl-1 hover:translate-x-1 lg:hover:translate-x-0 transition`}
        href={`${href}`}
      >
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
  color,
}) => {
  return (
    <>
      <Link
        className={` flex items-center rounded   my-1  hover:translate-x-1 transition  `}
        href={`${href}`}
      >
        <p style={{ color }}>
          <FaAngleRight />
        </p>
        <p className="pl-2   ">{firstLetterUpper(text)}</p>
      </Link>
    </>
  );
};
