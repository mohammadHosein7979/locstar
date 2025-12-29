import { SectionHeader } from "@/app/components/common";
import Image from "next/image";
import APPIMAGE from "@/public/images/layout/app.png";

const AboutUs = () => {
  return (
    <div className="mb-8">
      <SectionHeader title="درباره‌ما" color="black" />
      <div className="grid grid-cols-3 px-8 gap-4">
        <div className="col-span-2">
          <p className="text-sm text-justify">
            در لوک استار مجموعه ای از برترین لوکیشنهای فیلم و عکس و مکانهای
            عمومی (با دکوراسیون خاص) را در سراسر ایران گردآوری کردیم تا بتوانید
            علاوه بر استفاده جهت تولید محتوا و مقاصدی از قبیل اجرای مراسم ها و
            غیره مکانی ایده آل را پیدا کنید. هدف ما ایجاد تجربه‌ای آسان و مطمئن
            برای دسترسی به لوکیشن‌های منحصربه‌فرد و متناسب با نیازهای شماست.
          </p>
          <div className="mt-4 w-20 aspect-square rounded-xl shadow-core flex justify-center items-center bg-gray-200 p-1">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=581264&Code=xsP0fCPg6t7EaCMJ1fSXNXj76PnHTH5Y'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=581264&Code=xsP0fCPg6t7EaCMJ1fSXNXj76PnHTH5Y' alt='' style='cursor:pointer' code='xsP0fCPg6t7EaCMJ1fSXNXj76PnHTH5Y'></a>",
              }}
            ></div>
          </div>
        </div>
        <div className="col-span-1">
          <Image src={APPIMAGE} alt="locstar-app" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
