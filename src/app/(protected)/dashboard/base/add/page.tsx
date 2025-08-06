"use client";

import { Controller, useForm } from "react-hook-form";
import { Base, BaseSchema } from "@/schema/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import  { PageContainer } from "@/components/Container";
import { Button, addToast } from "@heroui/react";
import { useAddBase } from "@/hooks/base";
import { useEffect } from "react";

export default function AddBasePage() {
  const { addBase, wasAddBaseSuccessful, isAddBasePending, wasAddBaseFailure } = useAddBase();

  const {
    control,
    reset,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<Base>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(BaseSchema),
  });

  useEffect(() => {
    if (wasAddBaseSuccessful) {
      addToast({
        title: "عملیات موفق",
        description: "مرجع با موفقیت اضافه شد.",
        color: "success",
      });
    }
  }, [wasAddBaseSuccessful]);

  useEffect(() => {
    if (wasAddBaseFailure) {
      addToast({
        title: "عملیات ناموفق",
        description: "مرجع اضافه نشد.",
        color: "danger",
      });
    }
  }, [wasAddBaseFailure]);
  async function handleSubmit(data: Base) {
    try {
      addBase(data);
      if (wasAddBaseSuccessful) reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <PageContainer className="flex justify-center items-center">
      <form
        className="w-96 flex flex-col gap-y-8 bg-cyan-400 p-12 rounded-lg"
        onSubmit={hookFormHandleSubmit(handleSubmit)}
      >
        <p>نام مرجع را وارد کنید.</p>
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              classNames={{
                errorMessage: "mt-2 text-red-500 font-bold",
              }}
              placeholder="شهید رجایی لطف آباد"
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
            />
          )}
          name="name"
        />
        <Button color="danger" type="submit" disabled={isAddBasePending}>
          {isAddBasePending ? "کمی صبر کنید..." : "تایید"}
        </Button>
      </form>
    </PageContainer>
  );
}
