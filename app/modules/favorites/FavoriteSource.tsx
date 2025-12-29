"use client";

import { LoadMore, LocationListViewCard } from "@/app/components/common";
import useInfiniteListData from "@/app/hooks/useInfiniteListData";
import { Location } from "@/app/types/model";
import { Fragment } from "react";
import FavoriteLoading from "./FavoriteLoading";

const FavoriteSource = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteListData<Location>((page) => ({
    url: "/favorite-location",
    config: {
      params: {
        page,
      },
    },
  }));

  if (!data) return null;
  if (isError) return null;
  if (isLoading) return <FavoriteLoading />;

  return (
    <div>
      {data.pages.map((page, index) => (
        <Fragment key={index}>
          {page.data.map((location: Location) => (
            <LocationListViewCard
              key={location.id}
              name={location.name}
              primary_image={location.primary_image}
              city={location.city.name}
              slug={location.slug}
            />
          ))}
        </Fragment>
      ))}
      <LoadMore
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default FavoriteSource;
