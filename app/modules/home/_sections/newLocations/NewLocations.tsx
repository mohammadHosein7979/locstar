"use client";

import { LocationListViewCard, SectionHeader } from "@/app/components/common";
import { mobileWidth } from "@/app/constants/constats";
import { useLocationList } from "@/app/repository/locationService";
import { useMediaQuery } from "@mui/material";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import NewLocationsLoading from "./NewLocationsLoading";

import "swiper/css";

const NewLocations = () => {
  const isMobile = useMediaQuery(mobileWidth);
  const { data, isLoading, isError } = useLocationList();

  if (isLoading) return <NewLocationsLoading />;
  if (isError) return null;
  if (!data) return null;

  return (
    <div className={classNames({
      "mt-20": !isMobile
    })}>
      <SectionHeader title="جدیدترین‌ها" color={isMobile ? "white" : "black"} />
      <Swiper spaceBetween={0} slidesPerView={isMobile ? 1.5 : 3}>
        {data.data.map((location) => (
          <SwiperSlide key={location.id}>
            <div className={classNames({
              "pr-8": isMobile
            })}>
              <LocationListViewCard
                name={location.name}
                city={location.city.name}
                primary_image={location.primary_image}
                slug={location.slug}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewLocations;
