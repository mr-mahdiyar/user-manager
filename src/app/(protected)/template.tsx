"use client";
import { refresh } from "@/services/auth";
import { PropsWithChildren, useEffect } from "react";

import React from "react";

export default function template({ children }: PropsWithChildren) {
  useEffect(() => {
    refresh();
  }, []);

  return <>{children}</>;
}
