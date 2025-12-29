"use client";

import { useForm, Controller } from "react-hook-form";
import { LoginByPassword } from "../_types/dto";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/app/constants/routes";
import { TextInput } from "@/app/components/ui";
import Link from "next/link";

const AuthLoginByPassword = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginByPassword>();

  const onSubmit = (data: LoginByPassword) => {
    signIn("credentials", {
      redirect: false,
      mobile: data.mobile,
      password: data.password,
    })
      .then(() => router.push(appRoutes.home.index))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 rounded">
      <Controller
        name="mobile"
        control={control}
        defaultValue=""
        rules={{ required: "نام کاربری الزامی است" }}
        render={({ field }) => (
          <TextInput
            {...field}
            label="نام کاربری"
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: "رمز عبور الزامی است" }}
        render={({ field }) => (
          <TextInput
            {...field}
            type="password"
            label="رمز عبور"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
        )}
      />

      <Link
        className="mt-2 text-blue-600 text-xs mx-auto font-medium hover:underline block"
        href="/auth/signin?type=otp"
      >
        میخواهم با کد فعالسازی وارد شوم
      </Link>

      <button
        type="submit"
        className="bg-purple-3 text-white p-2 rounded mt-4 w-full"
      >
        ارسال
      </button>
    </form>
  );
};

export default AuthLoginByPassword;
