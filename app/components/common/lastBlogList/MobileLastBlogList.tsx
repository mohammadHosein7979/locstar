"use client";

import { useBlogList } from "@/app/repository/blogService";
import { Skeleton } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";

const MobileLastBlogList = () => {
  const { data, isLoading, isError } = useBlogList({ page: 1, per_page: 5 });
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    if (!data) return;
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % data.data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  if (isError) return null;

  if (isLoading) {
    return (
      <div className="w-full py-4">
        <div className="w-full rounded flex items-end">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={classNames({
                "bg-white px-[1.2%]": true,
                "rounded-r-xl": index == 0,
                "rounded-l-xl": index == 4,
                "w-[19.5%] py-[1.5%]": true,
              })}
            >
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ width: "100%", height: 0, paddingTop: "100%" }} // 7/6 ratio
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full py-4">
      <div className="w-full rounded flex items-end">
        {data.data.map((blog, index) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className={classNames({
              "bg-white px-[1.2%]": true,
              "rounded-r-xl": index == 0,
              "rounded-l-xl": index == 4,
              "rounded-t-xl": index == activeItem,
              "w-[22%] py-[1.6%]": index == activeItem,
              "w-[19.5%] py-[1.5%]": index != activeItem,
            })}
          >
            <div
              className={classNames({
                "bg-gray-500 rounded-xl w-full aspect-7/6 overflow-hidden":
                  true,
                "shadow-xl": index == activeItem,
              })}
            >
              <img
                src={blog.cover_image}
                alt=""
                className={classNames({
                  "w-full h-full object-cover": true,
                  grayscale: index != activeItem,
                })}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileLastBlogList;
