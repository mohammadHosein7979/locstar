export const appRoutes = {
  home: {
    index: "/",
    title: "خانه",
  },
  locations: {
    title: "لوکیشن‌ها",
    index: "/locations",
    child: {
      favorites: {
        title: "علاقه‌مندی‌ها",
        index: "/locations/favorites"
      },
      addLocation: {
        title: "ثبت لوکیشن",
        index: "/add-location",
      }
    }
  },
  explore: {
    title: "اکسپلور",
    index: "/explore"
  },
  profile: {
    title: "پروفایل",
    index: "/profile",
    child: {
      addLocation: {
        title: "ثبت لوکیشن",
        index: "/profile/add-location",
      }
    }
  },
  dashboard: {
    title: "داشبورد",
    index: "/dashboard",
  },
  
};
