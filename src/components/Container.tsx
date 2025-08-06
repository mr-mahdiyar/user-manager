import clsx from "clsx";
import { ComponentPropsWithRef, type ReactNode, type PropsWithChildren } from "react";

interface ContainerProps extends Pick<ComponentPropsWithRef<"section">, "className"> {
  children: ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
  return <section className={clsx("container mx-auto", className)}>{children}</section>;
}

export function PageContainer({ children, className }: ContainerProps) {
  return <Container className={clsx("border h-full w-full rounded-3xl shadow-lg", className)}>{children}</Container>;
}
