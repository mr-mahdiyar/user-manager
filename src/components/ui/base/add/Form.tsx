"use client";

import { Input } from "@/components/Input";
import { useAddBase, useBase, useUpdateBase } from "@/hooks/base";
import { Base, BaseSchema } from "@/schema/base";
import { Button, Spinner, addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormProps {
  slug: Array<string>;
}

export default function Form({ slug }: FormProps) {
  
  const [mode, baseId = -1] = slug;

  const { addBase, wasAddBaseSuccessful, isAddBasePending, wasAddBaseFailure } = useAddBase();
  const { base, isFetchingBase } = useBase(Number(baseId), mode === "edit");
  const { updateBase, isBaseUpdating, wasUpdateBaseFailure, wasUpdateBaseSuccessful } = useUpdateBase(Number(baseId));

  const {
    control,
    reset,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<Base>({
    defaultValues: { leader: "", location: "", name: "" },
    resolver: zodResolver(BaseSchema),
  });

  useEffect(() => {
    if (mode === "edit" && base) {
      reset(base);
    }
  }, [baseId, mode, base]);

  useEffect(() => {
    if (wasAddBaseSuccessful || wasUpdateBaseSuccessful) {
      addToast({
        title: "عملیات موفق",
        description: mode === "edit" ? "مرجع با موفقیت ویرایش شد." : "مرجع با موفقیت اضافه شد.",
        color: "success",
      });
      mode !== "edit" && reset();
    }
  }, [wasAddBaseSuccessful, wasUpdateBaseSuccessful]);

  useEffect(() => {
    if (wasAddBaseFailure || wasUpdateBaseFailure) {
      addToast({
        title: "عملیات ناموفق",
        description: mode === "edit" ? "مرجع بروز نشد." : "مرجع اضافه نشد.",
        color: "danger",
      });
    }
  }, [wasAddBaseFailure, wasUpdateBaseFailure]);

  async function handleSubmit(data: Base) {
    try {
      if (mode === "edit") updateBase(data);
      else addBase(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (mode === "edit" && isFetchingBase) {
    return <Spinner color="primary" />;
  }

  const buttonText = (() => {
    if (isAddBasePending || isBaseUpdating) return "کمی صبر کنید...";
    else if (mode === "edit") return "ویرایش";
    return "افزودن";
  })();

  return (
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
            placeholder="شهید رجایی"
            labelPlacement="outside"
            classNames={{
              errorMessage: "mt-2 text-red-500 font-bold",
            }}
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
        {buttonText}
      </Button>
    </form>
  );
}
