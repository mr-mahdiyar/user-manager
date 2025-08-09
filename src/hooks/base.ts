import { Base } from "@/schema/base";
import { addBase, getBaseById, getBases, updateBaseById } from "@/services/base";
import { useMutation, useQuery } from "@tanstack/react-query";
export function useAddBase() {
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: ({ name, leader, location }: Pick<Base, "name" | "leader" | "location">) =>
      addBase({ name, leader, location }),
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
export function useBase(id: number, enabled: boolean) {
  const { isFetching, data, isError, error } = useQuery({
    queryFn: () => getBaseById(id),
    queryKey: ["base", id.toString()],
    enabled,
  });
  return { base: data, wasFetchingBaseFailure: isError, baseFetchingError: error, isFetchingBase: isFetching };
}

export function useUpdateBase(id: number) {
  const { isPending, data, isError, error, mutate, isSuccess } = useMutation({
    mutationFn: (base: Base) => updateBaseById(id, base),
    mutationKey: ["update-base", id.toString()],
  });

  return {
    isBaseUpdating: isPending,
    updatedData: data,
    wasUpdateBaseFailure: isError,
    updateBaseError: error,
    updateBase: mutate,
    wasUpdateBaseSuccessful: isSuccess,
  };
}
