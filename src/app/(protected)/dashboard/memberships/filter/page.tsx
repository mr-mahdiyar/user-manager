"use client";

import { PageContainer } from "@/components/Container";
import { Input } from "@/components/Input";
import Pagination from "@/components/Pagination";
import SelectBase from "@/components/SelectBase";
import MembershipsList from "@/components/ui/membership/MembershipsList";
import { useSearchMemberships } from "@/hooks/memebership";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterParameters {
  firstName: string;
  lastName: string;
  nationalCode: string;
  caseNumber: string;
  baseId: number;
}
export default function page() {
  const [foundedUser, setFoundedUser] = useState<{ users: User[] | undefined; totalPages: number }>({
    users: [],
    totalPages: 0,
  });

  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const { replace } = useRouter();
  const urlSearchParams = new URLSearchParams();

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
      setFoundedUser({ users: [], totalPages: 1 });
      try {
        const memberships = await mutateAsync(data);
        setFoundedUser({
          users: memberships.users,
          totalPages: memberships.totalPages,
        });
      } catch (error) {
        console.error(error);
      } finally {
        urlSearchParams.set("pate", "1");
        replace(`${pathname}?${urlSearchParams.toString()}`);
      }
    });
  }

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    startTransition(async () => {
      const values = getValues();
      const memberships = await mutateAsync(values);
      setFoundedUser({
        users: memberships.users,
        totalPages: memberships.totalPages,
      });
    });
  }, [currentPage]);

  return (
    <PageContainer className="p-4 flex flex-col gap-y-8 ">
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
      <section className="grow flex justify-center items-center overflow-y-auto scrollbar">
        <MembershipsList memberships={foundedUser.users} isMembershipsFetching={isPending} />
      </section>
      <Pagination totalPages={foundedUser.totalPages} />
    </PageContainer>
  );
}
