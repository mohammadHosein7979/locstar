"use client";

import { mobileWidth } from "@/app/constants/constats";
import { appRoutes } from "@/app/constants/routes";
import { Button, useMediaQuery } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarContent = () => {
  const currentPath = usePathname();
  const isMobile = useMediaQuery(mobileWidth);

  const navLinks = [
    {
      id: 1,
      title: appRoutes.home.title,
      href: appRoutes.home.index,
      icon: <i className="fa-light fa-house-blank"></i>,
    },
    {
      id: 2,
      title: appRoutes.locations.title,
      href: appRoutes.locations.index,
      icon: <i className="fa-light fa-location-dot"></i>,
    },
    {
      id: 3,
      title: appRoutes.locations.child.favorites.title,
      href: appRoutes.locations.child.favorites.index,
      icon: <i className="fa-light fa-bookmark"></i>,
    },
    {
      id: 4,
      title: appRoutes.explore.title,
      href: appRoutes.explore.index,
      icon: <i className="fa-light fa-magnifying-glass"></i>,
    },
    {
      id: 5,
      title: appRoutes.profile.title,
      href: appRoutes.profile.index,
      icon: <i className="fa-light fa-user"></i>,
    },
  ];

  return (
    <div
      className={classNames({
        "flex justify-between": true,
        "w-full": isMobile,
      })}
    >
      {navLinks.map((navLink) => (
        <Link href={navLink.href} key={navLink.id} className="w-full md:w-fit">
          <Button className="w-full h-fit">
            <div className="flex flex-col justify-center items-center">
              {!isMobile ? (
                <span>{navLink.title}</span>
              ) : (
                <div className={classNames({
                  "text-gray-400": currentPath != navLink.href,
                  "text-purple-900": currentPath == navLink.href
                })}>
                  <div className="text-lg">{navLink.icon}</div>
                  <div className="text-xs">{navLink.title}</div>
                </div>
              )}
            </div>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default NavbarContent;
