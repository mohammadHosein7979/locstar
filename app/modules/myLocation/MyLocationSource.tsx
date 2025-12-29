"use client";

import { OwnerLocationCard } from "@/app/components/common";
import { useOwnerLocationList } from "@/app/repository/ownerLocationService";
import { Fab } from "@mui/material";
import Link from "next/link";
import MyLocationLoading from "./MyLocationLoading";

const MyLocationSource = () => {
  const { data, isLoading, isError } = useOwnerLocationList();

  if (!data) return null;
  if (isError) return null;
  if (isLoading) return <MyLocationLoading />;

  return (
    <div>
      <div className="md:grid md:grid-cols-2 xl:grid-cols-3">
        {data.data.map((location) => (
          <div className="col-span-1 mb-2" key={location.id}>
            <OwnerLocationCard location={location} />
          </div>
        ))}
      </div>
      <div className="fixed bottom-[10%] left-4 z-[100]">
        <Link href="/locations/add-location">
          <Fab variant="extended">
            <div>لوکیشن جدید</div>
          </Fab>
        </Link>
      </div>
    </div>
  );
};

export default MyLocationSource;
