import { defaultAvatar } from "@/app/constants/constats";
import { amountNumbers } from "@/app/helpers/amountNumbers";
import { Discount } from "@/app/types/model";
import { FC } from "react";
import ExpireDiscount from "./ExpireDiscount";

interface OwnerDiscountCardProps {
  discount: Discount;
}

const OwnerDiscount: FC<OwnerDiscountCardProps> = ({ discount }) => {
  return (
    <div className="flex border border-gray-6 my-2 rounded-xl p-1">
      <div>
        <img
          src={discount.user?.avatar ? discount.user.avatar : defaultAvatar}
          className="w-16 aspect-square rounded-lg"
          alt=""
        />
      </div>
      <div className="flex-grow p-2">
        <div className="text-sm flex justify-between">
          <span>{amountNumbers(discount.amount)}</span>

          <div className="flex flex-col items-end gap-2">
            {discount.is_used ? (
              <span className="text-xs text-red-700">منقضی</span>
            ) : (
              <span className="text-xs text-green-700">معتبر</span>
            )}
            {!discount.is_used && (
              <ExpireDiscount onChangeUsed={() => {}} id={discount.id} />
            )}
          </div>
        </div>
        <div className="text-xs text-gray-600">
          <span>
            {discount.user?.name} {discount.user?.family} -{" "}
            {discount.user?.mobile}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OwnerDiscount;
