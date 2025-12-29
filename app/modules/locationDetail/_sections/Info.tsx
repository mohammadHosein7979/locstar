import { LazyBlurImage } from "@/app/components/ui";
import { Category } from "@/app/types/model";
import { FC } from "react";

interface Props {
  primaryImage: string;
  name: string;
  cityName: string;
  categories?: Category[]
}

const Info: FC<Props> = ({ primaryImage, cityName, name, categories }) => {
  return (
    <div className="flex items-center">
      <LazyBlurImage
        src={primaryImage}
        alt={`${name}-${cityName}`}
        className="w-24 aspect-square rounded-full object-cover"
      />
      <div className="mr-2">
        <div className="font-bold">{name}</div>
        <div className="text-sm text-gray-700">
          <i className="fa-solid fa-location-dot ml-2 text-pink-1"></i>
          {cityName}
        </div>
        <div className="flex gap-2">
          {categories?.map(category => (
            <div key={category.id} className="text-xs font-light bg-purple-50 text-purple-2 px-2 py-1 rounded-full">
              <i className={`${category.icon} ml-1`}></i>
              {category.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
