import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { QSidebar, QSidebarProps } from "@/ui/QSidebar.ui";
import ReactMarkdown from "react-markdown";
import { QPageNotFound } from "@/ui/QPageNotFound.ui";

// Define the route
export const Route = createFileRoute("/(public)/docs/$slug")({
  component: DocsPage,
});

// Define the mapping between route slugs and markdown files
const slugToFileMap: Record<string, { title: string; file: string }> = {
  intro: { title: "Introduction", file: "intro.md" },
  terms: { title: "Terms of Service", file: "terms.md" },
  privacy: { title: "Privacy Policy", file: "privacy.md" },
  authentication: { title: "Authentication", file: "authentication.md" },
  business: { title: "Business", file: "setupBusiness.md" },
  erm: { title: "Risk Management", file: "riskManagement.md" },
  ic: { title: "Internal Control", file: "internalControl.md" },
  ia: { title: "Internal Audit", file: "internalAudit.md" },
};

// Create a list of all available documentation pages in QSidebar format
const sidebarModules: QSidebarProps = Object.entries(slugToFileMap).map(
  ([slug, { title }]) => ({
    title,
    href: `/docs/${slug}`,
    children: [],
  })
);

function DocsPage() {
  // Get the slug parameter from the route
  const { slug } = Route.useParams();
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  // Redirect to intro if no slug is provided
  useEffect(() => {
    if (slug === "") {
      window.location.href = "/docs/intro";
    }

    // Check if the slug exists in our mapping
    if (slug && !slugToFileMap[slug]) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [slug]);

  useEffect(() => {
    async function fetchMarkdownContent() {
      setIsLoading(true);
      setError(null);

      try {
        // If no slug is provided, use a default welcome message
        if (!slug) {
          setMarkdownContent(
            "# Welcome to Documentation\n\nPlease select a topic from the sidebar to view documentation."
          );
          setIsLoading(false);
          return;
        }

        // Get the file name from the slug mapping
        const fileInfo = slugToFileMap[slug];
        if (!fileInfo) {
          setError(`Documentation for '${slug}' not found`);
          setIsLoading(false);
          return;
        }

        try {
          // Try to load the markdown file directly from the file system during development
          // or from the public directory in production
          const response = await fetch(`/src/posts/${fileInfo.file}`);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch markdown file: ${response.statusText}`
            );
          }
          const content = await response.text();

          // Parse the frontmatter and content
          const frontmatterRegex = /---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)/;
          const matches = content.match(frontmatterRegex);

          if (matches && matches.length >= 3) {
            // Extract the content part (after frontmatter)
            const markdownContent = matches[2];
            setMarkdownContent(markdownContent);
          } else {
            // If no frontmatter is found, use the entire content
            setMarkdownContent(content);
          }
        } catch (error) {
          console.error("Error loading markdown file:", error);
          setError(
            `Failed to load documentation for '${fileInfo.title}'. Please try again later.`
          );
        }
      } catch (err) {
        console.error("Error fetching markdown:", err);
        setError("Failed to load documentation. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarkdownContent();
  }, [slug]);

  // Extract headers from markdown content to build table of contents
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ id: string; level: number; text: string }>
  >([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset TOC when slug changes
  useEffect(() => {
    setTableOfContents([]);
  }, [slug]);

  // Function to extract headers and build TOC
  useEffect(() => {
    if (!isLoading && !error && contentRef.current) {
      // Wait for the content to be rendered
      setTimeout(() => {
        if (contentRef.current) {
          // Clear existing anchor elements to prevent duplicates
          const existingAnchors =
            contentRef.current.querySelectorAll(".anchor-target");
          existingAnchors.forEach((anchor) => anchor.remove());

          const headers = contentRef.current.querySelectorAll(
            "h1, h2, h3, h4, h5, h6"
          );
          const toc: Array<{ id: string; level: number; text: string }> = [];

          headers.forEach((header, index) => {
            // Create a consistent ID for the header based on slug and index
            const id = `${slug}-header-${index}`;
            header.id = id;

            // Add an anchor element before the header for better scrolling
            const anchor = document.createElement("a");
            anchor.id = id;
            anchor.className = "anchor-target";
            header.parentNode?.insertBefore(anchor, header);

            const level = parseInt(header.tagName.substring(1));
            toc.push({
              id: id,
              level,
              text: header.textContent || "",
            });
          });

          setTableOfContents(toc);
        }
      }, 100);
    }
  }, [isLoading, error, markdownContent, slug]);

  // Function to scroll to header when TOC item is clicked
  const scrollToHeader = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Add a small offset to account for the sticky header
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Custom components for ReactMarkdown to apply Tailwind styles
  const components = {
    h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
      <h1
        id={props.id}
        className="text-3xl font-bold mt-6 mb-4 text-gray-800 scroll-mt-20"
        {...props}
      />
    ),
    h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
      <h2
        id={props.id}
        className="text-2xl font-semibold mt-5 mb-3 text-gray-800  pb-1 scroll-mt-20"
        {...props}
      />
    ),
    h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
      <h3
        id={props.id}
        className="text-xl font-medium mt-4 mb-2 text-gray-700 scroll-mt-20"
        {...props}
      />
    ),
    h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
      <h4
        id={props.id}
        className="text-lg font-medium mt-3 mb-2 text-gray-700 scroll-mt-20"
        {...props}
      />
    ),
    h5: (props: React.ComponentPropsWithoutRef<"h5">) => (
      <h5
        id={props.id}
        className="text-base font-medium mt-2 mb-1 text-gray-700 scroll-mt-20"
        {...props}
      />
    ),
    h6: (props: React.ComponentPropsWithoutRef<"h6">) => (
      <h6
        id={props.id}
        className="text-sm font-medium mt-2 mb-1 text-gray-700 scroll-mt-20"
        {...props}
      />
    ),
    p: (props: React.ComponentPropsWithoutRef<"p">) => (
      <p className="my-3 text-gray-600" {...props} />
    ),
    ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
      <ul className="list-disc pl-5 my-3" {...props} />
    ),
    ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
      <ol className="list-decimal pl-5 my-3" {...props} />
    ),
    li: (props: React.ComponentPropsWithoutRef<"li">) => (
      <li className="my-1" {...props} />
    ),
    a: (props: React.ComponentPropsWithoutRef<"a">) => (
      <a className="text-blue-600 hover:underline" {...props} />
    ),
    blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic my-4"
        {...props}
      />
    ),
    code: (props: React.ComponentPropsWithoutRef<"code">) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props} />
    ),
    pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
      <pre
        className="bg-gray-100 rounded p-3 overflow-x-auto my-4"
        {...props}
      />
    ),
  };

  // Render TOC item with proper indentation based on header level
  const renderTocItem = (item: { id: string; level: number; text: string }) => {
    // Calculate indentation based on header level
    const indentClass = `ml-${(item.level - 1) * 3}`;

    return (
      <a
        key={item.id}
        href={`#${item.id}`}
        className={`${indentClass} py-1 block text-sm cursor-pointer hover:text-blue-600 ${item.level === 1 ? "font-semibold" : ""} no-underline text-gray-700`}
        onClick={(e) => {
          e.preventDefault();
          // Use TanStack Router's navigate function to update the URL hash without page reload
          // while still scrolling to the element
          window.history.pushState({}, "", `#${item.id}`);
          scrollToHeader(item.id);
        }}
      >
        {item.text}
      </a>
    );
  };

  // If the slug doesn't exist, show the QPageNotFound component
  if (notFound) {
    return <QPageNotFound />;
  }

  return (
    <div className="flex flex-row">
      {/* Documentation Navigation Sidebar */}
      <div className="w-1/5 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-4 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold mb-3">Documentation</h3>
        </div>
        <div className="px-2 pb-4">
          <QSidebar moduleList={sidebarModules} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-3/5 p-6 overflow-y-auto h-[calc(100vh-64px)]">
        {isLoading ? (
          <div className="text-center">
            <p>Loading documentation...</p>
          </div>
        ) : error ? (
          <div className="text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div className="prose max-w-none" ref={contentRef}>
            <ReactMarkdown components={components}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Table of Contents */}
      <div className="w-1/5 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-4 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">Table of Contents</h2>
        </div>
        <div className="px-4 pb-4">
          {tableOfContents.length > 0 ? (
            <nav className="toc-container">
              {tableOfContents.map((item) => renderTocItem(item))}
            </nav>
          ) : (
            <p className="text-gray-500 italic">No headers found</p>
          )}
        </div>
      </div>
    </div>
  );
}
