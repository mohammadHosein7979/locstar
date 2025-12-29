import { LazyBlurImage } from "@/app/components/ui";
import { Location } from "@/app/types/model";
import Link from "next/link";
import { FC } from "react";

interface OwnerLocationCardProps {
  location: Location;
}

const OwnerLocationCard: FC<OwnerLocationCardProps> = ({ location }) => {
  return (
    <div className="flex items-center">
      <div className="w-2/5">
        <LazyBlurImage src={location.primary_image} className="rounded-xl aspect-4/3" />
      </div>
      <div className="w-3/5 mr-2 flex flex-col items-start">
        <span className="font-semibold text-sm">{location.name}</span>

        {location.is_verified ? (
          <span className="text-xs mt-2 forn-light text-green-2">
            (تایید شده)
          </span>
        ) : (
          <span className="text-xs mt-2 forn-light text-orange-500">
            (در انتظار تایید)
          </span>
        )}

        <div className="flex text-xs mt-2">
          {location.is_verified && (
            <Link href={`/locations/${location.slug}`}>
              <div className="bg-sky-50 text-sky-800 text-xs px-3 py-1 rounded-full ml-1 cursor-pointer">
                مشاهده
              </div>
            </Link>
          )}
          <Link
            href={`/locations/add-location?location=${location.id}`}
            className="bg-yellow-50 text-orange-700 text-xs px-3 py-1 rounded-full ml-1 cursor-pointer"
          >
            ویرایش
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OwnerLocationCard;
