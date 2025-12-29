"use client";

import { FC } from "react";

interface InstagramButtonProps {
  username: string;
  size?: number;
}

const InstagramButton: FC<InstagramButtonProps> = ({ username, size = 50 }) => {
  const handleClick = () => {
    window.open(`https://www.instagram.com/${username}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      style={{ width: size, height: size }}
      className="bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#8134af] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      <i className="fa-brands fa-instagram text-xl"></i>
    </button>
  );
};

export default InstagramButton;
