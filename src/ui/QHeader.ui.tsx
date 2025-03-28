import Logo from "@/assets/logo.png";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Logo from "";

export default function HeaderUI() {
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
        <NavbarLink href="/docs">Documentation</NavbarLink>
        <NavbarLink href="/pricing">Pricing</NavbarLink>
        <NavbarLink href="/auth/profile">Profile</NavbarLink>
        <NavbarLink href="/company">Dashboard</NavbarLink>
        <NavbarLink href="/docs">Documentation</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
