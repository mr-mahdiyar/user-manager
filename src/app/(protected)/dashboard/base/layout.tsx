"use client";

import Container from "@/components/Container";
import { SelectedBaseProvider } from "@/context/useSelectedBase";
import { VisibilityProvider } from "@/context/useVisibility";
import { logout } from "@/services/auth";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

import React from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { replace } = useRouter();

  async function clickHandler() {
    await logout();
    replace("/auth/login");
  }

  return (
    <Container className="flex h-dvh gap-x-8 items-center p-6">
      <nav className="flex flex-col gap-y-6 w-72 rounded-xl border bg-slate-200 p-4">
        <Link href={"/dashboard/base/add"} className="bg-lime-400 w-full block p-2 rounded-md text-center">
          افزودن مرجع
        </Link>
        <Link href={"/dashboard/base"} className="bg-amber-500 w-full block p-2 rounded-md text-center">
          لیست مراجع
        </Link>
        <Link href={"/dashboard/memberships"} className="bg-fuchsia-400 w-full block p-2 rounded-md text-center">
          لیست اعضا
        </Link>
        <Button className="bg-rose-500 w-full block p-2 rounded-md cursor-pointer" onPressEnd={clickHandler}>
          خروج
        </Button>
      </nav>
      <SelectedBaseProvider>
        <VisibilityProvider>
          {children}
        </VisibilityProvider>
      </SelectedBaseProvider>
    </Container>
  );
}
