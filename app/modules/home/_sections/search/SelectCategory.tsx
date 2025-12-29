"use client";

import { SelectInput } from "@/app/components/ui";
import { useCategoryList } from "@/app/repository/categoryService";
import { useEffect, useState } from "react";

interface Option {
  id: number | string | boolean;
  label: string;
}

const SelectCategory = () => {
  const { data, isError, isLoading } = useCategoryList({ type: "location" });
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (data) {
      setOptions(
        data.data.map((item) => ({
          label: item.title,
          id: item.id,
        }))
      );
    }
  }, [data]);

  if (isError) return null;
  if (isLoading) return null;
  if (!data) return null;

  return <SelectInput label="دسته‌بندی" options={options} />;
};

export default SelectCategory;
