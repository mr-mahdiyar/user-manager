"use client";

import { type User } from "@/../../generated/prisma";
import { addMembership } from "@/services/membership";
import { useMutation } from "@tanstack/react-query";

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
