"use client";

import { mobileWidth } from "@/app/constants/constats";
import { useMediaQuery } from "@mui/material";

const CopyRight = () => {
  const isMobile = useMediaQuery(mobileWidth);

  return (
    !isMobile && (
      <div className="bg-gray-400">
        کلیه حقوق این وبسایت متعلق به هلدینگ BELLe می باشد.
      </div>
    )
  );
};

export default CopyRight;
