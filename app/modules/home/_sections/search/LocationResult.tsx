import { Location } from "@/app/types/model";
import Link from "next/link";

const LocationResult = ({ locations }: { locations: Location[] }) => {
  return (
    <div>
      <div className="mb-2">لوکیشن‌ها</div>
      {locations.map((location) => (
        <Link
          href={`/locations/${location.slug}`}
          key={location.id}
          className="mb-1 flex items-center text-sm"
        >
          <div className="w-7 ml-2 aspect-square rounded-lg bg-purple-100 flex justify-center items-center">
             <i className="fa-light fa-location-dot text-purple-2"></i>
          </div>
          <span>{location.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default LocationResult;
