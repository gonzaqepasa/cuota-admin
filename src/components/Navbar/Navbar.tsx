import { Divide as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import logo from "../../styles/images/logo.png";
import { useRouter } from "next/navigation";
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
} from "@nextui-org/react";
import Image from "next/image";
import { Auth } from "firebase/auth";
import Link from "next/link";
import { signOutUser } from "../../../firebase/auth/signOut";
import { getActivities } from "../../../services/activity.service";
import { getAllActivities } from "../../api-next/getActivity";
import { typesActivity } from "../../types/types-user";
import { LinkActivity, LinkNav } from "./Link/LinkNav";

interface Props {
  auth: Auth;
}

const NavbarMain: React.FC<Props> = () => {
  const route = useRouter();

  const user = auth.currentUser;
  const avatar = selectAvatar(user?.email ? user.email[0].toUpperCase() : null);
  //////// Estados ////////

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activities, setActivities] = useState<typesActivity[] | false>([]);
  /////////////////////////
  useEffect(() => {
    (async () => {
      const res: typesActivity[] | false = await getAllActivities();
      setActivities(res);
    })();
  }, []);
  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-neutral-800">
        {/* //  Hamburguer Botton */}
        {/* Logo Link */}
        <NavbarContent>
          <NavbarBrand>
            <Link href={`/dashboard`}>
              <Image src={logo} alt="" height={35} />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {auth.currentUser ? (
              <User
                name={user?.email}
                description={
                  <>
                    <button
                      className="text-red-600 hover:text-red-400 transition cursor-pointer"
                      onClick={(e) => signOutUser(e)}
                    >
                      Cerrar sesion
                    </button>
                  </>
                }
                avatarProps={{
                  src: avatar,
                }}
              />
            ) : (
              <Link href="#">Login</Link>
            )}
          </NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
          />
        </NavbarContent>

        <NavbarMenu className="bg-neutral-300/50">
          <NavbarMenuItem>
            {auth.currentUser ? (
              <User
                name={user?.email}
                description={
                  <>
                    <button
                      className="text-red-600 hover:text-red-400 transition font-bold cursor-pointer"
                      onClick={(e) => signOutUser(e)}
                    >
                      Cerrar sesion
                    </button>
                  </>
                }
                avatarProps={{
                  src: avatar,
                }}
              />
            ) : (
              <Link href="#">Login</Link>
            )}
          </NavbarMenuItem>

          <NavbarMenuItem>
            <LinkNav text="Panel de actividades" href={`/prices`} />
            <Divider />
            <h2 className="text-neutral-900 text-lg font-bold">Actividades</h2>
            {activities &&
              activities.map((a: typesActivity) => (
                <LinkActivity
                  key={a.id}
                  activityName={a.nameActivity}
                  text={a.nameActivity}
                  href={`dashboard/${a.nameActivity}`}
                />
              ))}
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default NavbarMain;
