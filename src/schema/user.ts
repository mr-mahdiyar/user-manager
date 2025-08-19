import { checkCaseNumberExistence, checkNationalCodeExistence } from "@/services/membership";
import { z } from "zod";

export const Step1NationalCodeSchema = z
  .object({
    nationalCode: z
      .string("وارد کردن کد ملی الزامیست.")
      .length(10, "کد ملی باید ده رقمی باشد")
      .regex(/^\d+$/, "کد ملی باید فقط شامل اعداد باشد."),
  })
  .refine(
    async ({ nationalCode }) => {
      const isNationalCoedAlreadyExist = await checkNationalCodeExistence(nationalCode);
      return isNationalCoedAlreadyExist;
    },
    {
      path: ["nationalCode"],
      error: "شخصی با این کد ملی از قبل ثبت نام شده است.",
    }
  );

export type Step1NationalCodeType = z.infer<typeof Step1NationalCodeSchema>;

export const Step2CaseNumberSchema = z
  .object({
    caseNumber: z.string("وارد کردن شماره پرونده الزامیست.").length(10, "شماره پرونده باید شامل ده کاراکتر باشد."),
  })
  .refine(
    async ({ caseNumber }) => {
      const isNationalCoedAlreadyExist = await checkCaseNumberExistence(caseNumber);
      return isNationalCoedAlreadyExist;
    },
    {
      error: "پرونده ای با این شماره قبلا ثبت شده است.",
      path: ["caseNumber"]
    }
  );

export type Step2CaseNumberType = z.infer<typeof Step2CaseNumberSchema>;

export const Step3PersonalInfoSchema = z.object({
  name: z.string("وارد کردن نام الزامیست.").min(2, "نام وارد شده باید حداقل شامل دو کاراکتر باشد."),
  family: z.string("وارد کردن نام خانوادگی الزامیست.").min(3, "نام خانوادگی وارد شده باید حداقل شامل سه کاراکتر باشد."),
  fatherName: z.string("وارد کردن نام پدر الزامیست.").min(3, "نام پدر باید حداقل شامل سه کاراکتر باشد."),
  phone: z.string("وارد کردن شماره تلفن الزامیست.").regex(/^09\d{9}$/, "شماره تلفن وارد شده نا معتبر است."),
  birthDate: z.date("وارد کردن تاریخ تولد الزامیست"),
  membershipDate: z.date().or(z.null()),
  statusId: z.literal(0).or(z.literal(1)),
  baseId: z.number("انتخاب مرجع الزامیست."),
});

export type Step3PersonalInfoType = z.infer<typeof Step3PersonalInfoSchema>;
