export interface AddInformationLocation {
    name: string;
    description: string;
    primary_image: File | null;
    city_id: number;
}

export interface AddExtraInformation {
  ig_username?: string;
  whatsapp_number?: string;
  phone_numbers: { value: string }[];
}

export interface AddAddressLocation {
    address: string;
    lat?: number;
    long?: number;
}