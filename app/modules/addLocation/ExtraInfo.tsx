"use client";

import { TextInput } from "@/app/components/ui";
import { addLocation } from "@/app/repository/ownerLocationService";
import { Location } from "@/app/types/model";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import StepChangerProvider from "./_sections/StepChangerProvider";
import { AddExtraInformation } from "./_types/dto";

interface ExtraInfoProps {
  location?: Location;
  onNext: () => void;
  onPrev: () => void;
}

const updateLocation = async (
  formData: FormData,
  id?: number
) => {
  const response = await addLocation(formData, id);
  return response.data;
};

const ExtraInfo: FC<ExtraInfoProps> = ({ location, onNext, onPrev }) => {
  const { register, setValue, control, handleSubmit } =
    useForm<AddExtraInformation>({
      defaultValues: {
        ig_username: "",
        whatsapp_number: "",
        phone_numbers: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phone_numbers",
    keyName: "id",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      updateLocation(formData, location?.id),
    onSuccess: () => onNext(),
    onError: (error: any) => console.error("❌ خطا در ذخیره:", error),
  });

  useEffect(() => {
    if (location) {
      setValue("ig_username", location.ig_username || "");
      setValue("whatsapp_number", location.whatsapp_number || "");
      setValue(
        "phone_numbers",
        (location.phone_numbers || []).map((num) => ({ value: num }))
      );
    }
  }, [location, setValue]);

  const onSubmit = (data: AddExtraInformation) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    Object.entries(data).forEach(([key, value]) => {
      if (key === "phone_numbers") {
        value.forEach((p: any) => formData.append("phone_numbers[]", p.value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput
        label="اینستاگرام"
        className="max-w-xl w-full"
        {...register("ig_username")}
      />

      <TextInput
        label="شماره واتساپ"
        inputMode="numeric"
        className="max-w-xl w-full"
        {...register("whatsapp_number")}
      />

      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="font-medium">تلفن تماس</div>
          <div
            className="border border-sky-700 text-sky-700 rounded-full px-3 py-1 w-fit text-sm"
            onClick={() => append({ value: "" })}
          >
            <i className="fa-solid fa-plus ml-2"></i>
            تلفن جدید
          </div>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <div className="flex-grow">
              <TextInput
                label={`شماره تماس ${index + 1}`}
                className="max-w-xl w-full"
                {...register(`phone_numbers.${index}.value` as const)}
              />
            </div>
            <div
              className="border border-red-800 w-10 aspect-square rounded-lg text-red-800 flex items-center justify-center"
              onClick={() => remove(index)}
            >
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        ))}
      </div>

      <StepChangerProvider onNext={onNext} onPrev={onPrev} step={1}>
        <Button variant="contained" type="submit" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره و ادامه"}
        </Button>
      </StepChangerProvider>
    </form>
  );
};

export default ExtraInfo;
