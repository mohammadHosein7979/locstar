"use client";

import { mobileWidth } from "@/app/constants/constats";
import { useBannerList } from "@/app/repository/bannerService";
import { useMediaQuery } from "@mui/material";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useLocationQueryStore from "../../store";

const LocationBanner = () => {
  const isMobile = useMediaQuery(mobileWidth);
  const { locationQuery } = useLocationQueryStore();

  const { data, isLoading, isError } = useBannerList({
    model_type: "location",
    type: "search",
    city_id: locationQuery.city_id || 0,
  });

  if (isLoading) return null;
  if (isError) return null;
  if (!data || data.data.length == 0) return null;

  return (
    <div className="px-4 pt-4 -mb-4">
      <Swiper
        spaceBetween={isMobile ? 16 : 0}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
      >
        {data.data.map((banner) => (
          <SwiperSlide className="rounded-2xl overflow-hidden" key={banner.id}>
            <img src={banner.image} alt={banner.resource_slug} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LocationBanner;
