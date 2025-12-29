"use client";

import { mobileWidth } from "@/app/constants/constats";
import { getOwnerLocation } from "@/app/repository/ownerLocationService";
import { OwnerLocation } from "@/app/types/model";
import { Step, StepButton, Stepper, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import Address from "./Address";
import Category from "./Category";
import Docs from "./Docs";
import ExtraInfo from "./ExtraInfo";
import Features from "./Features";
import Information from "./Information";
import Media from "./Media";

const steps = [
  "اطلاعات اصلی",
  "اطلاعات ارتباطی",
  "نشانی",
  "دسته بندی",
  "امکانات",
  "تصاویر",
  "مدارک",
  // "قیمت",
];

const AddLocationSource: FC<{ id?: number }> = ({ id }) => {
  const router = useRouter();
  const isMobile = useMediaQuery(mobileWidth);

  const [activeStep, setActiveStep] = useState(0);
  const [location, setLocation] = useState<OwnerLocation>();
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

  const finish = () => {
    router.push("/profile/owner-location");
  };

  const handleStepComplete = (step: number) => {
    setCompleted((prev) => ({ ...prev, [step]: true }));
    setActiveStep(step + 1);
  };

  useEffect(() => {
    if (id) {
      getOwnerLocation(id)
        .then((res) => setLocation(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const stepPane = useMemo(
    () => [
      <Information key="information" location={location} onNext={() => handleStepComplete(0)} />,
      <ExtraInfo key="extra" location={location} onNext={() => handleStepComplete(1)} onPrev={() => handleStep(0)} />,
      <Address key="address" location={location} onNext={() => handleStepComplete(2)} onPrev={() => handleStep(1)} />,
      <Category key="category" location={location} onNext={() => handleStepComplete(3)} onPrev={() => handleStep(2)} />,
      <Features key="features" location={location} onNext={() => handleStepComplete(4)} onPrev={() => handleStep(3)} />,
      <Media key="media" location={location} onNext={() => handleStepComplete(5)} onPrev={() => handleStep(4)} />,
      <Docs key="docs" location={location} onNext={finish} onPrev={() => handleStep(5)} />,
    ],
    [location, handleStepComplete, handleStep, finish]
  );

  return (
    <div className="w-full px-6 md:px-20 py-4 md:py-8">
      <div className="font-bold text-xl text-center my-4">میزبان شو</div>
      {!isMobile ? (
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      ) : (
        <div className="text-center my-2">{steps[activeStep]}</div>
      )}

      <div className="mt-4">{stepPane[activeStep]}</div>
    </div>
  );
};

export default AddLocationSource;
