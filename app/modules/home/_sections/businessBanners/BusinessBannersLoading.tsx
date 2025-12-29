"use client";

import { Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { mobileWidth } from "@/app/constants/constats";
import { useMediaQuery } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";

const BusinessBannersLoading = () => {
  const isMobile = useMediaQuery(mobileWidth);

  const slidesCount = 3;

  return (
    <div className="md:mb-20">
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="text" width={120} height={28} />
      </div>

      <div className="px-8">
        <Swiper
          spaceBetween={isMobile ? 16 : 0}
          slidesPerView={1}
          centeredSlides
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {Array.from({ length: slidesCount }).map((_, i) => (
            <SwiperSlide
              className="rounded-2xl overflow-hidden"
              key={i}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={isMobile ? 160 : 300}
                sx={{ borderRadius: "1rem" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BusinessBannersLoading;
