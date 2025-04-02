import Logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { fillDrawer } from "./QDrawer/QDrawer.store";
import SignUpForm from "@/api/routes/auth/SignUp.form";
import SignInForm from "@/api/routes/auth/SignIn.form";

export default function QHeader() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <img
          src={Logo}
          className="mr-3 h-6 sm:h-9"
          alt="Achieving Excellence Logo"
        />
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button onClick={() => fillDrawer(SignInForm, "Sign in")}>
          Get started
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={Link} href="/docs">
          Documentation
        </NavbarLink>
        <NavbarLink as={Link} href="/pricing">
          Pricing
        </NavbarLink>
        <NavbarLink as={Link} href="/auth/profile">
          Profile
        </NavbarLink>
        <NavbarLink as={Link} href="/company">
          Dashboard
        </NavbarLink>
        <NavbarLink onClick={() => fillDrawer(SignUpForm, "Sign up")}>
          Sign up
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
