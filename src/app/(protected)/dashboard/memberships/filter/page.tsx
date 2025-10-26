"use client";

import { PageContainer } from "@/components/Container";
import { Input } from "@/components/Input";
import SelectBase from "@/components/SelectBase";
import { Radio, RadioGroup } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useSearchMemberships } from "@/hooks/memebership";
import { useEffect, useState, useTransition } from "react";
import { User } from "../../../../../../generated/prisma";
import MembershipsList from "@/components/ui/membership/MembershipsList";

interface FilterParameters {
  firstName: string;
  lastName: string;
  nationalCode: string;
  caseNumber: string;
  // status: number;
  baseId: number;
}
export default function page() {
  const [foundedUser, setFoundedUser] = useState<User[] | undefined>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.log(foundedUser);
  }, [foundedUser]);

  const {
    getValues,
    setValue,
    formState: { errors },
    clearErrors,
    control,
    handleSubmit,
  } = useForm<FilterParameters>({
    defaultValues: {
      // status: 1,
      firstName: "",
      lastName: "",
      nationalCode: "",
      baseId: -1,
    },
  });

  const { mutateAsync } = useSearchMemberships();

  async function submit(data: FilterParameters) {
    startTransition(async () => {
      setFoundedUser([]);
      try {
        const response = await mutateAsync(data);
        setFoundedUser(response);
      } catch (error) {}
    });
  }

  return (
    <PageContainer className="p-4 flex flex-col gap-y-8">
      <form className="flex flex-col gap-y-8" onSubmit={handleSubmit(submit)}>
        <section className="flex gap-x-4">
          <Controller
            control={control}
            name="nationalCode"
            render={({ field }) => <Input {...field} placeholder="کد ملی" />}
          />
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => <Input {...field} placeholder="نام" />}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => <Input {...field} placeholder="نام خانوادگی" />}
          />
          <Controller
            control={control}
            name="caseNumber"
            render={({ field }) => <Input {...field} placeholder="شماره پرونده" />}
          />
        </section>
        <section className="flex gap-x-16 items-end">
          <section className="w-[300px]">
            <Controller
              control={control}
              name="baseId"
              render={({ field }) => (
                <SelectBase
                  getValues={getValues}
                  setValue={setValue}
                  errors={errors}
                  clearErrors={clearErrors}
                  {...field}
                />
              )}
            />
          </section>
          <button className="border w-90 p-1.5 rounded-lg cursor-pointer border-gray-300 hover:bg-gray-100">
            جست و جو
          </button>
        </section>
      </form>
      <section className="grow flex justify-center items-center">
        <MembershipsList memberships={foundedUser} isMembershipsFetching={isPending} />
      </section>
    </PageContainer>
  );
}
