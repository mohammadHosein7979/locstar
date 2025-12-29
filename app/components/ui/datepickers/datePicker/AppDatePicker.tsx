import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ComponentProps, FC } from "react";
import { datePickerLabelsConfig } from "../config";

interface AppDatePickerProps extends ComponentProps<typeof DatePicker> {
  label: string;
}

const AppDatePicker: FC<AppDatePickerProps> = ({ label, ...props }) => {
  return (
    <div className="m-4">
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DatePicker localeText={datePickerLabelsConfig} label={label} {...props} />
      </LocalizationProvider>
    </div>
  );
};

export default AppDatePicker;
