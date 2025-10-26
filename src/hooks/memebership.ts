"use client";

import { type User } from "@prisma/client";
import { initialUser, useSelectedMembership } from "@/context/useSelectedMembership";
import {
  addMembership,
  deleteMembership,
  getMembershipByNationalCode,
  getMemberships,
  searchMemberships,
} from "@/services/membership";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useAddMembership() {
  const { push } = useRouter();

  const { isSuccess, isPending, error, isError, mutate } = useMutation({
    mutationFn: (newMember: Omit<User, "id">) => addMembership(newMember),
    mutationKey: ["addMembership"],
    onSuccess: () => {
      addToast({
        title: "موفق",
        description: "عضو با موفقیت اضافه / ویرایش شد.",
        color: "success",
      });
      push("/dashboard/memberships");
    },
    onError: () => {
      addToast({
        title: "ناموفق",
        description: "عضو اضافه / ویرایش نشد.",
        color: "danger",
      });
    },
  });

  return {
    wasAddMembershipSuccessful: isSuccess,
    isAddingMembership: isPending,
    addMembershipError: error,
    wasAddMembershipFailure: isError,
    addMemberShip: mutate,
  };
}

export function useMembership(searchedNationalCode: string = "") {
  const { isFetching, data, isError, error } = useQuery({
    queryFn: () => getMembershipByNationalCode(searchedNationalCode),
    queryKey: ["getMembership", searchedNationalCode],
    enabled: !!searchedNationalCode,
  });

  return {
    membership: data,
    isFetchingMembership: isFetching,
    wasFetchingMembershipFailure: isError,
    fetchMembershipError: error,
  };
}

export function useMemberships() {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["memberships"],
    queryFn: getMemberships,
  });

  return {
    isMembershipsFetching: isFetching,
    memberships: data,
    wasGetMembershipsFailure: isError,
    gettingMembershipsError: error,
  };
}

export function useDeleteMembership(nationalCode: string) {
  const client = useQueryClient();
  const { selectedMembership, setSelectedMembership } = useSelectedMembership();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: () => deleteMembership(nationalCode),
    mutationKey: ["deleteMembership", nationalCode],
    onSuccess: () => {
      const fullName = selectedMembership.name + " " + selectedMembership.family;

      addToast({
        title: "حذف",
        description: `${fullName} با موفقیت حذف شد.`,
        color: "success",
      });
      setSelectedMembership(initialUser);
      client.invalidateQueries({
        queryKey: ["memberships"],
      });
    },
    onError: () => {
      const fullName = selectedMembership.name + " " + selectedMembership.family;

      addToast({
        title: "خطا",
        description: `حذف ${fullName} با خطا مواجه شد.`,
        color: "danger",
      });
      setSelectedMembership(initialUser);
    },
  });

  return { deleteMembership: mutate, isDeletingMembership: isPending, wasDeletingMembershipSuccessful: isSuccess };
}

export function useSearchMemberships() {
  const { mutateAsync } = useMutation({
    mutationFn: (filters: {
      firstName: string;
      lastName: string;
      nationalCode: string;
      caseNumber: string;
      baseId: number;
    }) => searchMemberships(filters),
  });
  return { mutateAsync };
}
