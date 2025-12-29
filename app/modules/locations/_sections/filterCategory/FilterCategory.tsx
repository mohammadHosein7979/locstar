"use client";

import { AttrBox } from "@/app/components/common";
import { Drawer } from "@/app/components/ui";
import { useCategoryList } from "@/app/repository/categoryService";
import { Category } from "@/app/types/model";
import classNames from "classnames";
import { useState } from "react";
import useLocationQueryStore from "../../store";

const FilterCategory = () => {
  const { locationQuery, setCategoryId, clearCategory } =
    useLocationQueryStore();
  const { data, isLoading, isError } = useCategoryList({ type: "location" });
  const [openDrawer, setOpenDrawer] = useState(false);

  const selectCategory = (id: number) => {
    setCategoryId(id);
    setOpenDrawer(false);
  };

  if (isLoading) return null;
  if (isError) return null;
  if (!data) return null;

  return (
    <Drawer
      title="انتخاب دسته‌بندی"
      anchor="bottom"
      button={
        <AttrBox
          title={
            data.data.find((c) => c.id == locationQuery.category_id)?.title ||
            "دسته‌بندی"
          }
          onDeleteAttr={() => clearCategory()}
          isActive={
            data.data.find((c) => c.id == locationQuery.category_id)
              ? true
              : false
          }
        />
      }
      isOpen={openDrawer}
      onToggle={setOpenDrawer}
    >
      <div className="px-6">
        {data.data.map((category: Category) => (
          <div
            onClick={() => selectCategory(category.id)}
            className={classNames({
              "flex justify-between items-center p-2 text-gray-400 border-b border-gray-100 mb-2":
                true,
              "bg-pink-1 rounded-xl text-white":
                locationQuery.category_id == category.id,
            })}
            key={category.id}
          >
            <div>
              <span className={`ml-2 ${category.icon}`}></span>
              {category.title}
            </div>
            <span className="icon icon-left-arrow text-xs"></span>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default FilterCategory;
