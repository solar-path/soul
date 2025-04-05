import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarItems,
  SidebarItemGroup,
  SidebarItem,
  SidebarCollapse,
} from "flowbite-react";

export type QSidebarProps = {
  title: string;
  href: string;
  children: { title: string; href: string }[];
}[];

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

export const QSidebar = ({
  moduleList,
}: {
  moduleList: {
    title: string;
    href: string;
    children: { title: string; href: string }[];
  }[];
}) => {
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
};
