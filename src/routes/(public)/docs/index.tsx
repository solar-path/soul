import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/docs/")({
  component: DocsPage,
});

function DocsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Documentation</h1>
      <ul className="list-disc pl-5">
        <li>
          <a href="/docs/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>
        </li>
        <li>
          <a href="/docs/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
        </li>
      </ul>
    </div>
  );
}
