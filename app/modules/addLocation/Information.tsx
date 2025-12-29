"use client";

import { TextInput } from "@/app/components/ui";
import ImageUpload from "@/app/components/ui/inputs/FileInput";
import { addLocation } from "@/app/repository/ownerLocationService";
import { OwnerLocation } from "@/app/types/model";
import { Button, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import SelectCity from "./_sections/SelectCity";
import StepChangerProvider from "./_sections/StepChangerProvider";
import { AddInformationLocation } from "./_types/dto";

interface InformationProps {
  location?: OwnerLocation;
  onNext: () => void;
}

const TextEditor = dynamic(() => import("@/app/components/ui/inputs/TextEditor"), { ssr: false });
const updateLocation = async (formData: FormData, id?: number) => {
  const response = await addLocation(formData, id);
  return response.data;
};

const Information: FC<InformationProps> = ({ location, onNext }) => {
  const router = useRouter();
  const pathname = usePathname(); 
  const searchParams = useSearchParams();
  const { register, setValue, control, handleSubmit } = useForm<AddInformationLocation>();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateLocation(formData, location?.id),
    onSuccess: (res) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("location", res.data.id);
      router.replace(`${pathname}?${params.toString()}`);
      onNext()
    },
    onError: (error: any) => console.error("❌ خطا در ذخیره:", error),
  });

  useEffect(() => {
    if (location) {
      setValue("name", location.name)
      setValue("city_id", location.city.id)
      setValue("description", location?.description)
    }
  }, [location])

  const onSubmit = (data: AddInformationLocation) => {
    const infoFormData = new FormData();
    if (location?.id) infoFormData.append("_method", "PUT");

    (Object.keys(data) as (keyof AddInformationLocation)[]).forEach((key) => {
      const value = data[key];
      if (value === undefined || value === null) return;

      if (key === "primary_image") {
        if (value instanceof File) {
          infoFormData.append("primary_image", value);
        } else if (typeof value === "string") {
          infoFormData.append("primary_image", value);
        }
      } else if (key === "city_id") {
        infoFormData.append("city_id", String(value));
      } else {
        infoFormData.append(key, value as any);
      }
    });

    mutate(infoFormData);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
          name="primary_image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              defaultImage={location?.primary_image ?? undefined}
              onChange={(file) => field.onChange(file)}
            />
          )}
        />

      <div className="md:flex md:gap-3">
        <div className="md:w-1/2">
          <TextInput
            label="نام لوکیشن"
            className="max-w-xl w-full"
            {...register("name", { required: "نام الزامی است" })}
          />
        </div>
        <div className="md:w-1/2">
          <Controller
            name="city_id"
            control={control}
            render={({ field }) => (
              <SelectCity
                value={field.value}
                onSelectCity={(v) => field.onChange(v)}
              />
            )}
          />
        </div>
      </div>

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextEditor value={field.value} onChange={field.onChange} />
        )}
      />

      <StepChangerProvider onNext={onNext} step={0}>
        <Button
          type="submit"
          className="mt-4"
          variant="contained"
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={20} /> : null}
        >
          {isPending ? "در حال ذخیره..." : "ذخیره و ادامه"}
        </Button>
      </StepChangerProvider>
    </form>
  )
}

export default Information