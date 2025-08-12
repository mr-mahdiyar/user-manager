import clsx from "clsx";
import { ComponentProps } from "react";

type LoadingProps = Pick<ComponentProps<"section">, "className">;

export default function Loading({ className }: LoadingProps) {
  return <section className={clsx("loader", className)} />;
}
