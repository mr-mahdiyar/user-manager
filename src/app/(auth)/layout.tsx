"use client";

import { ToastProvider } from "@heroui/react";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <ToastProvider placement="bottom-left" />
      {children}
    </>
  );
}
