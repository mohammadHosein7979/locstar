import { authOptions } from "@/app/config/auth";
import { API_URL } from "@/app/constants/constats";
import LocationDetail from "@/app/modules/locationDetail/LocationDetail";
import { Location } from "@/app/types/model";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_URL}/location/${slug}`, {
      next: { revalidate: 600 },
    });

    if (!res.ok) throw new Error("Failed to fetch location metadata");

    const data = await res.json();
    const location: Location = data.data;

    return {
      title: `لوک استار - ${location.name}`,
      description: location.description || "پلتفرم جامع لوکیشن های عکاسی",
      openGraph: {
        title: `لوک استار - ${location.name}`,
        description: location.description || "پلتفرم جامع لوکیشن های عکاسی",
        images: [
          {
            url: location.primary_image,
            width: 800,
            height: 600,
            alt: location.name,
          },
        ],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: "لوک استار - لوکیشن",
      description: "پلتفرم جامع لوکیشن های عکاسی",
    };
  }
}

export default async function LocationPage({params}: {params: Promise<{ slug: string }>}) {
  const session = await getServerSession(authOptions);
  const { slug } = await params;
  const res = await fetch(`${API_URL}/location/${slug}`, {
    next: { revalidate: 600 },
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const data = await res.json();
  const location: Location = data.data;

  if (!location) return null;

  return (
    <div>
      <LocationDetail location={location} />
    </div>
  );
};
