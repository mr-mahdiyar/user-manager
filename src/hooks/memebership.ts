"use client";

import { type User } from "@/../../generated/prisma";
import { addMembership, getMembershipByNationalCode, getMemberships } from "@/services/membership";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    queryFn: getMemberships,
    queryKey: ["memberships"],
  });

  return {
    isMembershipsFetching: isFetching,
    memberships: data,
    wasGetMembershipsFailure: isError,
    gettingMembershipsError: error,
  };
  
}
