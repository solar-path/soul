import { createFileRoute } from "@tanstack/react-router";
import { FaEdit, FaMapPin, FaPhone, FaEnvelope } from "react-icons/fa";
import { Button, Spinner } from "flowbite-react";
import { fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import { useUser } from "@/utils/client.store";
import ProfileForm from "@/api/routes/auth/Profile.form";

export const Route = createFileRoute("/auth/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="flex justify-center items-center h-64">
          <Spinner size="xl" color="failure" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="text-center p-8 bg-gray-50 rounded-lg shadow">
          <p className="text-lg">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  // Parse contact and address if they exist
  const contact = user.contact
    ? typeof user.contact === "string"
      ? JSON.parse(user.contact)
      : user.contact
    : null;

  const address = user.address
    ? typeof user.address === "string"
      ? JSON.parse(user.address)
      : user.address
    : null;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="w-full max-w-4xl mx-auto">
        {/* Header with Avatar and Name */}
        <div className="p-8 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold mb-2 text-red-700">
                {user.fullname || "No name provided"}
              </p>
              <p className="text-sm opacity-80">{user.email}</p>
            </div>

            {user.avatar ? (
              <img
                src={user.avatar}
                className="w-32 h-32 rounded-full object-cover"
                alt="User Avatar"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-3xl text-gray-500">
                  {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between items-center mb-4 group">
                <p className="text-lg font-semibold">PERSONAL INFORMATION</p>
                <Button
                  color="dark"
                  size="sm"
                  onClick={() =>
                    fillDrawer(() => <ProfileForm />, "Edit Profile")
                  }
                  aria-label="Edit profile"
                >
                  <FaEdit className="w-5 h-5flex-shrink-0" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="font-semibold">Gender</p>
                  <p className="capitalize">{user.gender || "Not specified"}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Date of Birth</p>
                  <p>
                    {user.dob
                      ? new Date(user.dob).toLocaleDateString()
                      : "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-3">Contact Information</p>
                  <ul className="space-y-2 ml-2">
                    <li className="flex items-center gap-3">
                      <FaMapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-600 text-sm">
                        {address ? (
                          <>
                            {[
                              address.street,
                              address.city,
                              address.state,
                              address.postalCode,
                              address.country,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </>
                        ) : (
                          "No address provided"
                        )}
                      </p>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaPhone className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <a
                        href={`tel:${contact?.phone}`}
                        className="text-sm text-red-500"
                      >
                        {contact?.phone || "No phone provided"}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaEnvelope className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <a
                        href={`mailto:${user.email}`}
                        className="text-sm text-red-500"
                      >
                        {user.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Account Details Section */}
            <div>
              <p className="text-lg font-semibold mb-4">ACCOUNT DETAILS</p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <p className="font-semibold">Account Created</p>
                  <p>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Last Updated</p>
                  <p>
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Email Verified</p>
                  <p>{user.isVerified ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
