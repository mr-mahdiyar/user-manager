import clsx from "clsx";
import React, { ComponentPropsWithRef } from "react";

type InputProps = Pick<ComponentPropsWithRef<"input">, "className" | "onChange" | "type" | "placeholder" | "name">;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx("border-black/40 outline-none border rounded-lg p-1 focus:border-black", props.className)}
    />
  );
}
