import { LazyBlurImage } from "@/app/components/ui";
import { appRoutes } from "@/app/constants/routes";
import Link from "next/link";
import { FC } from "react";

interface LocationCardProps {
  primary_image: string;
  name: string;
  city: string;
  slug: string;
}

const LocationCard: FC<LocationCardProps> = ({
  primary_image,
  name,
  city,
  slug,
}) => {
  return (
    <Link href={`${appRoutes.locations.index}/${slug}`} className="mb-1 block">
      <div className="relative overflow-hidden rounded-xl">
        <LazyBlurImage
          src={primary_image}
          alt={name}
          className="h-full aspect-[5/4] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-3 right-3 text-white">
          <p className="text-xs font-semibold">{name}</p>
          <p className="text-xs font-light opacity-90">{city}</p>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
