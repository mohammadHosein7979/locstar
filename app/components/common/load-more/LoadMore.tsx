"use client";

import { CircularProgress } from "@mui/material";
import { FC, useEffect, useRef } from "react";

interface ILoadMore {
  fetchNextPage: any;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
}

const LoadMore: FC<Partial<ILoadMore>> = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, hasNextPage, fetchNextPage]);

  return (
    <>
      <div ref={loadMoreRef} />
      {isFetchingNextPage && (
        <div className="flex justify-center items-center">
          <CircularProgress size="30px" className="ml-2" />
          <div className="text-sm">دریافت اطلاعات بیشتر</div>
        </div>
      )}
    </>
  );
};

export default LoadMore;
