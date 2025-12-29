"use client"

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/app/layouts/header/Header"), {
  ssr: false,
});

const HeaderWrapper = () => {
  return <Header />;
};

export default HeaderWrapper;
