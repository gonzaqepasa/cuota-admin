import Link from "next/link";
import styles from "./LinkNav.module.scss";
import { useRouter } from "next/router";
import { selectColor } from "../../../logic/selectColor";

interface Props {
  setModal: any;
  href: string;
  text: string;
}

export const LinkNav: React.FC<Props> = ({ setModal, href, text }) => {
  const route = useRouter();

  return (
    <>
      <Link
        className={`${styles.linkNav} ${
          route.pathname === `${href}` && styles.isHere
        }`}
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
}
export const LinkActivity: React.FC<Props2> = ({
  setModal,
  href,
  text,
  activityName,
}) => {
  const route = useRouter();

  return (
    <>
      <Link
        className={`${styles.linkNav} ${styles.linkActivity} ${
          route.asPath === `${href}` && styles.isHere
        }`}
        onClick={() => setModal(false)}
        href={`/${href}`}
      >
        <p style={{ color: ` ${selectColor(text)}`, fontSize: "0.9rem" }}>
          {text.charAt(0)}
        </p>
        {text.slice(1, text.length)}
      </Link>
    </>
  );
};
