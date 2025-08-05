"use client";

import Container from "@/components/Container";
import { logout, refresh } from "@/services/auth";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import React from "react";

export default function template({ children }: PropsWithChildren) {
  const { replace } = useRouter();

  useEffect(() => {
    refresh();
  }, []);

  async function clickHandler() {
    await logout();
    replace("/auth/login");
  }

  return (
    <Container className="flex h-dvh gap-x-8 items-center p-6">
      <nav className="flex flex-col gap-y-6 w-72 rounded-xl border bg-slate-200 p-4">
        <Link href={"/dashboard/members/add"} className="bg-lime-400 w-full block p-2 rounded-md text-center">
          افزودن کاربر
        </Link>
        <Link href={"/dashboard/members/search"} className="bg-amber-500 w-full block p-2 rounded-md text-center">
          جست و جوی کاربر
        </Link>
        <Link href={"/dashboard/admin/edit"} className="bg-primary/70 w-full block p-2 rounded-md text-center">
          ویرایش اطلاعات ادمین
        </Link>
        <Button className="bg-rose-500 w-full block p-2 rounded-md cursor-pointer" onPressEnd={clickHandler}>
          خروج
        </Button>
      </nav>
      {children}
    </Container>
  );
}
