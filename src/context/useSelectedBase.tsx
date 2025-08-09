"use client";

import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";
import { Base } from "@/../../generated/prisma";

const initialBase: Base = {
  id: -1,
  leader: "",
  location: "",
  name: "",
};

const SelectedBaseContext = createContext<Base>(initialBase);
const SetSelectedBaseContext = createContext<Function>(() => initialBase);

export function SelectedBaseProvider({ children }: PropsWithChildren) {
  const [selectedBase, setSelectedBase] = useState<Base>(initialBase);
  const handleChangeBase = useCallback((base: Base) => setSelectedBase(base), []);

  return (
    <SelectedBaseContext value={selectedBase}>
      <SetSelectedBaseContext value={handleChangeBase}>{children}</SetSelectedBaseContext>
    </SelectedBaseContext>
  );
}

export function useSelectedBase() {
  const selectedBase = useContext(SelectedBaseContext);
  const setSelectedBase = useContext(SetSelectedBaseContext);

  if (!selectedBase || !setSelectedBase) throw new Error("Selected ctx or set selected ctx not found.");

  return { selectedBase, setSelectedBase };
}
