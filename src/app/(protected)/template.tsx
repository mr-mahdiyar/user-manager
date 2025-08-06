"use client";

import QueryClientProvider from "@/lib/QueryClientProvider";
import { refresh } from "@/services/auth";
import { ToastProvider } from "@heroui/react";
import { useEffect, type PropsWithChildren } from "react";

export default function DashboardTemplate({ children }: PropsWithChildren) {
  useEffect(() => {
    refresh();
  }, []);

  return (
    <QueryClientProvider>
      <ToastProvider placement="bottom-left" />
      {children}
    </QueryClientProvider>
  );
}
