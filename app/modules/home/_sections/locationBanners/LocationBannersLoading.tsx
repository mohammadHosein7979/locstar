"use client";

import { Skeleton, useMediaQuery } from "@mui/material";
import { mobileWidth } from "@/app/constants/constats";
import { Swiper, SwiperSlide } from "swiper/react";

const LocationBannersLoading = () => {
  const isMobile = useMediaQuery(mobileWidth);
  const slides = Array.from({ length: 5 });

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={isMobile ? 1.16 : 1}
      centeredSlides={true}
    >
      {slides.map((_, index) => (
        <SwiperSlide key={index} className="rounded-2xl overflow-hidden">
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={isMobile ? 234 : 300}
            sx={{
              borderRadius: "16px",
              width: "100%",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LocationBannersLoading;
