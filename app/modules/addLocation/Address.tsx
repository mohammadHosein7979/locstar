"use client";

import { TextInput } from "@/app/components/ui";
import { addLocation } from "@/app/repository/ownerLocationService";
import { OwnerLocation } from "@/app/types/model";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import StepChangerProvider from "./_sections/StepChangerProvider";
import { AddAddressLocation } from "./_types/dto";

interface AddressProps {
  location?: OwnerLocation;
  onNext: () => void;
  onPrev: () => void;
}

const Map = dynamic(() => import("@/app/components/common/map/Map"), {
  ssr: false,
});

const updateLocation = async (
  formData: FormData,
  id?: number
) => {
  const response = await addLocation(formData, id);
  return response.data;
};

const Address: FC<AddressProps> = ({ location, onNext, onPrev }) => {
  const { register, handleSubmit, setValue } = useForm<AddAddressLocation>();

  useEffect(() => {
    if (location?.address) setValue("address", location.address);
    if (location?.lat) setValue("lat", location.lat);
    if (location?.long) setValue("long", location.long);
  }, [location, setValue]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      updateLocation(formData, location?.id),
    onSuccess: () => onNext(),
    onError: (error) => console.error("❌ خطا در ذخیره:", error),
  });

  const onSubmit = (data: AddAddressLocation) => {
    const infoFormData = new FormData();
    infoFormData.append("_method", "PUT");

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data];

      if (value !== undefined && value !== null) {
        infoFormData.append(key, value as any);
      }
    });

    mutate(infoFormData);
  };

  const handlePointSelect = (point: { lat: number; long: number }) => {
    setValue("lat", point.lat);
    setValue("long", point.long);
  };

  return (
    location && (
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="آدرس"
          className="max-w-xl w-full"
          {...register("address")}
        />

        <div className="h-[500px]">
          <Map
            locations={location.lat ? [location] : []}
            hasSwiper={false}
            onPointSelect={handlePointSelect}
          />
        </div>

        <StepChangerProvider onNext={onNext} onPrev={onPrev} step={1}>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? "در حال ذخیره..." : "ذخیره"}
          </Button>
        </StepChangerProvider>
      </form>
    )
  );
};

export default Address;
