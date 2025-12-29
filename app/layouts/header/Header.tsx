"use client";

import { mobileWidth } from "@/app/constants/constats";
import { useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavbarContent from "../navbar/NavbarContent";
import AvatarOrSignin from "./AvatarOrSigninWrapper";

const Header = () => {
  const currentPath = usePathname()
  const isMobile = useMediaQuery(mobileWidth);

  return !((currentPath === "/" || currentPath.includes("/profile")) && isMobile) && (
    <div className="bg-white w-full z-1000 border-b py-2 px-4 md:p-4 lg:px-[15%] sticky top-0 flex items-center justify-between">
      <Logo />
      {!isMobile && <NavbarContent />}
      <AvatarOrSignin />
    </div>
  );
};

export default Header;
