"use client";

import { mobileWidth } from "@/app/constants/constats";
import { gradients } from "@/app/constants/gradient";
import { appRoutes } from "@/app/constants/routes";
import useLocationQueryStore from "@/app/modules/locations/store";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCategoryList } from "../../../../repository/categoryService";
import CategoriesLoading from "./CategoriesLoading";

import "swiper/css";

const Categories = () => {
  const isMobile = useMediaQuery(mobileWidth);
  const { setCategoryId } = useLocationQueryStore();
  const { data, isLoading, isError } = useCategoryList({
    type: "location",
  });

  if (isLoading) return <CategoriesLoading />;
  if (isError) return null;
  if (!data) return null;

  return (
    <Swiper spaceBetween={0} slidesPerView={isMobile ? 3.8 : 8}>
      {data.data.map((category, index) => (
        <SwiperSlide key={category.id}>
          <Link
            href={appRoutes.locations.index}
            onClick={() => setCategoryId(category.id)}
          >
            <div className="text-center text-white pr-8">
              <div
                className={`rounded-full aspect-square flex justify-center items-center ${gradients[index]}`}
              >
                <i className={`${category.icon} text-3xl`}></i>
              </div>
              <div className="text-sm font-thin mt-2">{category.title}</div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Categories;
