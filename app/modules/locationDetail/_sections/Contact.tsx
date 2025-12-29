import { SectionHeader } from "@/app/components/common";
import { FC } from "react";

interface Props {
  phone_numbers: string[] | null;
  address: string | null;
}

const Contact: FC<Props> = ({ phone_numbers, address }) => {
  return (
    <div className="p-container m-eb">
      <SectionHeader title="دسترسی" color="black" />
      <div className="text-sm font-light -mt-4 px-6">
        {phone_numbers && <div className="text-gray-400">تلفن تماس:</div>}
        {phone_numbers && phone_numbers.map((phone,index) => <div key={index}>{phone}</div>)}
        <div className="text-gray-400 mt-2">آدرس:</div>
        <div>{address}</div>
      </div>
    </div>
  );
};

export default Contact;
