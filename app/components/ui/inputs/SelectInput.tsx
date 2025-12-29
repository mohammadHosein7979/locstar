import { Autocomplete, TextField } from "@mui/material";
import { FC } from "react";

interface Option {
  id: number | string | boolean;
  label: string;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  value?: Option | Option[] | null;
  onChange?: (value: Option | Option[] | null) => void;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const SelectInput: FC<SelectInputProps> = ({
  label,
  options,
  value = null,
  onChange = () => {},
  multiple = false,
  placeholder,
  disabled = false,
}) => {
  return (
    <Autocomplete
      className="my-4"
      options={options}
      value={value as any}
      multiple={multiple}
      disabled={disabled}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
    />
  );
};

export default SelectInput;
