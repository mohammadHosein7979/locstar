"use client";

import { FC, useState } from "react";

interface DescriptionProps {
  description: string;
}

const Description: FC<DescriptionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-50 p-8 text-sm text-gray-800 rounded-2xl lg:h-fit">
      <div
        className={`transition-all text-gray-600 ${expanded ? "" : "line-clamp-5"}`}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>

      <div className="flex justify-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-blue-600 text-xs mx-auto font-medium hover:underline"
        >
          {expanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
        </button>
      </div>
    </div>
  );
};

export default Description;
