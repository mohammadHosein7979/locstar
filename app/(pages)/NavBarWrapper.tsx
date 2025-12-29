"use client";

import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("@/app/layouts/navbar/Navbar"), {
  ssr: false,
});

const NavBarWrapper = () => {
  return <NavBar />;
};

export default NavBarWrapper;
