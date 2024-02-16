import Link from "next/link";

import { FaAngleRight } from "react-icons/fa";

interface Props {
  href: string;
  text: string;
  color?: string;
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
  color,
}) => {
  return (
    <>
      <Link className={` flex items-center  my-1 `} href={`${href}`}>
        <p style={{ color }}>
          <FaAngleRight />
        </p>
        <p className="pl-2 text-neutral-600">{text}</p>
      </Link>
    </>
  );
};
