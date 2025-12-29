"use client";

import { useCategoryList } from "@/app/repository/categoryService";
import {
  updateCategories
} from "@/app/repository/ownerLocationService";
import { OwnerLocation } from "@/app/types/model";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import StepChangerProvider from "./_sections/StepChangerProvider";

interface CategoryProps {
  location?: OwnerLocation;
  onNext: () => void;
  onPrev: () => void;
}

const updateCategory = async (
  data: { categories: number[] },
  id?: number
) => {
  const response = await updateCategories(data, id);
  return response.data;
};

const Category: FC<CategoryProps> = ({ location, onNext, onPrev }) => {
  const { data, isLoading, isError } = useCategoryList({ type: "location" });
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    if (location?.categories) {
      setSelected(location.categories.map((c: any) => c.id));
    }
  }, [location]);

  const toggleCategory = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { categories: number[] }) =>
      updateCategory(data, location?.id),
    onSuccess: () => onNext(),
    onError: (error) => console.error("❌ خطا در ذخیره:", error),
  });

  const handleSave = () => {
    mutate({ categories: selected });
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (isError) return <div>خطا در دریافت دسته‌بندی‌ها</div>;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data?.data.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => toggleCategory(category.id)}
            className={`flex items-center gap-2 p-3 border rounded-xl transition 
              ${
                selected.includes(category.id)
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            <i className={category.icon}></i>
            <span>{category.title}</span>
          </button>
        ))}
      </div>

      <StepChangerProvider onNext={onNext} onPrev={onPrev} step={2}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={selected.length === 0 || isPending}
        >
          {isPending ? "در حال ذخیره..." : "ذخیره و ادامه"}
        </Button>
      </StepChangerProvider>
    </div>
  );
};

export default Category;
