"use client";

import { createContext, type PropsWithChildren, useState, useCallback, useContext } from "react";

const VisibilityCtx = createContext<boolean>(false);
const ToggleCtx = createContext<Function>(new Function());

export function VisibilityProvider({ children }: PropsWithChildren) {
  
  const [isVisible, toggle] = useState<boolean>(false);
  const toggleHandler = useCallback(() => toggle((prevToggle) => !prevToggle), []);

  return (
    <VisibilityCtx value={isVisible}>
      <ToggleCtx value={toggleHandler}>{children}</ToggleCtx>
    </VisibilityCtx>
  );
}

export function useVisibility() {
  const isVisible = useContext(VisibilityCtx);
  const toggle = useContext(ToggleCtx);

  return { isVisible, toggle };
}
