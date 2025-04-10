import { Link } from "@tanstack/react-router";
import { Button, Card } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export function QNotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="max-w-md">
        <h5 className="text-6xl font-bold text-center text-red-600 dark:text-red-500 mb-2">
          404
        </h5>
        <p className="text-xl font-normal text-center text-gray-700 dark:text-gray-400 mb-4">
          The page you are looking for does not exist
        </p>
        <Button color="dark" className="mt-2">
          <HiHome className="mr-2 h-5 w-5" />
          <Link to="/" className="text-white no-underline">
            Back to Homepage
          </Link>
        </Button>
      </Card>
    </div>
  );
}
