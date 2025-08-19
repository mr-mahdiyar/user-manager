"use client";

import { useCallback, useState } from "react";
import Step1NationalCode from "./Step1NationalCode";
import Step2CaseNumber from "./Step2CaseNumber";
import Step3PersonalInfo from "./Step3PersonalInfo";

export type Step = "Step1NationalCode" | "Step2CaseNumber" | "Step3PersonalInfo";

export function MembershipForm({
  isCreateMode,
  isEditMode,
  searchedNationalCode,
}: {
  isCreateMode: boolean;
  isEditMode: boolean;
  searchedNationalCode: string;
}) {
  const [step, setStep] = useState<Step>("Step1NationalCode");
  const setStepCallback = useCallback((step: Step) => setStep(step), []);

  if (isCreateMode) {
    switch (step) {
      case "Step1NationalCode": {
        return <Step1NationalCode setStep={setStepCallback} />;
      }
      case "Step2CaseNumber": {
        return <Step2CaseNumber setStep={setStepCallback} />;
      }
      case "Step3PersonalInfo": {
        return <Step3PersonalInfo isCreateMode={isCreateMode} isEditMode={isEditMode} setStep={setStepCallback} />;
      }
    }
  } else {
    return (
      <Step3PersonalInfo
        isCreateMode={isCreateMode}
        searchedNationalCode={searchedNationalCode}
        isEditMode={isEditMode}
        setStep={setStepCallback}
      />
    );
  }
}
