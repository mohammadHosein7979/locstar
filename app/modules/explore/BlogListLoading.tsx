"use client";

import { Skeleton } from "@mui/material";
import classNames from "classnames";

const BlogListLoading = () => {
  const placeholders = Array.from({ length: 12 });

  return (
    <div className="w-full grid grid-cols-3 gap-1 auto-rows-[150px]">
      {placeholders.map((_, index) => {
        const isLarge = index % 7 === 0;

        return (
          <div
            key={index}
            className={classNames({
              "relative overflow-hidden": true,
              "col-span-2 row-span-2": isLarge,
              "col-span-1": !isLarge
            })}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
            />
          </div>
        );
      })}
    </div>
  );
};

export default BlogListLoading;
