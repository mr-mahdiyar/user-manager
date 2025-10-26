"use client";

import { useBases } from "@/hooks/base";
import { Select, SelectItem } from "@heroui/react";
import { ChangeEvent } from "react";
import type {
  FieldValues,
  FormState,
  Path,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetValue,
  PathValue,
} from "react-hook-form";

interface Props<T extends FieldValues & { baseId: number } = { baseId: number }> {
  clearErrors?: UseFormClearErrors<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  errors?: FormState<T>["errors"];
}

export default function SelectBase<T extends FieldValues & { baseId: number } = { baseId: number }>({
  clearErrors,
  getValues,
  setValue,
  errors,
}: Props<T>) {
  const { bases, isFetchingBases } = useBases();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (!setValue || !clearErrors) return;

    setValue("baseId" as Path<T>, +e.target.value as PathValue<T, Path<T>>);
    clearErrors("baseId" as Path<T>);
  }

  return (
    <Select
      className="w-full"
      label="نام مرجع"
      labelPlacement="outside"
      selectedKeys={[getValues?.("baseId" as Path<T>)?.toString() ?? ""]}
      placeholder={isFetchingBases ? "درحال بارگذاری..." : "یک مرجع را انتخاب کنید."}
      isDisabled={isFetchingBases}
      onChange={handleChange}
      isInvalid={!!errors?.baseId}
      errorMessage={errors?.baseId?.message as string}
    >
      {bases ? bases?.map(({ id, name }) => <SelectItem key={id}>{name}</SelectItem>) : null}
    </Select>
  );
}
