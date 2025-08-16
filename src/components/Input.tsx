"use client";

import { Input as HeroUiInput, InputProps as HeroUIInputProps } from "@heroui/input";
import { memo } from "react";

interface InputProps extends HeroUIInputProps {
  errorMessage?: string;
  isInvalid?: boolean;
}

function CustomInput(props: InputProps) {
  return (
    <HeroUiInput
      labelPlacement="outside"
      classNames={{
        errorMessage: "mt-2 text-red-500 font-bold",
      }}
      {...props}
    />
  );
}

export const Input = memo(CustomInput);
