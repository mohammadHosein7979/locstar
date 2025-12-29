import FilterCategory from "./_sections/filterCategory/FilterCategory";
import FilterCity from "./_sections/filterCity/FilterCity";
import LocationsList from "./_sections/list/LocationsList";
import LocationBanner from "./_sections/locationBanner/LocationBanner";
import Search from "./_sections/search/Search";

const LocationsSource = () => {
  return (
    <div className="flex">
      <div className="w-full overflow-y-auto">
        <LocationBanner />
        <div className="flex mx-4 my-2">
          <Search />
          <FilterCategory />
          <FilterCity />
        </div>
        <LocationsList />
      </div>
    </div>
  );
};

export default LocationsSource;
