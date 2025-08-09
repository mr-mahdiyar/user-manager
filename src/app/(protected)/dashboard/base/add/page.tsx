"use client";

import { Controller, useForm } from "react-hook-form";
import { Base, BaseSchema } from "@/schema/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageContainer } from "@/components/Container";
import { Button, addToast } from "@heroui/react";
import { useAddBase } from "@/hooks/base";
import { useEffect } from "react";
import { Input } from "@/components/Input";

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
      location: "",
      leader: ""
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
        className="w-96 flex flex-col gap-y-6 bg-cyan-400 p-12 rounded-lg"
        onSubmit={hookFormHandleSubmit(handleSubmit)}
      >
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="نام مرجع"
              labelPlacement="outside"
              classNames={{
                errorMessage: "mt-2 text-red-500 font-bold",
              }}
              placeholder="شهید رجایی"
              errorMessage={errors.name?.message || ""}
              isInvalid={!!errors.name}
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              label="روستا"
              {...field}
              placeholder="لطف آباد"
              errorMessage={errors.location?.message || ""}
              isInvalid={!!errors.location}
            />
          )}
          name="location"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              label="رئیس مرجع"
              {...field}
              placeholder="کاظم غلامرضایی"
              errorMessage={errors.leader?.message || ""}
              isInvalid={!!errors.leader}
            />
          )}
          name="leader"
        />
        <Button color="danger" type="submit" disabled={isAddBasePending}>
          {isAddBasePending ? "کمی صبر کنید..." : "تایید"}
        </Button>
      </form>
    </PageContainer>
  );
}
