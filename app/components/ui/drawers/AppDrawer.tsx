import { Drawer } from "@mui/material";
import React, { cloneElement, FC, ReactElement, ReactNode } from "react";

interface AppDrawerProps {
  title: string;
  anchor: "left" | "right" | "top" | "bottom";
  children: ReactNode;
  isOpen: boolean;
  button: ReactElement<{ onClick?: () => void }>;
  onToggle: (open: boolean) => void;
}

const AppDrawer: FC<AppDrawerProps> = ({
  title,
  anchor,
  children,
  isOpen,
  button,
  onToggle,
}) => {
  const toggleDrawer = (open: boolean) => () => {
    onToggle(open);
  };

  const ButtonWithOnClick = cloneElement(button, {
    onClick: toggleDrawer(true),
  });

  return (
    <>
      {ButtonWithOnClick}

      <Drawer anchor={anchor} open={isOpen} onClose={toggleDrawer(false)}>
        <div className="min-h-[85vh] max-h-[85vh] flex flex-col">
          <div className="p-4 text-center border-b h-14 font-bold flex justify-between items-center">
            <div className="w-5"></div>
            <span>{title}</span>
            <div
              className="w-5 cursor-pointer flex items-center justify-center"
              onClick={toggleDrawer(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto pb-4">{children}</div>
        </div>
      </Drawer>
    </>
  );
};

export default AppDrawer;
