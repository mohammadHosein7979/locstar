"use client";

import { Drawer, TextInput } from "@/app/components/ui";
import { searchAction } from "@/app/repository/locationService";
import { SearchResponse } from "@/app/types/dto";
import { FC, ReactElement, useEffect, useState } from "react";
import LocationResult from "./LocationResult";
import CategoryResult from "./CategoryResult";

interface MobileSearchBoxProps {
  btn?: ReactElement
}

const MobileSearchBox: FC<MobileSearchBoxProps> = ({ btn }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<SearchResponse>();

  useEffect(() => {
    if (searchText.length >= 2) {
      searchAction(searchText).then((res) => setData(res.data.data));
    }
  }, [searchText]);

  const handleToggle = () => {
    if (openDrawer) {
      setData({} as SearchResponse)
      setSearchText("")
    }
    setOpenDrawer(!openDrawer)
  }

  return (
    <Drawer
      title="جستجو"
      anchor="bottom"
      button={
        btn ? btn : (<div className="bg-white shadow-core p-4 rounded-full flex justify-between items-center text-sm text-gray-400 mb-4">
          <div>جستجو</div>
          <i className="fa-regular fa-search ml-1 text-purple-2 text-base"></i>
        </div>)
      }
      isOpen={openDrawer}
      onToggle={handleToggle}
    >
      <div className="p-4">
        <TextInput
          size="medium"
          label="دنبال لوکیشن خاصی میگردی؟"
          className="w-full"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {data && (
        <div className="p-4">
          <div className="mb-5">
            {data.locations && data.locations.length > 0 && (
              <LocationResult locations={data.locations} />
            )}
            {data.categories && data.categories.length > 0 && (
              <CategoryResult categories={data.categories} />
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default MobileSearchBox;
