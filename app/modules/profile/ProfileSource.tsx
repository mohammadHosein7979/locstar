"use client";

import { logoSrc, mobileWidth, whatsupLink } from "@/app/constants/constats";
import useUserStore from "@/app/store/user";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import Logout from "./Logout";
import ProfileNavLinks from "./ProfileNavLinks";

const ProfileSource = () => {
  const { user } = useUserStore();
  const isMobile = useMediaQuery(mobileWidth);
  const avatar = user.avatar ?? logoSrc;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col justify-center items-center h-[30%]">
        <img
          src={avatar}
          className="rounded-full border-2 border-white w-[120px] aspect-square"
        />
        {!isMobile && (
          <div className="text-center mb-4 font-semibold">
            {user.name} {user.family}
          </div>
        )}
      </div>
      <div className="h-[70%] flex flex-col bg-white rounded-t-3xl overflow-hidden">
        <ProfileNavLinks />
        <div className="bg-white shadow-top flex justify-between py-4 px-8 h-14">
          {!user.is_owner ? (
            <div className="w-full text-center text-sm">
              <Link href="/locations/add-location">
                <div>میزبان شو</div>
              </Link>
            </div>
          ) : (
            <div className="w-full text-center text-sm">
              <Link href={whatsupLink}>
                <div>درخواست ثبت بنر</div>
              </Link>
            </div>
          )}
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default ProfileSource;
