import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import ReactMarkdown from "react-markdown";

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

// Create a list of all available documentation pages
const postList = Object.entries(slugToFileMap).map(([slug, { title }]) => ({
  title,
  href: `/docs/${slug}`,
}));

function DocsPage() {
  // Get the slug parameter from the route
  const { slug } = Route.useParams();

  // Redirect to intro if no slug is provided
  useEffect(() => {
    if (slug === "") {
      window.location.href = "/docs/intro";
    }
  }, [slug]);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Function to extract headers and build TOC
  useEffect(() => {
    if (!isLoading && !error && contentRef.current) {
      // Wait for the content to be rendered
      setTimeout(() => {
        if (contentRef.current) {
          const headers = contentRef.current.querySelectorAll(
            "h1, h2, h3, h4, h5, h6"
          );
          const toc: Array<{ id: string; level: number; text: string }> = [];

          headers.forEach((header, index) => {
            // Create an ID for the header if it doesn't have one
            if (!header.id) {
              header.id = `header-${index}`;
            }

            const level = parseInt(header.tagName.substring(1));
            toc.push({
              id: header.id,
              level,
              text: header.textContent || "",
            });
          });

          setTableOfContents(toc);
        }
      }, 100);
    }
  }, [isLoading, error, markdownContent]);

  // Function to scroll to header when TOC item is clicked
  const scrollToHeader = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Custom components for ReactMarkdown to apply Tailwind styles
  const components = {
    h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
      <h1 className="text-3xl font-bold mt-6 mb-4 text-gray-800" {...props} />
    ),
    h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
      <h2
        className="text-2xl font-semibold mt-5 mb-3 text-gray-800 border-b pb-1"
        {...props}
      />
    ),
    h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
      <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700" {...props} />
    ),
    h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
      <h4 className="text-lg font-medium mt-3 mb-2 text-gray-700" {...props} />
    ),
    h5: (props: React.ComponentPropsWithoutRef<"h5">) => (
      <h5
        className="text-base font-medium mt-2 mb-1 text-gray-700"
        {...props}
      />
    ),
    h6: (props: React.ComponentPropsWithoutRef<"h6">) => (
      <h6 className="text-sm font-medium mt-2 mb-1 text-gray-700" {...props} />
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
    const indentClass = `pl-${(item.level - 1) * 4}`;
    return (
      <div
        key={item.id}
        className={`${indentClass} py-1 cursor-pointer hover:text-blue-600 ${item.level === 1 ? "font-semibold" : ""}`}
        onClick={() => scrollToHeader(item.id)}
      >
        {item.text}
      </div>
    );
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/5 p-4">
        <h1 className="text-2xl font-bold mb-4">Documentation</h1>

        <Sidebar className="h-full w-full">
          <SidebarItems>
            <SidebarItemGroup>
              {postList.map((post) => (
                <SidebarItem
                  key={post.href}
                  as={Link}
                  href={post.href}
                  active={post.href === `/docs/${slug}`}
                >
                  {post.title}
                </SidebarItem>
              ))}
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>

      <div className="w-3/5 p-4">
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
      <div className="w-1/5 p-4 border-l">
        <h2 className="text-xl font-semibold mb-3">Table of Contents</h2>
        {tableOfContents.length > 0 ? (
          <div className="toc-container">
            {tableOfContents.map((item) => renderTocItem(item))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No headers found</p>
        )}
      </div>
    </div>
  );
}
