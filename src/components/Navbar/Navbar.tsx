import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";
import { CgGym, CgHome } from "react-icons/cg";
import {
  GiHighPunch,
  GiMusicalNotes,
  GiBoxingGlove,
  GiWinterGloves,
} from "react-icons/gi";
import { HiMusicNote } from "react-icons/hi";
// Imports Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { selectColor } from "../../logic/selectColor";
import Image from "next/image";
import AdminSvg from "../../../styles/Admin.svg";
import { useRouter } from "next/router";
import { fromUrlToName } from "../../logic/fromNameToUrl";

export default function NavbarMain() {
  const route = useRouter()
 
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link style={{ paddingRight: '1rem',filter: `drop-shadow(0px 0px 2px ${selectColor(fromUrlToName(route.route.slice(1)))})` }} href={"/"}>
          <Image height={40} src={AdminSvg} alt="No se encontro imagen" />
        </Link>

        {/* </div> */}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Precios</Nav.Link>
            {/* <Nav.Link href="#link">Actividades</Nav.Link> */}
            <NavDropdown title="Actividades" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link href={"/funcional"}>
                  <CgGym color={selectColor("Funcional")} />
                  Funcional
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href={"/taekwondo"}>
                  <GiHighPunch color={selectColor("Taekwondo")} />
                  Taekwondo
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href={"/ritmo-kids"}>
                  <GiMusicalNotes color={selectColor("Ritmo Kids")} />
                  Ritmo Kids
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href={"/zumba"}>
                  <HiMusicNote color={selectColor("Zumba")} />
                  Zumba
                </Link>
              </NavDropdown.Item>{" "}
              <NavDropdown.Item>
                <Link href={"/power-box"}>
                  <GiWinterGloves color={selectColor("Power Box")} />
                  Power Box
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href={"/kick-boxing"}>
                  <GiBoxingGlove color={selectColor("Kick Boxing")} />
                  Kick Boxing
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
             
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
