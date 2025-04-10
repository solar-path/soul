import { Spinner } from "flowbite-react";

export const QSnipper = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Spinner color="failure" aria-label="Failure spinner example" />
    </div>
  );
};
