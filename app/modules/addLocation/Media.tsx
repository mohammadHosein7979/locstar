"use client";

import { FileUploader } from "@/app/components/common";
import { OwnerLocation } from "@/app/types/model";
import { FC } from "react";
import StepChangerProvider from "./_sections/StepChangerProvider";

interface MediaProps {
  location?: OwnerLocation;
  onNext: () => void;
  onPrev: () => void;
}

const Media: FC<MediaProps> = ({ location, onNext, onPrev }) => {

  return (
    location && (
      <div>
        <FileUploader
          uploadServicePath={`/owner/location/media/${location.id}`}
          formDataKey="media"
          multiple={true}
          onNext={onNext}
          initialFiles={location.media}
        />

        <StepChangerProvider onNext={onNext} onPrev={onPrev} step={4}></StepChangerProvider>
      </div>
    )
  );
};

export default Media;
