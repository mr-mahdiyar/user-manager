"use client";

import { Base } from "@/schema/base";
import { addBase } from "@/services/base";
import { useMutation } from "@tanstack/react-query";

export function useAddBase() {
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: (name: Pick<Base, "name">) => addBase(name),
    mutationKey: ["addBase"],
  });

  return { isAddBasePending: isPending, addBase: mutate, wasAddBaseSuccessful: isSuccess, wasAddBaseFailure: isError };
}
