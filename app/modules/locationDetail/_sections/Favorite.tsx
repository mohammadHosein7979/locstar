"use client";

import { favoriteLocation } from "@/app/repository/locationService";
import { Button } from "@mui/material";
import classNames from "classnames";
import { FC, useState } from "react";

interface Props {
  isFavorite: boolean;
  locationId: number;
}

const Favorite: FC<Props> = ({ isFavorite, locationId }) => {
  const [favorited, setFavorited] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleFavorite = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await favoriteLocation(favorited, locationId);
      setFavorited(!favorited);
    } catch (error) {
      console.error("خطا در تغییر علاقه‌مندی:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleFavorite}
      variant={favorited ? "outlined" : "contained"}
      className={classNames(
        "p-2 rounded-lg text-sm w-1/2 lg:w-full text-center cursor-pointer",
        {
          "bg-purple-2 text-white border border-purple-2": !favorited,
          "bg-white border border-purple-2 text-purple-2": favorited,
          "opacity-50 pointer-events-none": loading,
        }
      )}
    >
      {favorited ? "حذف از علاقه‌مندی" : "ذخیره در علاقه‌مندی"}
    </Button>
  );
};

export default Favorite;
