"use client";

import { Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "@mui/material";
import { mobileWidth } from "@/app/constants/constats";
import classNames from "classnames";

import "swiper/css";

const NewLocationsLoading = () => {
  const isMobile = useMediaQuery(mobileWidth);

  const slidesCount = isMobile ? 3 : 6;

  return (
    <div className={classNames({ "mt-20": !isMobile })}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="text" width={120} height={28} />
      </div>

      <Swiper spaceBetween={0} slidesPerView={isMobile ? 1.5 : 3}>
        {Array.from({ length: slidesCount }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className={classNames({ "pr-8": isMobile })}>
              <div className="bg-white rounded-2xl p-4">
                <div className="mb-2">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={176} 
                    sx={{ borderRadius: "0.75rem" }}
                  />
                </div>

                <Skeleton variant="text" width="70%" height={24} />

                <div className="flex items-center gap-2 mt-2">
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width="50%" height={16} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewLocationsLoading;
