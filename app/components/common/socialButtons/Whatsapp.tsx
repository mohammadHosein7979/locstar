"use client";

import { FC } from "react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  size?: number;
}

const WhatsAppButton: FC<WhatsAppButtonProps> = ({ phoneNumber, size = 50 }) => {
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      style={{ width: size, height: size }}
      className="bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      <i className="fa-brands fa-whatsapp text-xl"></i>
    </button>
  );
};

export default WhatsAppButton;
