"use client";

import { SelectInput } from "@/app/components/ui";
import { useCityList } from "@/app/repository/cityService";
import { FC, useEffect, useState } from "react";

interface SelectCityProps {
  onSelectCity?: (value: any) => void;
  value?: number;
}

const SelectCity: FC<SelectCityProps> = ({ onSelectCity, value }) => {
  const { data, isError, isLoading } = useCityList();
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setOptions(
        data.data.map((item) => ({
          label: item.name,
          id: item.id,
        }))
      );
    }
  }, [data]);

  if (isError) return null;
  if (isLoading) return null;
  if (!data) return null;

  return (
    <SelectInput
      label="شهر"
      options={options}
      value={options.find((opt) => opt.id === value) || null}
      onChange={(val: any) => {
        if (val && val.id) {
          onSelectCity?.(val.id);
        } else {
          onSelectCity?.(null);
        }
      }}
    />
  );
};

export default SelectCity;
