import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";
import { CgGym, CgHome } from "react-icons/cg";
import { GiHighPunch, GiMusicalNotes } from "react-icons/gi";
// Imports Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { selectColor } from "../../logic/selectColor";

export default function NavbarMain() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Precios</Nav.Link>
            {/* <Nav.Link href="#link">Actividades</Nav.Link> */}
            <NavDropdown title="Actividades" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link  href={"/funcional"}>
                  <CgGym color={selectColor("Funcional")}/>
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
                  <GiMusicalNotes color={selectColor("Zumba")} />
                  Zumba
                </Link>
              </NavDropdown.Item>{" "}
              <NavDropdown.Item>
                <Link href={"/power-box"}>
                  <GiMusicalNotes color={selectColor("Power Box")} />
                  Power Box
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href={"/kick-boxing"}>
                  <GiMusicalNotes color={selectColor("Kick Boxing")} />
                  Kick Boxing
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
