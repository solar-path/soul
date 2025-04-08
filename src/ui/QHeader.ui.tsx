// React is automatically imported by the JSX transform
import { Link } from "@tanstack/react-router";
import Logo from "@/assets/logo.png";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { fillDrawer } from "./QDrawer/QDrawer.store";
import SignUpForm from "@/api/routes/auth/SignUp.form";
import SignInForm from "@/api/routes/auth/SignIn.form";
import { useClientStore } from "@/utils/client.store";

export default function QHeader() {
  const { currentUser } = useClientStore();

  const authenticatedMenu = () => {
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
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User menu" img={currentUser?.avatar || ""} rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">
                {currentUser?.fullname ?? "undefined"}
              </span>
              <span className="block truncate text-sm font-medium">
                {currentUser?.email ?? "no email"}
              </span>
            </DropdownHeader>
            <DropdownItem as={Link} href="/auth/profile">
              User account
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink as={Link} href="/docs/intro">
            Documentation
          </NavbarLink>
          <NavbarLink as={Link} href="/pricing">
            Pricing
          </NavbarLink>

          <NavbarLink as={Link} href="/company">
            Dashboard
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    );
  };

  const unauthenticatedMenu = () => {
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
          <Button
            color="dark"
            onClick={() => fillDrawer(SignInForm, "Sign in")}
          >
            Get started
          </Button>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink as={Link} href="/docs/intro">
            Documentation
          </NavbarLink>
          <NavbarLink as={Link} href="/pricing">
            Pricing
          </NavbarLink>
          <NavbarLink onClick={() => fillDrawer(SignUpForm, "Sign up")}>
            Sign up
          </NavbarLink>
          <NavbarLink onClick={() => fillDrawer(SignInForm, "Sign in")}>
            Sign in
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    );
  };

  return currentUser ? authenticatedMenu() : unauthenticatedMenu();
}
