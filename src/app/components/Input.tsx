import clsx from "clsx";
import React, { ComponentPropsWithRef } from "react";

interface InputProps
  extends Pick<ComponentPropsWithRef<"input">, "className" | "onChange" | "type" | "placeholder" | "name"> {
  errorText?: string;
}
export default function Input({ errorText, ...props }: InputProps) {
  return (
    <>
      <input
        autoComplete="new-password"
        {...props}
        className={clsx("border-black/40 outline-none border rounded-lg p-1 focus:border-black", props.className)}
      />
      {Boolean(errorText) && <p className="text-red-500 text-sm">{errorText}</p>}
    </>
  );
}
