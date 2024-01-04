import Link from "next/link";

import { useRouter } from "next/router";

interface Props {
  setModal: any;
  href: string;
  text?: string;
}

export const LinkNav: React.FC<Props> = ({ setModal, href, text }) => {
  const route = useRouter();

  return (
    <>
      <Link
        className={` flex   items-start text-sm gap-1  text-neutral-300 hover:text-neutral-100  p-1 rounded transition ${route.pathname === `${href}` && ""}`}
        onClick={() => setModal(false)}
        href={`${href}`}
      >
        {text}
      </Link>
    </>
  );
};
interface Props2 extends Props {
  activityName?: string;
  modalityName?: string;
}
export const LinkActivity: React.FC<Props2> = ({
  setModal,
  href,
  modalityName,
  activityName,
}) => {
  const route = useRouter();

  return (
    <>
      <Link
        className={`flex   items-start text-sm gap-1  text-neutral-300 hover:text-neutral-100 hover:bg-blue-800/20 p-1 rounded transition ${
          route.asPath === `${href}` && "bg-neutral-700"
        }`}
        onClick={() => setModal(false)}
        href={`${href}`}
      >
        <p className="">{activityName}</p>
        <p className="text-slate-400 font-light">{`${modalityName}`}</p>
      </Link>
    </>
  );
};
