"use client";

import { Drawer } from "@/app/components/ui";
import { useRef, useState } from "react";
import Cropper from "react-cropper";

import { updateUserService } from "@/app/repository/userService";
import useUserStore from "@/app/store/user";
import { Button } from "@mui/material";
import "cropperjs/dist/cropper.css";
import { toast } from "react-toastify";

type ReactCropperElement = HTMLImageElement & {
  cropper: Cropper;
};

const UpdateAvatar = () => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const { updateAvatar } = useUserStore();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCroppedImage(null);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedImageUrl = croppedCanvas.toDataURL();
        setCroppedImage(croppedImageUrl);
      }
    }
  };

  const handleSubmit = async () => {
    if (croppedImage) {
      try {
        setIsSubmitting(true);
        const blob = await fetch(croppedImage).then((res) => res.blob());

        const formData = new FormData();
        formData.append("avatar", blob, "avatar.png");
        formData.append("_method", "PUT");

        updateUserService(formData).then(() => {
          setIsSubmitting(false);
          toast.success("آواتار شما با موفقیت ویرایش شد");
          setOpenDrawer(false);
          updateAvatar(croppedImage);
        });
      } catch (error) {
        console.error("خطا:", error);
        alert("خطا در ارسال تصویر");
      }
    } else {
      alert("لطفاً تصویر را کراپ کنید.");
    }
  };

  return (
    <Drawer
      anchor="bottom"
      title="انتخاب آواتار"
      isOpen={openDrawer}
      onToggle={setOpenDrawer}
      button={
        <div className="border rounded-xl p-2 text-gray-400 border-gray-400 aspect-square flex justify-center items-center w-10">
          <i className="fa-light fa-camera"></i>
        </div>
      }
    >
      <div className="p-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
        />
        {selectedFile && (
          <div className="mt-4">
            <Cropper
              src={URL.createObjectURL(selectedFile)}
              style={{ height: 300, width: "100%" }}
              initialAspectRatio={1}
              guides={true}
              ref={cropperRef}
              viewMode={1}
              minCropBoxHeight={100}
              minCropBoxWidth={100}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
            />
            <div className="mt-4">
              <Button
                variant="outlined"
                onClick={handleCrop}
                className="mt-4 bg-blue-500 text-white-main py-2 px-4 rounded"
              >
                بریدن تصویر
              </Button>
            </div>
          </div>
        )}
        {croppedImage && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">
              پیش‌نمایش تصویر کراپ شده:
            </h3>
            <img
              src={croppedImage}
              alt="Cropped"
              className="w-24 h-24 rounded-full"
            />
            <div className="mt-4">
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="mt-4 bg-green-500 text-white-main py-2 px-4 rounded"
              >
                {isSubmitting ? "در حال ذخیره" : "ذخیره"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default UpdateAvatar;
