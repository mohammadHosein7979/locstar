import LocationsSource from "@/app/modules/locations/LocationsSource";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const product = {
    title: "لوک استار - لوکیشن ها",
    description: "پلتفرم جامع لوکیشن های عکاسی",
    imageUrl: "https://example.com/product-image.jpg",
  };

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

const page = () => {

  return <LocationsSource />;
};

export default page;
