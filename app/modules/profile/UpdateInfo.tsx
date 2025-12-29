"use client";

import { Drawer, TextInput } from "@/app/components/ui";
import { updateUserService } from "@/app/repository/userService";
import useUserStore from "@/app/store/user";
import { Button, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UpdateProfile } from "./_types/dto";

const UpdateInfo = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user, updateInfo } = useUserStore();
  const { register, setValue, handleSubmit } = useForm<UpdateProfile>();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: UpdateProfile) =>
      updateUserService(payload),
    onSuccess: (res) => {
      if (res?.data) {
        updateInfo(res.data);
      }
      setOpenDrawer(false)
      toast.success("اطلاعات کاربری با موفقیت ویرایش شد")
    },
    onError: (error: any) => console.error("❌ خطا در ذخیره:", error),
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("family", user.family || "");
    }
  }, [user]);

  const onSubmit = (data: UpdateProfile) => {
    mutate({
      ...data,
      _method: "PUT",
    });
  };

  return (
    <Drawer
      anchor="bottom"
      title="ویرایش اطلاعات کاربری"
      isOpen={openDrawer}
      onToggle={setOpenDrawer}
      button={
        <div className="border rounded-xl p-2 text-gray-400 border-gray-400 aspect-square flex justify-center items-center w-10">
          <i className="fa-regular fa-pen"></i>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <TextInput
          label="نام"
          className="max-w-xl w-full"
          {...register("name", { required: "نام الزامی است" })}
        />
        <TextInput
          label="نام خانوادگی"
          className="max-w-xl w-full"
          {...register("family", { required: "نام خانوادگی الزامی است" })}
        />
        <Button
          type="submit"
          className="mt-4"
          variant="contained"
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={20} /> : null}
        >
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </Button>
      </form>
    </Drawer>
  );
};

export default UpdateInfo;
