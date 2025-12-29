import classNames from "classnames";
import React, { FC } from "react";

interface Props {
  title: string;
  isActive?: boolean;
  onDeleteAttr: () => void;
  onClick?: () => void;
}

const AttrBox: FC<Props> = ({
  title,
  isActive = false,
  onClick,
  onDeleteAttr,
}) => {
  const handleClear = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onDeleteAttr();
  };

  return (
    <button
      className={classNames({
        "rounded-full px-4 py-2 text-xs border flex items-center justify-center ml-1":
          true,
        "bg-gray-100 border-gray-100 text-gray-600": !isActive,
        "border-purple-2 bg-purple-50 text-purple-2": isActive,
      })}
      onClick={onClick}
    >
      {title}
        
      {isActive && (
        <div onClick={handleClear} className="text-purple-2 text-sm mr-2">
          ×
        </div>
      )}
    </button>
  );
};

export default AttrBox;
