"use client";

import { SectionHeader } from "@/app/components/common";
import { mobileWidth } from "@/app/constants/constats";
import { useBannerList } from "@/app/repository/bannerService";
import { useMediaQuery } from "@mui/material";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BusinessBannersLoading from "./BusinessBannersLoading";

const BusinessBanners = () => {
  const isMobile = useMediaQuery(mobileWidth);
  const { data, isLoading, isError } = useBannerList({
    type: "main",
    model_type: "business",
    city_id: 0,
  });

  if (isLoading) return <BusinessBannersLoading />;
  if (isError) return null;
  if (!data) return null;

  return (
    data.data.length != 0 && (
      <div className="md:mb-20">
        <SectionHeader
          title="مشاغل مرتبط"
          color={isMobile ? "white" : "black"}
        />
        <div className="px-8">
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
              <SwiperSlide
                className="rounded-2xl overflow-hidden"
                key={banner.id}
              >
                <img src={banner.image} alt={banner.resource_slug} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  );
};

export default BusinessBanners;
