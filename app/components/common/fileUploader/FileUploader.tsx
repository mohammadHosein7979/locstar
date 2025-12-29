"use client";

import apiClient from "@/app/repository/api-client";
import { DocType } from "@/app/types/types";
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface UploadFile {
  file: File | null;
  preview: string;
  progress: number;
  status: "idle" | "uploading" | "done" | "error";
  fromServer?: boolean;
  id?: number;
  mediaType?: "image" | "video";
}

interface ServerMedia {
  id: number;
  file: string;
  type: "image" | "video";
}

interface Props {
  uploadServicePath: string;
  formDataKey: "media" | "document";
  multiple?: boolean;
  type?: DocType;
  onNext?: () => void;
  initialFiles?: ServerMedia[];
}

const FileUploader: React.FC<Props> = ({
  uploadServicePath,
  multiple = true,
  formDataKey,
  type,
  onNext,
  initialFiles = [],
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFiles.length > 0) {
      const serverFiles: UploadFile[] = initialFiles.map((media) => ({
        id: media.id,
        file: null,
        preview: media.file,
        progress: 100,
        status: "done",
        fromServer: true,
        mediaType: media.type,
      }));
      setFiles(serverFiles);
    }
  }, [initialFiles]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validTypes = ["image/", "video/"];

    const newItems: UploadFile[] = Array.from(selectedFiles)
      .filter(
        (file) =>
          validTypes.some((t) => file.type.startsWith(t)) &&
          !files.some(
            (f) =>
              f.file &&
              f.file.name === file.name &&
              f.file.size === file.size
          )
      )
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: "idle" as const,
        fromServer: false,
      }));

    setFiles((prev) => [...prev, ...newItems]);

    if (inputRef.current) inputRef.current.value = "";
  };

  const uploadFile = async (uploadFile: UploadFile, index: number) => {
    if (!uploadFile.file) return; 

    const formData = new FormData();
    formData.append(formDataKey, uploadFile.file);

    if (!multiple && type) {
      formData.append("type", type);
    }

    const mimeType = uploadFile.file.type;
    const isImage = mimeType.startsWith("image/");
    formData.append("type", isImage ? "image" : "video");

    try {
      setFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, status: "uploading" } : f))
      );

      await apiClient.post(uploadServicePath, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setFiles((prev) =>
            prev.map((f, i) => (i === index ? { ...f, progress: percent } : f))
          );
        },
      });

      setFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, status: "done" } : f))
      );
      if (onNext) onNext();
    } catch (err) {
      console.error(err);
      setFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, status: "error" } : f))
      );
    }
  };

  const handleUploadAll = () => {
    files.forEach((file, i) => {
      if (!file.fromServer && (file.status === "idle" || file.status === "error")) {
        uploadFile(file, i);
      }
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const file = prev[index];
      if (file.preview && !file.fromServer) URL.revokeObjectURL(file.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className="max-w-xl mx-auto mt-10 p-6 border-2 border-dashed rounded-xl shadow-sm hover:shadow-md transition bg-white"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center space-y-4">
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          accept="image/*,video/*"
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="text-blue-600 font-medium hover:underline"
        >
          انتخاب فایل یا کشیدن داخل اینجا
        </button>
        <Button
          onClick={handleUploadAll}
          disabled={files.filter((f) => !f.fromServer).length === 0}
          variant="contained"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          آپلود
        </Button>
      </div>

      <ul className="mt-6 space-y-4">
        {files.map((item, i) => (
          <li
            key={item.id ?? i}
            className="border p-3 rounded-lg flex gap-4 items-start bg-gray-50"
          >
            {item.preview &&
              (item.mediaType === "video" || item.file?.type?.startsWith("video/")
                ? (
                  <video
                    src={item.preview}
                    className="w-16 h-16 object-cover rounded-md"
                    autoPlay
                    muted
                    loop
                  />
                )
                : (
                  <img
                    src={item.preview}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ))}

            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium truncate w-3/4">
                {item.file ? item.file.name : `فایل #${item.id}`}
              </p>

              {!item.fromServer && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        item.status === "error"
                          ? "bg-red-500"
                          : item.status === "done"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.status === "idle" && "در انتظار آپلود"}
                    {item.status === "uploading" && "در حال آپلود..."}
                    {item.status === "done" && "آپلود شده ✅"}
                    {item.status === "error" && "خطا در آپلود ❌"}
                  </p>
                  {item.status === "error" && (
                    <button
                      onClick={() => uploadFile(item, i)}
                      className="text-blue-600 text-xs mt-1 hover:underline"
                    >
                      تلاش مجدد
                    </button>
                  )}
                </>
              )}

              {item.fromServer && (
                <a
                  href={item.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs mt-1 hover:underline"
                >
                  مشاهده در تب جدید
                </a>
              )}
            </div>

            <button
              onClick={() => removeFile(i)}
              className="text-sm text-red-500 hover:underline"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploader;
