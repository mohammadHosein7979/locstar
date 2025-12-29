"use client";

import { Skeleton } from "@mui/material";

const LocationsListLoading = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={200}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationsListLoading;
