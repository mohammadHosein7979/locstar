import { LazyBlurImage } from "@/app/components/ui";
import Link from "next/link";
import { FC } from "react";

interface LocationListViewCardProps {
  primary_image: string;
  name: string;
  city: string;
  slug: string;
}

const LocationListViewCard: FC<LocationListViewCardProps> = ({
  primary_image,
  name,
  city,
  slug
}) => {
  return (
    <Link href={`/locations/${slug}`}>
      <div className="bg-white rounded-2xl p-4">
        <div className="mb-2">
          <LazyBlurImage
            src={primary_image}
            alt={name}
            className="w-full aspect-4/3 min-h-44 rounded-xl"
          />
        </div>
        <div className="font-semibold text-gray-400">{name}</div>
        <div className="text-xs text-gray-400 ">
          <i className="fa-solid fa-location-dot text-base ml-2 text-pink-1"></i>
          {city}
        </div>
      </div>
    </Link>
  );
};

export default LocationListViewCard;
