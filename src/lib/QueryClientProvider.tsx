"use client";

import { type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <TanstackQueryClientProvider client={client}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </TanstackQueryClientProvider>
  );
}
