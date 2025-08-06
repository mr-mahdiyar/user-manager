"use client";

import { refresh } from "@/services/auth";
import { useEffect, type PropsWithChildren } from "react";

export default function DashboardTemplate({ children }: PropsWithChildren) {
  
  useEffect(() => {
    refresh();
  }, []);

  return <>{children}</>;
}
