import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Button, Card } from "flowbite-react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Post } from "@/api/routes/posts/posts.zod";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/(public)/post/$id")({
  component: PostDetailComponent,
});

// Function to fetch a post by ID using Hono RPC
const fetchPostById = async (id: string): Promise<Post> => {
  try {
    // Using Hono RPC with the correct path structure based on project patterns
    // Following the same pattern as in other components that use route parameters
    const response = await trpc.posts[":id"].$get({
      param: { id },
    });

    const data = await response.json();

    // Ensure the response matches the Post type
    if (!data || typeof data !== "object" || !("id" in data)) {
      throw new Error("Invalid post data received");
    }

    // Make sure createdAt is always a string (not null)
    return {
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
    } as Post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
};

function PostDetailComponent() {
  const { id } = Route.useParams();

  // Fetch post data using TanStack Query
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="flex justify-start mb-6">
          <Button as={Link} href="/" color="light">
            <MdOutlineKeyboardArrowLeft className="mr-1" /> Back to Posts
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Spinner size="xl" />
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 py-10">
            <p>Error loading post. Please try again later.</p>
          </div>
        )}

        {post && (
          <Card className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-red-100 text-red-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800">
                <IoDocumentTextOutline className="mr-1 w-3 h-3" />
                Article
              </span>
              <span className="text-sm">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {post.title}
            </h1>
            <div className="prose max-w-none dark:prose-invert mb-5">
              {post.content.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-4 font-light text-gray-500 dark:text-gray-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex items-center space-x-4 border-t pt-4 mt-4">
              <img
                className="w-10 h-10 rounded-full"
                src={
                  post.authorAvatar ||
                  "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                }
                alt="Author avatar"
              />
              <div>
                <span className="font-medium dark:text-white block">
                  {post.authorFullname || "Unknown Author"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Published on {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
