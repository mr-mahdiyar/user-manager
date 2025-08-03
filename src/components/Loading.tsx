import clsx from "clsx";
import React, { ComponentProps, PropsWithChildren } from "react";

type LoadingProps = Pick<ComponentProps<"section">, "className">;

export default function Loading({ className }: LoadingProps) {
  return <section className={clsx("loader", className)} />;
}
