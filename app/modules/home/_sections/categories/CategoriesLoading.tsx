"use client";

import { Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const CategoriesLoading = () => {
  const fakeItems = Array.from({ length: 8 });

  return (
    <Swiper spaceBetween={0} slidesPerView={3.8}>
      {fakeItems.map((_, idx) => (
        <SwiperSlide key={idx}>
          <div className="text-center text-white pr-8">
            <Skeleton
              variant="circular"
              width={64}
              height={64}
              sx={{ margin: "0 auto" }}
            />
            <Skeleton
              variant="text"
              width={50}
              height={20}
              sx={{ margin: "8px auto 0" }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesLoading;
