import { initialBase, useSelectedBase } from "@/context/useSelectedBase";
import { Base } from "@/schema/base";
import { addBase, deleteBase, getBaseById, getBaseMembershipsAmount, getBases, updateBaseById } from "@/services/base";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useBaseMembershipsAmount(id: string) {
  const { isFetching, data, isError, error } = useQuery({
    queryFn: () => getBaseMembershipsAmount(id),
    queryKey: ["membershipsAmount", id],
  });

  return {
    isMembershipsAmountFetching: isFetching,
    membershipsAmount: data,
    wasFetchMembershipsFailure: isError,
    fetchMembershipsError: error,
  };
}

export function useDeleteBase(id: number) {
  const client = useQueryClient();
  const { selectedBase, setSelectedBase } = useSelectedBase();

  const { isPending, isSuccess, mutate, isError, error } = useMutation({
    mutationFn: () => deleteBase(id),
    mutationKey: ["deleteBase", id],
    onSuccess: () => {
      addToast({
        title: "حذف",
        description: "مرجع با موفقیت حذف شد.",
        color: "success",
      });

      client.invalidateQueries({
        queryKey: ["bases"],
      });

      setSelectedBase(initialBase);
    },
    onError: () => {
      addToast({
        title: "خطا",
        description: `حذف مرجع ${selectedBase.name} با خطا مواجه شد.`,
        color: "danger",
      });
      setSelectedBase(initialBase);
    },
  });

  return {
    isDeletingBase: isPending,
    deleteBase: mutate,
    wasDeletingBaseSuccessful: isSuccess,
    wasDeletingBaseFailure: isError,
    deletingError: error,
  };
}
