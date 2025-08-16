"use client";

import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function MemberShipLayout({ children }: { children: PropsWithChildren }) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <>{children}</>
    </FormProvider>
  );
}
