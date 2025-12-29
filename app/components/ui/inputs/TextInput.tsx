import { InputVariantType } from "@/app/types/types";
import { TextField } from "@mui/material";
import React, { ComponentProps, FC } from "react";

interface TextInputProps extends ComponentProps<typeof TextField> {
  label: string;
  variant?: InputVariantType;
}

const TextInput: FC<TextInputProps> = ({
  label,
  variant = "outlined",
  ...props
}) => {
  return (
    <div className="mt-4 mb-2">
      <TextField
        id="outlined-basic"
        label={label}
        variant={variant}
        {...props}
      />
    </div>
  );
};

export default TextInput;
