"use client";

import { TextInput } from "@/app/components/ui";
import Link from "next/link";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { LoginByOTP } from "../_types/dto";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/app/constants/routes";
import { sendOtpService } from "@/app/repository/userService";

const AuthLoginByOtp = () => {
  const router = useRouter();
  const [mode, setMode] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (mode === "mobile") {
        sendOtpService(mobile).then(() => {
          setMode("otp");
        });
      } else if (mode === "otp") {
        const data: LoginByOTP = { mobile, code };

        const result = await signIn("credentials", {
          redirect: false,
          mobile: data.mobile,
          code: data.code,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        router.push(appRoutes.home.index);
      }
    } catch (err) {
      console.error(err);
      alert("مشکلی پیش آمد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-sm text-center mb-10">
        <div className="font-bold text-gray-700">
          شماره تلفن همراه خود را وارد کنید
        </div>
        <div className="text-gray-500">
          ما برای شما کد تایید 4 رقمی ارسال خواهیم کرد
        </div>
      </div>

      <div>
        {mode === "mobile" && (
          <TextInput
            label="تلفن همراه"
            className="max-w-xl w-full"
            value={mobile}
            inputMode="numeric"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMobile(e.target.value)
            }
          />
        )}

        {mode === "otp" && (
          <div className="flex justify-center mb-4" dir="ltr">
            <OTPInput
              value={code}
              onChange={setCode}
              numInputs={6}
              shouldAutoFocus
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "2.5rem",
                height: "2.5rem",
                margin: "0 0.25rem",
                fontSize: "1.25rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                textAlign: "center",
                direction: "ltr",
              }}
            />
          </div>
        )}

        <Link
          className="mt-2 text-blue-600 text-xs mx-auto font-medium hover:underline block text-center"
          href="/auth/signin?type=password"
        >
          میخواهم با نام کاربری وارد شوم
        </Link>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-purple-3 text-white p-2 rounded mt-4 w-full disabled:opacity-50"
        >
          {loading
            ? "لطفا صبر کنید..."
            : mode === "mobile"
            ? "ارسال کد"
            : "ورود"}
        </button>
      </div>
    </div>
  );
};

export default AuthLoginByOtp;
