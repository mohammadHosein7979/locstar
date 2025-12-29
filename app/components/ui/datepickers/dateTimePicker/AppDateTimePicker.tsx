import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ComponentProps, FC } from "react";
import { datePickerLabelsConfig } from "../config";

interface AppDateTimePickerProps extends ComponentProps<typeof DateTimePicker> {
  label: string;
}

const AppDateTimePicker: FC<AppDateTimePickerProps> = ({ label, ...props }) => {
  return (
    <div className="m-4">
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DateTimePicker localeText={datePickerLabelsConfig} label={label} {...props} />
      </LocalizationProvider>
    </div>
  );
};

export default AppDateTimePicker;
