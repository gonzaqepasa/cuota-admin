import { useEffect, useState } from "react";
import logo from "../../styles/images/logo.png";
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

interface Props {
  auth: Auth;
}

const NavbarMain: React.FC<Props> = () => {
  const user = auth.currentUser;
  const avatar = selectAvatar(user?.email ? user.email[0].toUpperCase() : null);
  //////// Estados ////////

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
        className="bg-neutral-800"
      >
        {/* //  Hamburguer Botton */}
        {/* Logo Link */}
        <NavbarContent>
          <NavbarBrand>
            <Link href={`/dashboard`}>
              <Image src={logo} alt="" height={35} />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-4" justify="start">
          <NavbarItem>
            <Dropdown aria-label="Actividades">
              <DropdownTrigger aria-label="asd">
                <Button className="text-neutral-200" variant="light">
                  Actividades
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="asd">
                {activities.map((a: typesActivity) => (
                  <DropdownItem
                    variant="shadow"
                    aria-label={a.nameActivity}
                    key={a._id} className="p-0 "
                  >
                    <LinkActivity
                      color={a.color}
                      key={a._id}
                      activityName={a.nameActivity}
                      text={a.nameActivity}
                      href={`/activity/${fromNameToUrl(a.nameActivity)}`}
                    />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Button className="text-neutral-200" variant="light">
              <LinkNav text="Panel de actividades" href={`/dashboard`} />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              <Button className="text-neutral-200" variant="light">
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
            className="lg:hidden text-neutral-200 font-semibold"
          />
        </NavbarContent>

        <NavbarMenu className="bg-neutral-300/50">
          <NavbarMenuItem>
            {user ? (
              <Avatar avatar={avatar} user={user} />
            ) : (
              <Link href="#">Login</Link>
            )}
          </NavbarMenuItem>

          <NavbarMenuItem>
            <LinkNav text="Panel de actividades" href={`/dashboard`} />
            <Divider />
            <h2 className="text-neutral-500 text-lg font-normal">
              Actividades
            </h2>
            {activities &&
              orderByNameActivity(activities).map((a: typesActivity) => (
                <LinkActivity
                  color={a.color}
                  key={a._id}
                  activityName={a.nameActivity}
                  text={a.nameActivity}
                  href={`/activity/${fromNameToUrl(a.nameActivity)}`}
                />
              ))}
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default NavbarMain;
