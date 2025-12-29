"use client";

import { useFeatureList } from "@/app/repository/locationService";
import { updateFetures } from "@/app/repository/ownerLocationService";
import { OwnerLocation } from "@/app/types/model";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import StepChangerProvider from "./_sections/StepChangerProvider";

interface FeatureProps {
  location?: OwnerLocation;
  onNext: () => void;
  onPrev: () => void;
}

const updateFeture = async (
  data: { features: number[] },
  id?: number
) => {
  const response = await updateFetures(data, id);
  return response.data;
};

const Features: FC<FeatureProps> = ({ onNext, location, onPrev }) => {
  const { data, isLoading, isError } = useFeatureList();
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    if (location?.features) {
      setSelected(location.features.map((f: any) => f.id));
    }
  }, [location]);

  const toggleFeature = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { features: number[] }) =>
      updateFeture(data, location?.id),
    onSuccess: () => onNext(),
    onError: (error) => console.error("❌ خطا در ذخیره:", error),
  });

  const handleSave = () => {
    mutate({ features: selected });
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (isError) return <div>خطا در دریافت دسته‌بندی‌ها</div>;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data?.data.map((feature) => (
          <button
            key={feature.id}
            type="button"
            onClick={() => toggleFeature(feature.id)}
            className={`flex items-center gap-2 p-3 border rounded-xl transition 
              ${
                selected.includes(feature.id)
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            <i className={feature.icon}></i>
            <span>{feature.title}</span>
          </button>
        ))}
      </div>

      <StepChangerProvider onNext={onNext} onPrev={onPrev} step={3}>
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

export default Features;
