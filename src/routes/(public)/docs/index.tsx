import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

export const Route = createFileRoute("/(public)/docs/")({
  component: DocsPage,
});

function DocsPage() {
  const postList = [
    {
      title: "Terms of Service",
      href: "/docs/terms",
    },
    {
      title: "Privacy Policy",
      href: "/docs/privacy",
    },
    {
      title: "Authentication",
      href: "/docs/authentication",
    },
    {
      title: "Business",
      href: "/docs/business",
    },
    {
      title: "Risk management",
      href: "/docs/erm",
    },
    {
      title: "Internal control",
      href: "/docs/ic",
    },
    {
      title: "Internal audit",
      href: "/docs/ia",
    },
  ];

  return (
    <div className="flex flex-row">
      <div className="w-1/5">
        <h1 className="text-2xl font-bold mb-4">Documentation</h1>

        <Sidebar>
          <SidebarItems>
            <SidebarItemGroup>
              {postList.map((post) => (
                <SidebarItem as={Link} key={post.title} href={post.href}>
                  {post.title}
                </SidebarItem>
              ))}
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>
      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
}
