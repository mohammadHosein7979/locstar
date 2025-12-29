import { SITE_URL } from "@/app/constants/constats";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <div className="w-full text-center text-sm border-r text-red-700">
      <div onClick={() => signOut({ callbackUrl: SITE_URL, redirect: true })}>خروج</div>
    </div>
  );
};

export default Logout;
