"use client";

import ImageUpload from "@/app/components/ui/inputs/FileInput";
import { updateDocuments } from "@/app/repository/ownerLocationService";
import { OwnerLocation } from "@/app/types/model";
import { DocType } from "@/app/types/types";
import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import StepChangerProvider from "./_sections/StepChangerProvider";

interface DocsProps {
  location?: OwnerLocation;
  onNext: () => void;
  onPrev: () => void;
}

const docLabels: Record<DocType, string> = {
  business_license: "مجوز کسب‌وکار",
  ownership_document: "سند مالکیت",
  ecotourism_permit: "مجوز بوم‌گردی",
  national_card: "کارت ملی",
  bad_background_certificate: "گواهی عدم سوءپیشینه",
};

const Docs: FC<DocsProps> = ({ location, onNext, onPrev }) => {
  const [docs, setDocs] = useState<Record<DocType, File | null>>({
    business_license: null,
    ownership_document: null,
    ecotourism_permit: null,
    national_card: null,
    bad_background_certificate: null,
  });

  const [defaultDocs, setDefaultDocs] = useState<Record<DocType, string | null>>({
    business_license: null,
    ownership_document: null,
    ecotourism_permit: null,
    national_card: null,
    bad_background_certificate: null,
  });

  useEffect(() => {
    if (location?.documents) {
      const filled: Record<DocType, string | null> = {
        business_license: null,
        ownership_document: null,
        ecotourism_permit: null,
        national_card: null,
        bad_background_certificate: null,
      };

      location.documents.forEach((doc) => {
        filled[doc.type] = doc.file;
      });

      setDefaultDocs(filled);
    }
  }, [location]);

  const handleFileChange = (type: DocType, file: File | null) => {
    setDocs((prev) => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async () => {
  const uploadPromises = (Object.keys(docs) as DocType[]).map(async (type) => {
    const file = docs[type];
    if (!file) return null;

    const formData = new FormData();
    formData.append("type", type);       
    formData.append("document", file);

    return updateDocuments(formData, location?.id);
  });

  try {
    await Promise.all(uploadPromises);
    onNext();
  } catch (err) {
    console.error("خطا در آپلود اسناد:", err);
  }
};


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(docLabels).map(([key, label]) => (
          <div key={key} className="col-span-1">
            <p className="mb-2 text-sm font-medium">{label}</p>
            <ImageUpload
              defaultImage={defaultDocs[key as DocType] || undefined}
              onChange={(file) => handleFileChange(key as DocType, file)}
            />
          </div>
        ))}
      </div>

      <StepChangerProvider onNext={onNext} onPrev={onPrev} step={5}>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          ذخیره
        </Button>
      </StepChangerProvider>
    </div>
  );
};

export default Docs;
