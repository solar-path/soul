import { Button, Card, Spinner } from "flowbite-react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Post } from "@/api/routes/posts/posts.zod";
import { Link } from "@tanstack/react-router";

// Function to fetch posts from the API using Hono RPC
const fetchTopPosts = async (): Promise<Post[]> => {
  try {
    // Using Hono RPC with the correct path structure based on project patterns
    const response = await trpc.posts.top.$get();
    const data = await response.json();

    // Ensure we have a valid array of posts
    if (!Array.isArray(data)) {
      throw new Error("Invalid posts data received");
    }

    // Make sure all posts have the required fields
    return data.map((post) => ({
      ...post,
      createdAt: post.createdAt || new Date().toISOString(),
    })) as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export const QPostList = () => {
  // Fetch top posts using TanStack Query
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topPosts"],
    queryFn: fetchTopPosts,
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Publications
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Spinner size="xl" />
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 py-10">
            <p>Error loading posts. Please try again later.</p>
          </div>
        )}

        {posts && posts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No posts available at the moment.</p>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="grid gap-8 lg:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.id}>
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-red-100 text-red-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800">
                    <IoDocumentTextOutline className="mr-1 w-3 h-3" />
                    Article
                  </span>
                  <span className="text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.title}
                </h2>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                  {post.content.length > 150
                    ? `${post.content.substring(0, 150)}...`
                    : post.content}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-7 h-7 rounded-full"
                      src={
                        post.authorAvatar ||
                        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      }
                      alt="Author avatar"
                    />
                    <span className="font-medium dark:text-white">
                      {post.authorFullname || "Unknown Author"}
                    </span>
                  </div>
                  <Button
                    color="dark"
                    as={Link}
                    href={`/post/${post.id}`}
                    className="flex flex-row items-center"
                  >
                    Read more <MdOutlineKeyboardArrowRight className="ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
