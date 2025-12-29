"use client"

import { useSearchParams } from "next/navigation";
import { LoginByOtp, LoginByPassword } from "./_sections";

const AuthPage = () => {
  const searchParam = useSearchParams();
  const type = searchParam.get("type") || "otp"

  return (
    <div className="flex flex-col h-full justify-between">
      <div></div>
      <div className="h-[70%]">
        <div className="h-full bg-white md:grid md:grid-cols-3 gap-5 p-6 rounded-t-3xl">
          {type == "otp" ? <LoginByOtp /> : <LoginByPassword />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
