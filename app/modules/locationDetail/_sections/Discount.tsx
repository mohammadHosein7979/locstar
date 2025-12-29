"use client";

import { amountNumbers } from "@/app/helpers/amountNumbers";
import { getDiscountService } from "@/app/repository/discountService";
import { Chip, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { toast } from "react-toastify";

interface DiscountProps {
  discount: number;
  locationId: number;
}

const Discount: FC<DiscountProps> = ({ discount, locationId }) => {
  const { status } = useSession();
  const router = useRouter();

  const getDiscount = () => {
    if (status === "authenticated") {
      getDiscountService(locationId)
        .then(() =>
          toast.success("تخفیف برای شما ایجاد شد. می‌تونی از حساب کاربری ببینی")
        )
        .catch((err) => toast.error(err.message));
    } else {
      toast.info(
        <div className="flex flex-col gap-2">
          <p>برای دریافت تخفیف باید وارد حساب کاربری خود شوید.</p>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              toast.dismiss();
              router.push("/auth/signin?type=otp");
            }}
          >
            ورود
          </Button>
        </div>,
        {
          autoClose: false,
          closeOnClick: false,
        }
      );
    }
  };

  return (
    <div className="fixed bottom-[10%] right-4 z-[100]">
      <Chip
        label={`🎉 ${amountNumbers(discount)} تخفیف بگیر!`}
        onClick={getDiscount}
        color="success"
        sx={{
          fontWeight: "bold",
          cursor: "pointer",
          animation: "pulse 1.5s infinite",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.1)" },
            "100%": { transform: "scale(1)" },
          },
        }}
      />
    </div>
  );
};

export default Discount;
