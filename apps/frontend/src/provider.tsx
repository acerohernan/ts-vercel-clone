import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/app/auth/context/provider";

import { Toaster } from "./components/ui/toaster";

import { ThemeProvider } from "./theme/provider";

const queryClient = new QueryClient();

const Provider = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Provider;
