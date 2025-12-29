import React from "react";
import { Skeleton } from "@mui/material";

const DiscountCardSkeleton = () => {
  return (
    <div className="flex border border-gray-6 my-2 rounded-xl p-1">
      <Skeleton variant="rectangular" width={64} height={64} className="rounded-lg" />
      <div className="flex-grow p-2">
        <div className="text-sm flex justify-between">
          <Skeleton variant="text" width={50} height={20} />
          <Skeleton variant="text" width={40} height={15} />
        </div>
        <Skeleton variant="text" width={100} height={15} className="mt-1" />
      </div>
    </div>
  );
};

export default DiscountCardSkeleton;
