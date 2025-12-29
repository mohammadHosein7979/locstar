"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import DiscountsSource from "../discounts/DiscountsSource";
import MyLocationSource from "../myLocation/MyLocationSource";

const OwnerLocationSource = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="لوکیشن‌های من" className="w-1/2" />
          <Tab label="تخفیف‌ها" className="w-1/2" />
        </Tabs>
      </Box>

      <div className="py-4 px-6">
        {value == 0 && <MyLocationSource />}
        {value == 1 && <DiscountsSource />}
      </div>
    </div>
  );
};

export default OwnerLocationSource;
