"use client";

import { LazyBlurImage } from "@/app/components/ui";
import { mobileWidth } from "@/app/constants/constats";
import { useMediaQuery } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBannerList } from "../../../../repository/bannerService";
import LocationBannersLoading from "./LocationBannersLoading";

import "swiper/css";
import "swiper/css/pagination";

const LocationBanners = () => {
  const isMobile = useMediaQuery(mobileWidth);
  const { data, isLoading, isError } = useBannerList({
    type: "main",
    model_type: "location",
    city_id: 0,
  });

  if (isLoading) return <LocationBannersLoading />;
  if (isError) return null;
  if (!data) return null;

  return (
    <div>
      <Swiper
        spaceBetween={16}
        slidesPerView={isMobile ? 1.16 : 1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={isMobile ? { clickable: true } : false}
        modules={[Autoplay, ...(isMobile ? [Pagination] : [])]}
      >
        {data.data.map((banner) => (
          <SwiperSlide
            className={classNames({
              "rounded-2xl overflow-hidden": true,
              "h-[30vh] overflow-hidden": !isMobile,
            })}
            key={banner.id}
          >
            <Link href={`/locations/${banner.resource_slug}`}>
              <LazyBlurImage src={banner.image} alt={banner.resource_slug} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LocationBanners;
