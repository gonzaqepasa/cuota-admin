import { useEffect, useState } from "react";
import logo from "../../styles/images/fevicon.png";
import { auth } from "../../../firebase/firebaseConfig";
import { selectAvatar } from "../../logic/selectAvatar";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  User,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import { Auth } from "firebase/auth";
import Link from "next/link";
import { getAllActivitiesForNav } from "../../api-next/activity/getActivity";
import { typesActivity } from "../../types/types-user";
import { LinkActivity, LinkNav } from "./Link/LinkNav";
import { fromNameToUrl } from "../../logic/fromNameToUrl";
import Avatar from "./Avatar/Avatar";
import { orderByNameActivity } from "../../logic/orderByMonthName";
import BtnChangeTheme from "../Globals/BtnChangeTheme/BtnChangeTheme";
import Cookies from "js-cookie";

interface Props {
  auth: Auth;
}

const NavbarMain: React.FC<Props> = () => {
  const user = auth.currentUser;
  const avatar = selectAvatar(user?.email ? user.email[0].toUpperCase() : null);
  //////// Estados ////////
  const theme = Cookies.get("theme");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activities, setActivities] = useState<typesActivity[]>([]);
  /////////////////////////
  useEffect(() => {
    (async () => {
      const res = await getAllActivitiesForNav();
      setActivities(res);
    })();
  }, []);
  return (
    <>
      <Navbar
        aria-label="nav"
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        className={`${theme} bg-primary-300 text-content1-200`}
      >
        {/* //  Hamburguer Botton */}
        {/* Logo Link */}
        <NavbarContent>
          <NavbarBrand>
            <Link className=" flex items-center gap-2" href={`/dashboard`}>
              <Image src={logo} alt="" height={50} className="drop-shadow" />
              <BtnChangeTheme />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-4" justify="start">
          <NavbarItem>
            <Button variant="light">
              <LinkNav text="Inicio" href={`/dashboard?search=`} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button className="" variant="light">
              <LinkNav text="Panel de actividades" href={`/activities`} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              <Button className="" variant="light">
                <LinkNav text="Resumen" href={`/resume`} />
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {user ? (
              <Avatar avatar={avatar} user={user} />
            ) : (
              <Link href="#">Login</Link>
            )}
          </NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden text-content1-200 font-semibold"
          />
        </NavbarContent>

        <NavbarMenu className={`${theme} bg-primary-200/50 text-content1-200`}>
          <NavbarMenuItem>
            {user ? (
              <Avatar avatar={avatar} user={user} />
            ) : (
              <Link href="#">Login</Link>
            )}
          </NavbarMenuItem>

          <NavbarMenuItem>
            <LinkNav text="Inicio" href={`/dashboard?search=`} />
            <Divider />
            <LinkNav text="Panel de actividades" href={`/activities`} />
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default NavbarMain;
