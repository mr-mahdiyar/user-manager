"use client";

import Container from "@/components/Container";
import { useBases } from "@/hooks/base";
import { useAddMembership, useMembership } from "@/hooks/memebership";
import {
  Step1NationalCodeType,
  Step2CaseNumberType,
  Step3PersonalInfoSchema,
  Step3PersonalInfoType,
} from "@/schema/user";
import { Input } from "@heroui/input";
import { Button, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import persianCalender from "react-date-object/calendars/persian";
import persianLanguageForCalender from "react-date-object/locales/persian_fa";
import { Controller, useForm, useFormContext } from "react-hook-form";
import DatePicker from "react-multi-date-picker";

export default function Step3PersonalInfo({
  searchedNationalCode,
  isEditMode,
}: {
  searchedNationalCode?: string;
  isEditMode: boolean;
}) {
  const { getValues, setValue: globalSetValue } = useFormContext<
    Step1NationalCodeType & Step2CaseNumberType & Step3PersonalInfoType
  >();

  const nationalCode = getValues("nationalCode");
  const caseNumber = getValues("caseNumber");
  const birthDate = getValues("birthDate");
  const membershipDate = getValues("membershipDate");

  const { bases, isFetchingBases } = useBases();
  const { isFetchingMembership, fetchMembershipError, membership, wasFetchingMembershipFailure } =
    useMembership(searchedNationalCode);

  const { addMemberShip } = useAddMembership();

  const {
    control,
    reset,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    getValues: localGetValues,
  } = useForm<Step3PersonalInfoType>({
    defaultValues: {
      baseId: undefined,
      birthDate: undefined,
      family: "",
      fatherName: "",
      membershipDate: null,
      name: "",
      phone: "",
      statusId: undefined,
    },
    mode: "all",
    resolver: zodResolver(Step3PersonalInfoSchema),
  });

  useEffect(() => {
    if (membership && isEditMode) {
      globalSetValue("caseNumber", membership.caseNumber);
      globalSetValue("nationalCode", membership.nationalCode);

      reset({
        ...membership,
        statusId: (membership.statusId = 0 ? 0 : 1),
      });
    }
  }, [membership]);

  useEffect(() => {
    if (isEditMode && bases && membership) {
      const id = bases.find(({ id }) => id === membership.baseId)?.id.toString();
      if (id) setValue("baseId", +id);
    }
  }, [isEditMode, bases, membership]);

  async function submitHandler(step3PersonalInfo: Step3PersonalInfoType) {
    try {
      addMemberShip({
        ...step3PersonalInfo,
        nationalCode,
        caseNumber,
      });
    } catch (error) {}
  }

  return (
    <Container className="grid place-items-center items-center h-full w-full p-8">
      <form className="w-full h-full flex flex-col gap-y-6 justify-center" onSubmit={hookFormSubmit(submitHandler)}>
        <section className="flex w-full gap-x-8">
          <Input
            disabled
            label="کد ملی"
            labelPlacement="outside-top"
            value={nationalCode}
            classNames={{
              base: "max-w-72",
              inputWrapper: "bg-[#CCCCCC]",
              input: "cursor-not-allowed text-left",
            }}
          />
          <Input
            disabled
            label="شماره پرونده"
            labelPlacement="outside-top"
            value={caseNumber}
            classNames={{
              base: "max-w-72",
              inputWrapper: "bg-[#CCCCCC]",
              input: "cursor-not-allowed",
            }}
          />
        </section>
        <section className="w-full grid grid-cols-3 gap-x-6">
          <Controller
            render={({ field }) => (
              <Input
                label="نام"
                labelPlacement="outside-top"
                {...field}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
            control={control}
            name="name"
          />
          <Controller
            render={({ field }) => (
              <Input
                label="نام خانوادگی"
                labelPlacement="outside-top"
                {...field}
                isInvalid={!!errors.family}
                errorMessage={errors.family?.message}
              />
            )}
            control={control}
            name="family"
          />
          <Controller
            render={({ field: { onChange, name } }) => (
              <section>
                <p className={clsx("text-right w-full text-sm mb-2", errors.birthDate ? "text-red-500" : "text-black")}>
                  تاریخ تولد
                </p>
                <section className="w-full">
                  <DatePicker
                    name={name}
                    value={birthDate}
                    calendar={persianCalender}
                    locale={persianLanguageForCalender}
                    onChange={(date) => {
                      onChange(date?.isValid ? date.toDate() : "");
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                    style={{
                      width: "100%",
                      padding: "1.22rem",
                      borderRadius: "0.9rem",
                      backgroundColor: errors.birthDate ? "#FEE7Ef" : "#F4F4F5",
                      border: "none",
                    }}
                  />
                  {errors.birthDate && <p className="text-red-500 text-xs mt-0.5 mr-1">{errors.birthDate?.message}</p>}
                </section>
              </section>
            )}
            name="birthDate"
            control={control}
          />
        </section>
        <section className="w-full grid grid-cols-3 gap-x-6">
          <Controller
            render={({ field }) => (
              <Input
                label="نام پدر"
                labelPlacement="outside-top"
                {...field}
                isInvalid={!!errors.fatherName}
                errorMessage={errors.fatherName?.message}
              />
            )}
            control={control}
            name="fatherName"
          />
          <Controller
            render={({ field }) => (
              <Input
                label="شماره تلفن"
                labelPlacement="outside-top"
                {...field}
                isInvalid={!!errors.phone}
                errorMessage={errors.phone?.message}
                classNames={{
                  input: "text-left",
                }}
              />
            )}
            control={control}
            name="phone"
          />
          <Controller
            render={({ field: { onChange, name } }) => (
              <section>
                <p className={clsx("text-right w-full text-sm mb-2")}>تاریخ عضویت</p>
                <section className="w-full">
                  <DatePicker
                    name={name}
                    value={membershipDate}
                    calendar={persianCalender}
                    locale={persianLanguageForCalender}
                    onChange={(date) => {
                      onChange(date?.isValid ? date.toDate() : "");
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                    style={{
                      width: "100%",
                      padding: "1.22rem",
                      borderRadius: "0.9rem",
                      // backgroundColor: errors.birthDate ? "#FEE7Ef" : "#E0E0E0",
                      backgroundColor: "#F4F4F5",
                      border: "none",
                    }}
                  />
                  {/* {errors.membershipDate && <p className="text-red-500 text-xs mt-0.5 mr-1">{errors.membershipDate?.message}</p>} */}
                </section>
              </section>
            )}
            name="membershipDate"
            control={control}
          />
        </section>

        <section className="w-full grid grid-cols-3 gap-x-6 items-center">
          <section>
            <RadioGroup
              defaultValue={"0"}
              label="وضعیت: "
              classNames={{
                wrapper: "flex-row",
                base: "flex-row",
              }}
              onChange={(e) => setValue("statusId", e.currentTarget.value === "0" ? 0 : 1)}
            >
              <Radio defaultChecked value="0">
                فعال
              </Radio>
              <Radio value="1">غیرفعال</Radio>
            </RadioGroup>
          </section>
          <Select
            className="max-w-xs"
            label="نام مرجع"
            labelPlacement="outside-left"
            selectedKeys={[localGetValues("baseId")?.toString() ?? ""]}
            placeholder={isFetchingBases ? "درحال بارگذاری..." : "یک مرجع را انتخاب کنید."}
            isDisabled={isFetchingBases}
            onChange={(e) => {
              setValue("baseId", +e.target.value);
              clearErrors("baseId");
            }}
            isInvalid={!!errors.baseId}
            errorMessage={errors.baseId?.message}
          >
            {bases ? bases?.map(({ id, name }) => <SelectItem key={id}>{name}</SelectItem>) : null}
          </Select>
        </section>
        <Button type="submit">تایید</Button>
      </form>
    </Container>
  );
}
