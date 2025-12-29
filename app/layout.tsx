import type { Metadata } from "next";
import Providers from "./components/provider/providers";
import { fonts } from "./constants/fonts";

import "./styles/all.min.css";
import "./styles/globals.css";
import "./styles/icons.css";

export const metadata: Metadata = {
  title: "لوک استار",
  description: "پلتفرم جامع لوکیشن های عکاسی",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`h-screen ${fonts.iranSans.variable}`}>
        <Providers>
          <div className="w-full mx-auto md:mx-0 h-full font-iransans">
            <main className="h-full w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
