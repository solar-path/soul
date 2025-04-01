import { useEffect } from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { useFlashMessageStore, hideFlashMessage } from "./QFlashMessage.store";

export default function QFlashMessage() {
  const { state, type, message } = useFlashMessageStore();

  useEffect(() => {
    if (state === true) {
      const timer = setTimeout(() => {
        hideFlashMessage(); // Hide after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <>
      {state && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                type === "success"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {type === "success" ? "✅" : "❌"}
            </div>
            <div className="ml-3 text-sm font-normal">
              {message}
            </div>
            <ToastToggle />
          </Toast>
        </div>
      )}
    </>
  );
}
