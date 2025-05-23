// React is automatically imported by the JSX transform
import { Link, useNavigate } from "@tanstack/react-router";
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
import SignInForm from "@/routes/auth/_SignIn.form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientSignOut } from "@/utils/trpc";
import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import { useUser } from "@/utils/client.store";

export default function QHeader() {
  const { data: currentUser } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signOutMutation = useMutation({
    mutationFn: clientSignOut,
    onSuccess: () => {
      showFlashMessage(
        "success",
        `${currentUser?.email} successfully signed out`
      );
      // Update the query cache to remove the user
      queryClient.setQueryData(["currentUser"], null);

      // Dispatch custom event to notify about sign-out
      window.dispatchEvent(new CustomEvent("user-signed-out"));

      // Navigate to home page
      navigate({ to: "/" });
    },
    onError: (error) => {
      showFlashMessage(
        "fail",
        error instanceof Error ? error.message : "Failed to sign out"
      );
    },
  });

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

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
                {currentUser?.fullname ?? "not provided"}
              </span>
              <span className="block truncate text-sm font-medium">
                {currentUser?.email ?? "no email"}
              </span>
            </DropdownHeader>
            <DropdownItem as={Link} href={`/auth/profile/${currentUser?.id}`}>
              User account
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
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
        <div className="flex md:order-2 space-x-4">
          <button
            onClick={() => fillDrawer(SignUpForm, "Sign up")}
            className="hover:text-red-700"
          >
            Sign up
          </button>
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
        </NavbarCollapse>
      </Navbar>
    );
  };

  return currentUser ? authenticatedMenu() : unauthenticatedMenu();
}
