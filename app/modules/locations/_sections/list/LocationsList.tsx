"use client";

import { LoadMore, LocationCard } from "@/app/components/common";
import useInfiniteListData from "@/app/hooks/useInfiniteListData";
import { Location } from "@/app/types/model";
import useLocationQueryStore from "../../store";
import LocationsListLoading from "./LocationsListLoading";
import LocationsOnMap from "./LocationsOnMap";

const LocationsList = () => {
  const { locationQuery } = useLocationQueryStore();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteListData<Location>(
    (page) => ({
      url: "/location",
      config: {
        params: {
          ...locationQuery,
          page,
        },
      },
    }),
    [locationQuery]
  );

  if (isLoading) return <LocationsListLoading />;
  if (isError) return null;
  if (!data) return null;

  return (
    <div>
      <LocationsOnMap
        locations={data.pages
          .flatMap((page) => page.data)
          .filter((location) => location.lat && location.long)}
      />
      <div>
        {data.pages.map((page, index) => (
          <div
            key={index}
            className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-1 px-5"
          >
            {page.data.map((location: Location) => (
              <LocationCard
                key={location.id}
                primary_image={location.primary_image}
                name={location.name}
                city={location.city.name}
                slug={location.slug}
              />
            ))}
          </div>
        ))}
      </div>
      <LoadMore
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default LocationsList;
