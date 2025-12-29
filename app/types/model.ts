import { DocType } from "./types";

export interface User {
  id: number;
  name?: string;
  family?: string;
  avatar: string;
  is_owner: boolean;
  mobile: string
}

export interface Banner {
  id: number;
  image: string;
  resource_slug: string;
}

export interface Category {
  id: number;
  title: string;
  icon: string;
  icon_color: string;
}

export interface WeatherData {
  date: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  weathercode: number;
}

export interface Location {
  id: number;
  name: string;
  description: string;
  phone_numbers: string[];
  address: string;
  lat: number;
  long: number;
  ig_username: string;
  whatsapp_number: string;
  primary_image: string;
  is_favorite: boolean;
  is_verified: boolean;
  payment_per_hour: number;
  basic_persons_capacity: number;
  basic_artists_capacity: number;
  payment_per_extra_person: number;
  payment_per_extra_artist: number;
  payment_per_extra_artists: number;
  terms_conditions: string;
  artist_terms_conditions: string;
  media: Media[];
  features: Feature[];
  categories?: Category[];
  city: City;
  discount: number;
  referral_discount?: number;
  fee: number;
  rate: number;
  slug: string;
}

export interface OwnerLocation extends Location {
  phone_numbers: string[]
  documents: {
    id: number;
    file: string;
    type: DocType
  }[]
}

export interface Media {
  id: number;
  file: string;
  type: "image" | "video";
}

export interface City {
  id: number;
  name: string;
  image: string;
}

export interface Feature {
  id: number;
  title: string;
  icon: string;
  icon_color: string;
}

export interface BlogList {
  id: number;
  cover_image: string;
  description?: string;
}

export interface Blog {
  id: number;
  video?: string;
  cover_image: string;
  description: string;
  keywords?:  string[]
}

export interface Discount {
  id: number;
  amount: number;
  is_used: boolean;
  location: Location;
  user?: User
}