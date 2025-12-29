import { Button } from "@mui/material";
import classNames from "classnames";
import { FC, ReactNode } from "react";

interface StepChangerProviderProps {
  children?: ReactNode;
  step: number;
  onNext?: () => void;
  onPrev?: () => void;
}

const StepChangerProvider: FC<StepChangerProviderProps> = ({
  children,
  step,
  onNext,
  onPrev
}) => {
  return (
    <div className={classNames({
        "mt-6 flex gap-1": true,
        "justify-between": step != 0,
        "justify-end": step == 0,
    })}>
      {step != 0 && onPrev && (
        <Button variant="outlined" onClick={() => onPrev()}>
          مرحله قبلی
        </Button>
      )}
      <div className="flex gap-3">
        {step != 5 && step != 0 && onNext && (
          <Button variant="outlined" onClick={() => onNext()}>
            مرحله بعدی
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

export default StepChangerProvider;
