"use client";

import { tehranLocation } from "@/app/constants/constats";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMapProps, LatLng } from "./map.types";

import "leaflet/dist/leaflet.css";
import "swiper/swiper-bundle.css";


const Map: FC<IMapProps> = ({ locations, hasSwiper = true, onPointSelect }) => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [clickedPoint, setClickedPoint] = useState<LatLng | null>(null);
  const [L, setL] = useState<any>(null);

  const center =
    locations && locations.length > 0
      ? locations[0]
      : userLocation || tehranLocation;

  useEffect(() => {
    if (!locations || locations.length === 0) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        });
      }
    }

    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, [locations]);

  const MoveToLocation = ({ lat, long }: LatLng) => {
    const map = useMap();
    map.flyTo([lat, long], 15);
    return null;
  };

  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        const newPoint = { lat: e.latlng.lat, long: e.latlng.lng };
        console.log(newPoint)
        setClickedPoint(newPoint);
        onPointSelect?.(newPoint);
      },
    });
    return null;
  };

  if (!L) return null;

  const fontAwesomeIcon = new L.DivIcon({
    html: '<div style="font-size:24px; color:purple;"><i class="fas fa-map-marker-alt"></i></div>',
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <div className="relative h-full">
      <MapContainer
        center={[center.lat, center.long]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations?.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.lat, loc.long]}
            icon={fontAwesomeIcon}
          >
            <Popup>
              <div className="font-iransans">
                <div className="font-bold">{loc.name}</div>
                <Link href={"/"} className="text-blue-600">
                  مشاهده
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        {(!locations || locations.length === 0) && userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.long]}
            icon={fontAwesomeIcon}
          >
            <Popup>موقعیت فعلی شما</Popup>
          </Marker>
        )}

        {selectedLocation && (
          <MoveToLocation
            lat={selectedLocation.lat}
            long={selectedLocation.long}
          />
        )}

        {clickedPoint && (
          <Marker
            position={[clickedPoint.lat, clickedPoint.long]}
            icon={fontAwesomeIcon}
          >
            <Popup>نقطه انتخاب شده</Popup>
          </Marker>
        )}

        <ClickHandler />
      </MapContainer>

      {locations && locations.length > 0 && hasSwiper && (
        <div className="absolute bottom-5 z-1000 w-full">
          <Swiper spaceBetween={0} slidesPerView={1.1}>
            {locations?.map((loc, index) => (
              <SwiperSlide key={index}>
                <div
                  className="p-2 bg-white rounded-lg cursor-pointer m-2 shadow-lg"
                  onClick={() =>
                    setSelectedLocation({ lat: loc.lat, long: loc.long })
                  }
                >
                  <img
                    src={loc.primary_image}
                    className="w-full h-20 object-cover rounded-md aspect-video"
                    alt={loc.name}
                  />
                  <div className="font-iransans text-center mt-2">
                    {loc.name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Map;
