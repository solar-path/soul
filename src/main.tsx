import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./global.css";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTheme, ThemeProvider } from "flowbite-react";
import { QueryClient } from "@tanstack/react-query";
import { QPageNotFound } from "./ui/QPageNotFound.ui";
import { QSnipper } from "./ui/QSnipper.ui";
import { QError } from "./ui/QError.ui";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
  defaultPendingComponent: QSnipper,
  defaultNotFoundComponent: QPageNotFound,
  defaultErrorComponent: ({ error }) => <QError error={error} />,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-black text-white",
    },
  },
});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider theme={customTheme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
