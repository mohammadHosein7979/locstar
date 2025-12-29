"use client";

import { useMediaQuery } from "@mui/material";
import NavbarContent from "./NavbarContent";
import { mobileWidth } from "@/app/constants/constats";

const NavBar = () => {
  const isMobile = useMediaQuery(mobileWidth);

  return isMobile && (
    <div className=" bg-white shadow-top flex justify-between z-1000 sticky bottom-0">
      <div className="flex w-full justify-between">
        <NavbarContent />
      </div>
    </div>
  );
};

export default NavBar;
