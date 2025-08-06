"use client";

import { Base } from "@/schema/base";
import { addBase, getBases } from "@/services/base";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddBase() {
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: (name: Pick<Base, "name">) => addBase(name),
    mutationKey: ["addBase"],
  });

  return { isAddBasePending: isPending, addBase: mutate, wasAddBaseSuccessful: isSuccess, wasAddBaseFailure: isError };
}

export function useBases() {
  
  const { isFetching, data, isError, error } = useQuery({
    queryFn: getBases,
    queryKey: ["bases"],
  });

  return { bases: data, wasFetchingBasesFailure: isError, basesFetchingError: error, isFetchingBases: isFetching };
}
