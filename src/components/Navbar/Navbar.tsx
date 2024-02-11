import styles from "./Navbar.module.scss";
import { Divide as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { selectColor } from "../../logic/selectColor";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase/firebaseConfig";
import { FaArrowCircleUp } from "react-icons/fa";
import { selectAvatar } from "../../logic/selectAvatar";
import { signOutUser } from "../../../firebase/auth/signOut";
import { LinkActivity, LinkNav } from "./Link/LinkNav";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuItem, NavbarMenu, NavbarMenuToggle} from "@nextui-org/react";

export default function NavbarMain() {
  const route = useRouter();
  // console.log(route.asPath);
  const user = auth.currentUser;
  // useEffect(() => {}, []);
  const avatar = selectAvatar(user?.email ? user.email[0].toUpperCase() : null);
  //////// Estados ////////
  const [modal, setModal] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [toTop, setToTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /////////////////////////

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY < 30 ? setIsTop(true) : setIsTop(false);
      window.scrollY < 300 ? setToTop(true) : setToTop(false);
    });
  }, []);

  return (
    <>
       <Navbar onMenuOpenChange={setIsMenuOpen} height={20}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
       
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
       
          <NavbarMenuItem >
            <Link
              
              className="w-full"
              href="#"
              size="lg"
            >
             
            </Link>
          </NavbarMenuItem>
    
      </NavbarMenu>
    </Navbar>
    </>
  );
}
