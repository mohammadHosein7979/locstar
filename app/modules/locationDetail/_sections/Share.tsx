"use client";

import { Button } from "@mui/material";


const Share = () => {
  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "ببین اینو!",
          url: shareUrl,
        });
      } catch (error) {
        console.error("خطا در اشتراک‌گذاری:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="outlined"
      className="cursor-pointer p-2 rounded-lg text-sm w-1/2 lg:w-full text-center bg-white border border-purple-2 text-purple-2 hover:bg-purple-50 transition"
    >
      اشتراک‌گذاری
    </Button>
  );
};

export default Share;
