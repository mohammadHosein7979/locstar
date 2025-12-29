"use client";

import { SelectInput } from "@/app/components/ui";
import { useCityList } from "@/app/repository/cityService";
import { useEffect, useState } from "react";

interface Option {
  id: number | string | boolean;
  label: string;
}

const SelectCity = () => {
  const { data, isError, isLoading } = useCityList();
  const [options, setOptions] = useState<Option[]>([]);

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

  return <SelectInput label="شهر" options={options} />;
};

export default SelectCity;
