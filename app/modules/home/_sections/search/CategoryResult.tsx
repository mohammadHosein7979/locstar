import useLocationQueryStore from "@/app/modules/locations/store";
import { Category } from "@/app/types/model";
import Link from "next/link";

const CategoryResult = ({ categories }: { categories: Category[] }) => {
  const { setCategoryId } = useLocationQueryStore();

  return (
    <div>
      <div className="mb-2">دسته‌بندی‌ها</div>
      {categories.map((category) => (
        <Link
          href="/locations"
          key={category.id}
          className="mb-1 flex items-center text-sm"
          onClick={() => setCategoryId(category.id)}
        >
          <div className="w-7 ml-2 aspect-square rounded-lg bg-purple-100 flex justify-center items-center">
            <span className="icon icon-location text-purple-1"></span>
          </div>
          <span>{category.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryResult;
