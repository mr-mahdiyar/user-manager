"use client";

import Container from "@/components/Container";
import { Input } from "@/components/Input";
import { Step1NationalCodeSchema, type Step1NationalCodeType } from "@/schema/user";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useFormContext, useFormState } from "react-hook-form";
import type { Step } from "./Form";

export default function Step1NationalCode({ setStep }: { setStep: (step: Step) => void }) {
  const { setValue, getValues } = useFormContext();

  const { control, handleSubmit: hookformSubmitHandler } = useForm<Step1NationalCodeType>({
    defaultValues: {
      nationalCode: getValues("nationalCode"),
    },
    mode: "all",
    resolver: zodResolver(Step1NationalCodeSchema),
  });

  const { errors, isValid } = useFormState({
    control,
  });

  async function handleSubmit({ nationalCode }: Step1NationalCodeType) {
    setStep("Step2CaseNumber");
    setValue("nationalCode", nationalCode);
  }

  return (
    <Container className="grid place-items-center items-center h-full">
      <form onSubmit={hookformSubmitHandler(handleSubmit)} className="w-96 grid gap-y-4">
        <p>کد ملی را وارد کنید.</p>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              isInvalid={Boolean(errors.nationalCode)}
              errorMessage={errors.nationalCode?.message}
              classNames={{
                input: "text-left",
              }}
            />
          )}
          name="nationalCode"
          control={control}
        />
        <Button type="submit" disabled={!isValid} color="primary" className="disabled:bg-gray-300">
          ادامه
        </Button>
      </form>
    </Container>
  );
}
