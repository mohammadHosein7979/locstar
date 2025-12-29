import React, { FC } from "react";
import { Feature as FeatureModel } from "@/app/types/model";
import { SectionHeader } from "@/app/components/common";

interface Props {
  features: FeatureModel[];
}

const Feature: FC<Props> = ({ features }) => {
  return (
    <div>
      <SectionHeader title="امکانات" color="black" />
      <div className="grid grid-cols-3  text-gray-400 gap-2 -mt-4 px-6">
        {features.map((feature) => (
          <div
            className="col-span-1 flex items-center text-sm font-light"
            key={feature.id}
          >
            <span className={`text-xl ml-2 ${feature.icon}`}></span>
            <span>{feature.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
