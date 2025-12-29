"use client";

import { mobileWidth } from "@/app/constants/constats";
import { appRoutes } from "@/app/constants/routes";
import LOGOTYPE from "@/public/images/layout/logo-type.svg";
import LOGO from "@/public/images/layout/Locstar.png";
import { useMediaQuery } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const isMobile = useMediaQuery(mobileWidth);

  return (
    <Link href={appRoutes.home.index} className="flex items-center">
      <Image
        src={isMobile ? LOGO : LOGOTYPE}
        alt="locstar"
        className={classNames({
          "w-40": !isMobile,
          "w-9": isMobile,
        })}
      />
    </Link>
  );
};

export default Logo;
