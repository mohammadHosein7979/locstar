"use client";

import DesktopLastBlogList from "@/app/components/common/lastBlogList/DesktopLastBlogList";
import MobileLastBlogList from "@/app/components/common/lastBlogList/MobileLastBlogList";
import { mobileWidth } from "@/app/constants/constats";
import { useMediaQuery } from "@mui/material";
import Categories from "./_sections/categories/Categories";
import LocationBanners from "./_sections/locationBanners/LocationBanners";
import DesktopSearchBox from "./_sections/search/DesktopSearchBox";
import MobileSearchBox from "./_sections/search/MobileSearchBox";

const HomeSourceLayout = () => {
  const isMobile = useMediaQuery(mobileWidth);

  return isMobile ? (
    <>
      <div className="px-8">
        <MobileLastBlogList />
        <MobileSearchBox />
      </div>
      <LocationBanners />
      <div className="my-8">
        <Categories />
      </div>
    </>
  ) : (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <LocationBanners />
        </div>
        <div className="col-span-1">
          <DesktopLastBlogList />
        </div>
      </div>
      <div className="mb-8">
        <DesktopSearchBox />
      </div>
    </>
  );
};

export default HomeSourceLayout;
