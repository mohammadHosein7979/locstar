import { ImageGrid, Instagram, Whatsapp } from "@/app/components/common";
import { Location } from "@/app/types/model";
import { FC } from "react";
import LocationsOnMap from "../locations/_sections/list/LocationsOnMap";
import Contact from "./_sections/Contact";
import Description from "./_sections/Description";
import Favorite from "./_sections/Favorite";
import Feature from "./_sections/Feature";
import Info from "./_sections/Info";
import Share from "./_sections/Share";
import Weather from "./_sections/Weather";
import classNames from "classnames";
import Discount from "./_sections/Discount";

interface LocationDetailProps {
  location: Location;
}

const LocationDetail: FC<LocationDetailProps> = ({ location }) => {
  return (
    <div className="py-4">
      <div className="px-4">
        <div className="lg:flex lg:justify-between">
          <Info
            name={location.name}
            primaryImage={location.primary_image}
            cityName={location.city.name}
            categories={location.categories}
          />

          <div className="flex lg:flex-col gap-1 my-4">
            <Favorite
              isFavorite={location.is_favorite}
              locationId={location.id}
            />
            <Share />
          </div>
        </div>

        <div className="lg:flex lg:flex-row-reverse lg:justify-between lg:gap-2">
          <ImageGrid
            media={[...location.media].sort((a, b) => {
              if (a.type === "video" && b.type !== "video") return -1;
              if (a.type !== "video" && b.type === "video") return 1;
              return 0;
            })}
          />

          <Description description={location.description} />
        </div>

        {location.referral_discount && (
          <Discount discount={location.referral_discount} locationId={location.id} />
        )}

        {location.lat && (
          <LocationsOnMap locations={[location]} hasSwiper={false} />
        )}
      </div>

      
      <div className="px-4 pt-8 pb-4">
        <Feature features={location.features} />
      </div>

      <div className="px-4 py-4">
        <Contact
          address={location.address}
          phone_numbers={location.phone_numbers}
        />
      </div>

      <div className={classNames({
        "px-10 py-4 flex gap-4": location.whatsapp_number || location.ig_username
      })}>
        {location.ig_username && <Instagram username={location.ig_username} />}
        {location.whatsapp_number && (
          <Whatsapp phoneNumber={location.whatsapp_number} />
        )}
      </div>

      {location.lat && (
        <div className="py-4">
          <Weather lat={location.lat} long={location.long} />
        </div>
      )}
    </div>
  );
};

export default LocationDetail;
