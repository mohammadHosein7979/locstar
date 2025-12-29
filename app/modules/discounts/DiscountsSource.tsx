"use client";

import { OwnerDiscount } from '@/app/components/common';
import { useOwnerDiscountList } from '@/app/repository/ownerLocationService';
import DiscountLoading from './DiscountLoading';

const DiscountsSource = () => {
  const { data, isLoading, isError } = useOwnerDiscountList();

  if (isLoading) return <DiscountLoading />;
  if (isError) return null;
  if (!data) return null;

  const grouped = data.data.reduce((acc: any, item: any) => {
    const locId = item.location.id;
    if (!acc[locId]) {
      acc[locId] = {
        location: item.location,
        discounts: [],
      };
    }
    acc[locId].discounts.push(item);
    return acc;
  }, {});

  const groupedArray = Object.values(grouped);

  return (
    <div className="space-y-6">
      {groupedArray.map((group: any) => (
        <div key={group.location.id} className="rounded-lg shadow-sm">
          <h2 className="font-bold text-lg mb-2">{group.location.name}</h2>

          <div className="space-y-2">
            {group.discounts.map((discount: any) => (
              <OwnerDiscount discount={discount} key={discount.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscountsSource;
