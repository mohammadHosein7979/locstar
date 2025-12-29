"use client";

import React, { useState, useEffect, useRef } from "react";

interface ImageUploadProps {
  defaultImage?: string;
  onChange?: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ defaultImage, onChange }) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onChange?.(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange?.(null);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {preview ? (
        <div className="relative w-40 h-40">
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-xl shadow-md border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ) : (
        <div
          onClick={openFilePicker}
          className="w-40 h-40 flex flex-col items-center justify-center bg-gray-100 rounded-xl border border-dashed cursor-pointer hover:bg-gray-200 transition"
        >
          <i className="fa-solid fa-arrow-up-from-bracket text-gray-500 mb-1"></i>
          <span className="text-sm text-gray-500">انتخاب تصویر</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview && (
        <button
          type="button"
          onClick={openFilePicker}
          className="text-sm text-blue-600 hover:underline"
        >
          تغییر تصویر
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
