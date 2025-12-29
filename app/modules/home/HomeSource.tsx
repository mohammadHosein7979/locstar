import AboutUs from "./_sections/AboutUs";
import BusinessBanners from "./_sections/businessBanners/BusinessBanners";
import Download from "./_sections/Download";
import NewLocations from "./_sections/newLocations/NewLocations";
import HomeSourceLayout from "./HomeSourceLayout";

const HomeSource = () => {
  return (
    <div className="bg-gradient-to-b from-purple-1 to-white md:bg-white md:bg-none">
      <div className="bg-gradient-to-b from-purple-2 to-purple-3 md:bg-white md:bg-none">
        <div className="min-h-[600px] md:min-h-fit bg-[url('/images/layout/bg-map.png')] md:bg-none bg-contain bg-no-repeat">
          <div className="h-[150px] md:hidden"></div>
          <div className="py-8">
            <HomeSourceLayout />
            <NewLocations />
          </div>
        </div>
      </div>

      <div className="relative">
        <svg
          className="w-full h-fit -mt-[1px] absolute z-0 md:hidden"
          viewBox="0 0 1441.074 490.803"
        >
          <path
            d="M0,0H1441.074V490.411S1272.95,506.853,723.933,326.744,0,0,0,0Z"
            fill="#5657ce"
          />
        </svg>

        <div className="z-50 relative">
          <div className="mb-8">
            <BusinessBanners />
          </div>
          <AboutUs />
        </div>
        <Download />
      </div>
    </div>
  );
};

export default HomeSource;
