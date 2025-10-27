"use client";

import Container from "@/components/Container";
import SelectBase from "@/components/SelectBase";
import { useBases } from "@/hooks/base";
import { useAddMembership, useMembership } from "@/hooks/memebership";
import {
  type Step1NationalCodeType,
  type Step2CaseNumberType,
  Step3PersonalInfoSchema,
  type Step3PersonalInfoType,
} from "@/schema/user";
import { Input } from "@heroui/input";
import { Button, Radio, RadioGroup, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import persianCalender from "react-date-object/calendars/persian";
import persianLanguageForCalender from "react-date-object/locales/persian_fa";
import { Controller, useForm, useFormContext } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import { Step } from "./Form";

interface Step3PersonalInfoProps {
  searchedNationalCode?: string;
  isEditMode: boolean;
  isCreateMode: boolean;
  setStep: (step: Step) => void;
}

export default function Step3PersonalInfo(props: Step3PersonalInfoProps) {
  const { getValues: globalGetValues, setValue: globalSetValue } = useFormContext<
    Step1NationalCodeType & Step2CaseNumberType & Step3PersonalInfoType
  >();
  const { isCreateMode, isEditMode, setStep, searchedNationalCode } = props;
  const { bases, isFetchingBases } = useBases();
  const { isFetchingMembership, membership, wasFetchingMembershipFailure } = useMembership(searchedNationalCode);

  const { addMemberShip, isAddingMembership } = useAddMembership();

  const {
    control,
    reset,
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
    setValue: localSetValue,
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
      status: 1,
    },
    mode: "all",
    resolver: zodResolver(Step3PersonalInfoSchema),
  });

  const nationalCode = globalGetValues("nationalCode");
  const caseNumber = globalGetValues("caseNumber");
  const membershipDate = localGetValues("membershipDate");
  const birthDate = localGetValues("birthDate");

  useEffect(() => {
    if (membership && isEditMode) {
      globalSetValue("caseNumber", membership.caseNumber);
      globalSetValue("nationalCode", membership.nationalCode);
      reset({
        ...membership,
        status: membership.status as 0 | 1 | 2,
      });
    }
  }, [membership]);

  useEffect(() => {
    if (isEditMode && bases && membership) {
      const id = bases.find(({ id }) => id === membership.baseId)?.id.toString();
      if (id) localSetValue("baseId", +id);
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

  if (isEditMode && isFetchingMembership)
    return (
      <Container className="w-full h-full flex items-center justify-center">
        <Spinner color="primary" />
      </Container>
    );

  if (isEditMode && wasFetchingMembershipFailure)
    return (
      <Container className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">کاربر یافت نشد.</p>
      </Container>
    );

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
              value={localGetValues("status")?.toString() ?? "1"}
              onValueChange={(e) => {
                const prevMembershipData = localGetValues();
                reset(
                  { ...prevMembershipData, status: +e as 0 | 1 | 2 },
                  {
                    keepDirty: true,
                    keepTouched: true,
                    keepErrors: true,
                    keepIsSubmitted: true,
                    keepIsValid: true,
                  }
                );
              }}
              label="وضعیت: "
              classNames={{
                wrapper: "flex-row",
                base: "flex-row",
              }}
            >
              <Radio value="1">فعال</Radio>
              <Radio value="0">غیرفعال</Radio>
              <Radio value="2">راکد</Radio>
            </RadioGroup>
          </section>
          <SelectBase clearErrors={clearErrors} errors={errors} getValues={localGetValues} setValue={localSetValue} />
        </section>
        <section className="flex gap-x-6">
          {isCreateMode && (
            <Button
              className="w-full text-white"
              type="button"
              onClick={() => setStep("Step2CaseNumber")}
              color="warning"
            >
              بازگشت
            </Button>
          )}
          <Button
            className="w-full"
            type="submit"
            color="primary"
            isLoading={isAddingMembership}
            disabled={isAddingMembership}
          >
            تایید
          </Button>
        </section>
      </form>
    </Container>
  );
}
