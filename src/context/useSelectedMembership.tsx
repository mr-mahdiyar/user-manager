"use client";

import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";
import { type User } from "@prisma/client";

export const initialUser: User = {
  baseId: -1,
  birthDate: new Date(),
  caseNumber: "",
  family: "",
  fatherName: "",
  membershipDate: new Date(),
  name: "",
  nationalCode: "",
  phone: "",
  statusId: -1,
};

const SelectedMembershipContext = createContext<User>(initialUser);
const SetSelectedMembershipContext = createContext<Function>(() => initialUser);

export function SelectedMembershipProvider({ children }: PropsWithChildren) {

  const [selectedMembership, setSelectedMembership] = useState<User>(initialUser);
  const handleChangeMembership = useCallback((user: User) => setSelectedMembership(user), []);

  return (
    <SelectedMembershipContext value={selectedMembership}>
      <SetSelectedMembershipContext value={handleChangeMembership}>{children}</SetSelectedMembershipContext>
    </SelectedMembershipContext>
  );
}

export function useSelectedMembership() {
  const selectedMembership = useContext(SelectedMembershipContext);
  const setSelectedMembership = useContext(SetSelectedMembershipContext);

  if (!selectedMembership || !setSelectedMembership) throw new Error("Selected ctx or set selected ctx not found.");

  return { selectedMembership, setSelectedMembership };
}
