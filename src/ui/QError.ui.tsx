import { useRouter } from "@tanstack/react-router";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button, Alert } from "flowbite-react";
import { Link } from "@tanstack/react-router";
import { HiInformationCircle } from "react-icons/hi";

export const QError = ({ error }: { error: Error }) => {
  const router = useRouter();
  const isDev = process.env.NODE_ENV !== "production";

  const queryClientErrorBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryClientErrorBoundary.reset();
  }, [queryClientErrorBoundary]);

  return (
    <div className="mt-8 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Alert color="failure" icon={HiInformationCircle}>
          <div className="font-medium">Oops! Something went wrong</div>
          <div className="mt-1 text-sm">
            We're sorry, but we encountered an unexpected error.
          </div>
        </Alert>

        <div className="mt-4 space-y-4">
          <Button
            className="w-full"
            onClick={() => {
              router.invalidate();
            }}
          >
            Try again
          </Button>
          <Button className="w-full" color="dark">
            <Link to="/">Return to homepage</Link>
          </Button>

          {isDev && (
            <div className="mt-4 border border-gray-200 rounded-lg">
              <button
                className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
                onClick={(e) => {
                  const content = e.currentTarget.nextElementSibling;
                  if (content) {
                    content.classList.toggle("hidden");
                  }
                }}
              >
                <span>View error details</span>
                <svg
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
              <div className="hidden p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="rounded bg-gray-100 p-4 dark:bg-gray-800">
                  <h3 className="mb-2 font-semibold">Error Message:</h3>
                  <p className="mb-4 text-sm">{error.message}</p>
                  <h3 className="mb-2 font-semibold">Stack Trace:</h3>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
                    {error.stack}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
