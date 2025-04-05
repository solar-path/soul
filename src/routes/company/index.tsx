import { QSidebarProps } from "@/ui/QSidebar.ui";
import { QSidebar } from "@/ui/QSidebar.ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/")({
  component: RouteComponent,
});

const moduleList: QSidebarProps = [
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

function RouteComponent() {
  return (
    <div>
      <QSidebar moduleList={moduleList} />
    </div>
  );
}
