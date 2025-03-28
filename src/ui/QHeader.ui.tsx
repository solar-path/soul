import Logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export default function QHeader() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
        <img
          src={Logo}
          className="mr-3 h-6 sm:h-9"
          alt="Achieving Excellence Logo"
        />
      </NavbarBrand>
      <div className="flex md:order-2">
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Link to="/docs">
          <NavbarLink href="/docs">Documentation</NavbarLink>
        </Link>
        <Link to="/pricing">
          <NavbarLink href="/pricing">Pricing</NavbarLink>
        </Link>
        <Link to="/auth/profile">
          <NavbarLink href="/auth/profile">Profile</NavbarLink>
        </Link>
        <Link to="/company">
          <NavbarLink href="/company">Dashboard</NavbarLink>
        </Link>
      </NavbarCollapse>
    </Navbar>
  );
}
