import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

export const Route = createFileRoute("/company/")({
  component: RouteComponent,
});

const moduleList: {
  title: string;
  href: string;
  children: { title: string; href: string }[];
}[] = [
  { title: "Risk Management", href: "/company/erm", children: [] },
  {
    title: "Personnel Management",
    href: "/company/hrm",
    children: [
      { title: "Employee", href: "/company/hrm/employee" },
      { title: "Department", href: "/company/hrm/department" },
      { title: "Position", href: "/company/hrm/position" },
    ],
  },
  { title: "Address Book", href: "/company/addressBook", children: [] },
  { title: "Settings", href: "/company/settings", children: [] },
  { title: "User Management", href: "/company/userManagement", children: [] },
];

const noChildrenSidebar = (module: { title: string; href: string }) => {
  return (
    <SidebarItem as={Link} key={module.href} href={module.href}>
      {module.title}
    </SidebarItem>
  );
};

const hasChildrenSidebar = (module: {
  title: string;
  href: string;
  children: { title: string; href: string }[];
}) => {
  return (
    <SidebarCollapse key={module.href} label={module.title}>
      {module.children.map((child) => (
        <SidebarItem as={Link} key={child.href} href={child.href}>
          {child.title}
        </SidebarItem>
      ))}
    </SidebarCollapse>
  );
};

function RouteComponent() {
  return (
    <div>
      <Sidebar>
        <SidebarItems>
          <SidebarItemGroup>
            {moduleList.map((module) =>
              module.children.length === 0
                ? noChildrenSidebar(module)
                : hasChildrenSidebar(module)
            )}
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}
