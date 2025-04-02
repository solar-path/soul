import { Link } from "@tanstack/react-router";
import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import ContactUsForm from "@/api/routes/contactUs/ContactUs.form";

export default function QFooter() {
  return (
    <Footer container>
      <FooterCopyright href="/" by="Flowbite™" year={2022} />
      <FooterLinkGroup>
        <FooterLink as={Link} href="/docs/privacy">
          Privacy Policy
        </FooterLink>
        <FooterLink as={Link} href="/docs/terms">
          Terms of Service
        </FooterLink>
        <FooterLink href="#">
          <button onClick={() => fillDrawer(ContactUsForm, "Contact Us")}>
            Contact Us
          </button>
        </FooterLink>
      </FooterLinkGroup>

      {/* <List horizontal>
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
        <ListItem>
          <button onClick={() => fillDrawer(ContactUsForm, "Contact Us")}>
            Contact Us
          </button>
        </ListItem>
      </List> */}
    </Footer>
  );
}
