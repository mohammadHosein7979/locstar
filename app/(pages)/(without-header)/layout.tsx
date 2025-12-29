import { PropsWithChildren } from "react";
import NavBarWrapper from "../NavBarWrapper";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex-grow lg:px-[15%]">{children}</div>
      <NavBarWrapper />
    </div>
  );
};

export default layout;
