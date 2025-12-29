export { default } from "next-auth/middleware";

export const config = { 
    matcher: [
        "/profile/:path*",
        "/locations/favorites",
        "/locations/add-location",
    ] 
};
