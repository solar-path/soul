import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  "intro": { title: "Introduction", file: "intro.md" },
  "terms": { title: "Terms of Service", file: "terms.md" },
  "privacy": { title: "Privacy Policy", file: "privacy.md" },
  "authentication": { title: "Authentication", file: "authentication.md" },
  "business": { title: "Business", file: "setupBusiness.md" },
  "erm": { title: "Risk Management", file: "riskManagement.md" },
  "ic": { title: "Internal Control", file: "internalControl.md" },
  "ia": { title: "Internal Audit", file: "internalAudit.md" },
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
    if (slug === '') {
      window.location.href = '/docs/intro';
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

  // Function to render the markdown content
  const renderContent = () => {
    if (isLoading) {
      return <div className="p-4">Loading documentation...</div>;
    }

    if (error) {
      return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
      <div className="p-4 prose max-w-none">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/5 p-4 border-r">
        <h1 className="text-2xl font-bold mb-4">Documentation</h1>

        <Sidebar>
          <SidebarItems>
            <SidebarItemGroup>
              {postList.map((post) => (
                <SidebarItem
                  as={Link}
                  key={post.title}
                  href={post.href}
                  active={slug === post.href.split("/").pop()}
                >
                  {post.title}
                </SidebarItem>
              ))}
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>
      <div className="w-4/5">{renderContent()}</div>
    </div>
  );
}
