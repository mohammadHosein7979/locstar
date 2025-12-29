export interface IMapProps {
  locations?: MapLocation[];
  hasSwiper?: boolean;
  onPointSelect?: (point: LatLng) => void;
}

export interface MapLocation {
  name: string;
  primary_image: string;
  lat: number;
  long: number;
}

export interface LatLng {
  lat: number;
  long: number;
}

