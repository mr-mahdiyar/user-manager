"use client";

import Container from "@/components/Container";
import { Input } from "@/components/Input";
import { Step2CaseNumberSchema, type Step2CaseNumberType } from "@/schema/user";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useFormContext, useFormState } from "react-hook-form";
import { type Step } from "./Form";

export default function Step2CaseNumber({ setStep }: { setStep: (step: Step) => void }) {
  const { setValue, getValues } = useFormContext();

  const { control, handleSubmit: hookformSubmitHandler } = useForm<Step2CaseNumberType>({
    defaultValues: {
      caseNumber: getValues("caseNumber"),
    },
    mode: "all",
    resolver: zodResolver(Step2CaseNumberSchema),
  });

  const { errors, isValid } = useFormState({
    control,
  });

  async function handleSubmit({ caseNumber }: Step2CaseNumberType) {
    setValue("caseNumber", caseNumber);
    setStep("Step3PersonalInfo");
  }

  function handleGoToPreviousStepButtonClick() {
    setStep("Step1NationalCode");
  }

  return (
    <Container className="grid place-items-center items-center h-full">
      <form onSubmit={hookformSubmitHandler(handleSubmit)} className="w-96 grid gap-y-4">
        <p>شماره پرونده را وارد کنید.</p>
        <Controller
          render={({ field }) => (
            <Input
              dir="ltr"
              {...field}
              isInvalid={Boolean(errors.caseNumber)}
              errorMessage={errors.caseNumber?.message}
              classNames={{
                input: "text-left",
              }}
            />
          )}
          name="caseNumber"
          control={control}
        />
        <section className="flex justify-between gap-x-2">
          <Button
            type="button"
            color="primary"
            className="disabled:bg-gray-300 w-full"
            onPress={handleGoToPreviousStepButtonClick}
          >
            بازگشت
          </Button>
          <Button type="submit" disabled={!isValid} color="primary" className="disabled:bg-gray-300 w-full">
            ادامه
          </Button>
        </section>
      </form>
    </Container>
  );
}
