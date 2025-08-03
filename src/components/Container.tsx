import clsx from "clsx";
import { ComponentPropsWithRef, type ReactNode } from "react";

interface ContainerProps extends Pick<ComponentPropsWithRef<"section">, "className"> {
  children: ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
  return <section className={clsx("container mx-auto", className)}>{children}</section>;
}
