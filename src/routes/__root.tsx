import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Footer, FooterCopyright, List, ListItem } from "flowbite-react";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <nav className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/pricing" className="[&.active]:font-bold">
            Pricing
          </Link>
          <Link to="/auth/profile" className="[&.active]:font-bold">
            Profile
          </Link>
          <Link to="/company" className="[&.active]:font-bold">
            Dashboard
          </Link>
          <Link to="/company/addressBook" className="[&.active]:font-bold">
            Address Book
          </Link>
          <Link to="/company/erm" className="[&.active]:font-bold">
            ERM
          </Link>
          <Link to="/company/hrm" className="[&.active]:font-bold">
            HRM
          </Link>
          <Link to="/company/settings" className="[&.active]:font-bold">
            Settings
          </Link>
          <Link
            to="/company/userManagement/user"
            className="[&.active]:font-bold"
          >
            User Management
          </Link>
          <Link to="/docs" className="[&.active]:font-bold">
            Docs
          </Link>
        </nav>
        <Outlet />
        <TanStackRouterDevtools />
        <Footer container>
          <FooterCopyright href="#" by="Flowbite™" year={2022} />
          <List horizontal>
            <ListItem>
              <Link
                to="/docs/privacy/post"
                className="text-gray-500 hover:underline dark:text-gray-400"
              >
                Privacy Policy
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to="/docs/terms/post"
                className="text-gray-500 hover:underline dark:text-gray-400"
              >
                Terms of Service
              </Link>
            </ListItem>
            {/* <Link to="#" className="text-gray-500 hover:underline dark:text-gray-400">Contact</Link> */}
          </List>
        </Footer>
      </div>
    </>
  ),
});
