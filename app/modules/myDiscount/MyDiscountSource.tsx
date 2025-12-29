"use client"

import { DiscountCard } from "@/app/components/common";
import { useDiscountList } from "@/app/repository/discountService";
import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";

const MyDiscountSource = () => {
  const { data, isLoading, isError } = useDiscountList();

  const [value, setValue] = useState(0);
  
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) return null;
  if (isError) return null;
  if (!data) return null;

  const activeDiscounts = data.data.filter(d => !d.is_used);
  const expiredDiscounts = data.data.filter(d => d.is_used);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="تخفیف‌های فعال" className="w-1/2" />
          <Tab label="منقضی شده" className="w-1/2" />
        </Tabs>
      </Box>

      <div className="py-4 px-6">
        {value === 0 && (
          activeDiscounts.length > 0 ? (
            activeDiscounts.map(d => <DiscountCard key={d.id} discount={d} />)
          ) : (
            <p className="text-center text-gray-500 py-10">
              هیچ تخفیف فعالی برای شما ثبت نشده
            </p>
          )
        )}

        {value === 1 && (
          expiredDiscounts.length > 0 ? (
            expiredDiscounts.map(d => <DiscountCard key={d.id} discount={d} />)
          ) : (
            <p className="text-center text-gray-500 py-10">
              هیچ تخفیف منقضی‌شده‌ای ندارید
            </p>
          )
        )}
      </div>
    </div>
  )
}

export default MyDiscountSource
