"use client";

import { mobileWidth } from "@/app/constants/constats";
import { profileGradients } from "@/app/constants/gradient";
import useUserStore from "@/app/store/user";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UpdateInfo from "./UpdateInfo";
import UpdateAvatar from "./UpdateAvatar";

interface NavLink {
  id: number;
  title: string;
  icon: string;
  bg: string;
  href: string;
  className: string;
  isActive: boolean;
}

const ProfileNavLinks = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const isMobile = useMediaQuery(mobileWidth);

  const [navLinks, setNavLinks] = useState<NavLink[]>([
    // {
    //   id: 0,
    //   title: "رزروهای من",
    //   icon: "/images/profile/time-sheet.png",
    //   bg: "/images/profile/bg-time-sheet.svg",
    //   href: "/profile/my-reserves",
    //   className: "top-0 right-2",
    //   isActive: false,
    // },
    {
      id: 1,
      title: "تخفیف‌های من",
      icon: "/images/profile/file.png",
      bg: "/images/profile/bg-discount.svg",
      href: "/profile/my-discounts",
      className: "top-0 right-3",
      isActive: true,
    },
  ]);

  useEffect(() => {
    if (user.is_owner) {
      setNavLinks((prev) => {
        const exists = prev.some((link) => link.id === 2);
        if (!exists) {
          return [
            ...prev,
            {
              id: 2,
              icon: "/images/profile/bag.png",
              bg: "/images/profile/bg-per.svg",
              title: "پنل میزبان",
              href: "/profile/owner-location",
              className: "top-0 right-1",
              isActive: true,
            },
          ];
        }
        return prev;
      });
    }
  }, [user.is_owner]);
  

  const handleClick = (item: NavLink) => {
    if (item.isActive) {
      router.push(item.href);
      return;
    }
    toast.error("این بخش در حال حاضر فعال نمی باشد");
  };

  return (
    <div className="flex-1 bg-white md:grid md:grid-cols-3 gap-5 p-6 ">
      {isMobile && (
        <div className="text-center mb-4 font-semibold flex justify-between items-center">
          <UpdateAvatar />
          <div>
            {user.name} {user.family}
          </div>
          <UpdateInfo />
        </div>
      )}
      {navLinks.map((navLink, index) => (
        <div
          key={navLink.id}
          onClick={() => handleClick(navLink)}
          className={`md:col-span-1 rounded-2xl flex px-4 mb-2 h-fit ${profileGradients[index]}`}
        >
          <div className="w-1/3">
            <div className="relative">
              <img src={navLink.bg} />
              <img
                src={navLink.icon}
                className={`absolute h-full ${navLink.className}`}
              />
            </div>
          </div>
          <div className="w-2/3">
            <div className="flex justify-between text-white items-center h-full pl-4">
              <div className="pr-4">
                <div className="font-semibold">{navLink.title}</div>
              </div>
              <i className="fa-solid fa-chevron-left"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileNavLinks;
