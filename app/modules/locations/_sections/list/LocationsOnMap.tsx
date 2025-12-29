"use client";

import { Drawer } from "@/app/components/ui";
import { mobileWidth } from "@/app/constants/constats";
import { Location } from "@/app/types/model";
import { Fab, useMediaQuery } from "@mui/material";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { FC, useState } from "react";

const Map = dynamic(() => import("@/app/components/common/map/Map"), {
  ssr: false,
});

interface LocationsOnMapProps {
  locations: Location[];
  hasSwiper?: boolean
}

const LocationsOnMap: FC<LocationsOnMapProps> = ({ locations, hasSwiper = true }) => {
  const isMobile = useMediaQuery(mobileWidth);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="fixed bottom-[10%] left-4 z-[100]">
      <Drawer
        title={locations.length == 1 ? locations[0].name : "لیست لوکیشن‌ها"}
        anchor={isMobile ? "bottom" : "left"}
        isOpen={openDrawer}
        button={
          <Fab variant="circular">
            <i className="fa-solid fa-location-dot text-xl text-purple-2"></i>
          </Fab>
        }
        onToggle={setOpenDrawer}
      >
        <div
          className={classNames({
            "h-[79vh]": true,
            "w-96": !isMobile,
            "w-full": isMobile,
          })}
        >
          <Map locations={locations} hasSwiper={hasSwiper} />
        </div>
      </Drawer>
    </div>
  );
};

export default LocationsOnMap;
