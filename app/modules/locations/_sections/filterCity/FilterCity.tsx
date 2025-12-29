"use client";

import { AttrBox } from "@/app/components/common";
import { Drawer, TextInput } from "@/app/components/ui";
import { useCityList } from "@/app/repository/cityService";
import { City } from "@/app/types/model";
import classNames from "classnames";
import { useState } from "react";
import useLocationQueryStore from "../../store";

const FilterCity = () => {
  const { locationQuery, setCityId, clearCity } = useLocationQueryStore();
  const { data, isLoading, isError } = useCityList();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchCity, setSearchCity] = useState("");

  const selectCity = (id: number) => {
    setSearchCity("");
    setOpenDrawer(false);
    setCityId(id);
  };

  if (isLoading) return null;
  if (!data) return null;
  if (isError) return null;

  return (
    <Drawer
      title="انتخاب شهر"
      anchor="bottom"
      button={
        <AttrBox
          title={
            data.data.find((c) => c.id == locationQuery.city_id)?.name ||
            "انتخاب شهر"
          }
          onDeleteAttr={() => clearCity()}
          isActive={
            data.data.find((c) => c.id == locationQuery.city_id) ? true : false
          }
        />
      }
      isOpen={openDrawer}
      onToggle={setOpenDrawer}
    >
      <div className="px-6">
        <TextInput
          className="w-full"
          label="جستجو"
          onChange={(e) => setSearchCity(e.target.value)}
        />
        {data.data
          .filter((c: City) => c.name.includes(searchCity))
          .map((city: City) => (
            <div
              onClick={() => selectCity(city.id)}
              className={classNames({
                "flex justify-between items-center p-2 text-gray-400 border-b border-gray-100 mb-2":
                  true,
                "bg-pink-1 rounded-xl text-white":
                  locationQuery.city_id == city.id,
              })}
              key={city.id}
            >
              <div>{city.name}</div>
              <span className="icon icon-left-arrow text-xs"></span>
            </div>
          ))}
      </div>
    </Drawer>
  );
};

export default FilterCity;
