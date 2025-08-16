"use client";

import { type User } from "@/../../generated/prisma";
import { addMembership, getMembershipByNationalCode } from "@/services/membership";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddMembership() {
  const { isSuccess, isPending, error, isError, mutate } = useMutation({
    mutationFn: (newMember: Omit<User, "id">) => addMembership(newMember),
    mutationKey: ["addMembership"],
    onSuccess: () => console.log("added"),
    onError: (error, variables) => {
      console.error(error);
      console.log("here is variables: ", variables);
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
    queryKey: ["getMembership"],
    enabled: !!searchedNationalCode,
  });

  return {
    membership: data,
    isFetchingMembership: isFetching,
    wasFetchingMembershipFailure: isError,
    fetchMembershipError: error,
  };
}
