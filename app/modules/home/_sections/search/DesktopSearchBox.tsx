import SelectCategory from "./SelectCategory";
import SelectCity from "./SelectCity";

const DesktopSearchBox = () => {
  return (
    <div className="flex items-center bg-purple-50 mt-8 rounded-3xl gap-3 px-4">
      <div className="w-[44%]">
        <SelectCategory />
      </div>
      <div className="w-[44%]">
        <SelectCity />
      </div>
      <div className="w-[12%]">
        <div className="bg-purple-2 rounded-lg text-white h-14 flex justify-center items-center w-full">جستجو</div>
      </div>
    </div>
  );
};

export default DesktopSearchBox;
