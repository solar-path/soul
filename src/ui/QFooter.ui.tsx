import { Link } from "@tanstack/react-router";
import { Footer, FooterCopyright, List, ListItem } from "flowbite-react";

export default function QFooter() {
  return (
    <Footer container>
      <FooterCopyright href="#" by="Flowbite™" year={2022} />
      <List horizontal>
        <ListItem>
          <Link
            to="/docs/privacy"
            className="text-gray-500 hover:underline dark:text-gray-400"
          >
            Privacy Policy
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/docs/terms"
            className="text-gray-500 hover:underline dark:text-gray-400"
          >
            Terms of Service
          </Link>
        </ListItem>
        {/* <Link to="#" className="text-gray-500 hover:underline dark:text-gray-400">Contact</Link> */}
      </List>
    </Footer>
  );
}
