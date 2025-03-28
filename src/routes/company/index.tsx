import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/company/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Company Dashboard
      <ul>
        <li>
          <Link to="/company/addressBook" className="[&.active]:font-bold">
            Address Book
          </Link>
        </li>
        <li>
          <Link to="/company/erm" className="[&.active]:font-bold">
            ERM
          </Link>
        </li>
        <li>
          <Link to="/company/hrm" className="[&.active]:font-bold">
            HRM
          </Link>
          <ul>
            <li>
              <Link to="/company/hrm/employee" className="[&.active]:font-bold">
                Employee
              </Link>
            </li>
            <li>
              <Link
                to="/company/hrm/department"
                className="[&.active]:font-bold"
              >
                Department
              </Link>
            </li>
            <li>
              <Link to="/company/hrm/position" className="[&.active]:font-bold">
                Position
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/company/settings" className="[&.active]:font-bold">
            Settings
          </Link>
        </li>
        <li>
          <Link
            to="/company/userManagement/user"
            className="[&.active]:font-bold"
          >
            User Management
          </Link>
        </li>
      </ul>
    </div>
  );
}
