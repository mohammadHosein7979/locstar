"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import UserInitializer from "./UserInitializer";

const Template = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={pathname}
        className="h-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        {children}
      </motion.div>
      <UserInitializer />
    </>
  );
};

export default Template;
