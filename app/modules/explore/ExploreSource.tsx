"use client";

import { useBlogList } from "@/app/repository/blogService";
import classNames from "classnames";
import BlogListLoading from "./BlogListLoading";
import Link from "next/link";
import { LazyBlurImage } from "@/app/components/ui";

const Explore = () => {
  const { data, isError, isLoading } = useBlogList();

  if (isLoading) return <BlogListLoading />;
  if (isError) return null;
  if (!data) return null;

  return (
    <div className="w-full grid grid-cols-3 gap-1 auto-rows-[150px]">
      {data.data.map((post, index) => {
        const isLarge = index % 7 === 0;

        return (
          <Link
            href={`/blog/${post.id}`}
            key={index}
            className={classNames({
              "relative overflow-hidden": true,
              "col-span-2 row-span-2": isLarge,
              "col-span-1": !isLarge,
            })}
          >
            <LazyBlurImage
              src={post.cover_image}
              alt={`explore-${index}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Explore;
