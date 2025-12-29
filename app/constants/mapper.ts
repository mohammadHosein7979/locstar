export type Status = "created" | "rejected" | "canceled" | "confirmed" | "paid";

export const statusMap: Record<Status, { label: string; icon: string }> = {
  created: { label: "در انتظار تایید", icon: "access_time text-xl" },
  rejected: { label: "لغو شده", icon: "close-outline text-base" },
  canceled: { label: "لغو شده", icon: "close-outline text-base" },
  confirmed: { label: "در انتظار پرداخت", icon: "credit-card2 text-base" },
  paid: { label: "تایید شده", icon: "checkmark-outline text-base" },
};

export const weatherStatusMap: Record<number, string> = {
    0: "/icons/cloudy-day-1.svg",  // صاف
    1: "/icons/cloudy-day-2.svg",  // صاف 
    2: "/icons/cloudy.svg",        // نیمه ابری
    3: "/icons/cloudy.svg",        // عمدتا ابری
    45: "/icons/cloudy.svg",
    48: "/icons/cloudy.svg",
    51: "/icons/rainy-4.svg",
    53: "/icons/rainy-5.svg",
    55: "/icons/rainy-6.svg",
    56: "/icons/snowy-4.svg",
    57: "/icons/snowy-5.svg",
    61: "/icons/rainy-4.svg",
    63: "/icons/rainy-5.svg",
    65: "/icons/rainy-6.svg",
    66: "/icons/rainy-7.svg",
    67: "/icons/rainy-7.svg",
    71: "/icons/snowy-4.svg",
    73: "/icons/snowy-5.svg",
    75: "/icons/snowy-6.svg",
    77: "/icons/rainy-4.svg",
    80: "/icons/rainy-7.svg",
    81: "/icons/rainy-7.svg",
    82: "/icons/rainy-7.svg",
    85: "/icons/snowy-4.svg",
    86: "/icons/snowy-5.svg",
    96: "/icons/thunder.svg",
} 