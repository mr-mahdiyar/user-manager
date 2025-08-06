"use client";

import { type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";

export default function QueryClientProvider({ children }: PropsWithChildren) {
  const client = new QueryClient();

  return <TanstackQueryClientProvider client={client}>{children}</TanstackQueryClientProvider>;
}
