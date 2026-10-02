import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./App";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Client-only rendering uses the theme effect, so the SSR bootstrap script stays inert. */}
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      scriptProps={{ type: "text/plain" }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
