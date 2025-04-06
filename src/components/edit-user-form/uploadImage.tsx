import { CameraIcon } from "lucide-react";
import React from "react";

export default function UploadImage({
  setSelectedFile,
  selectedImage,
}: {
  setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
  selectedImage: string;
}) {
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 0) {
      const url = URL.createObjectURL(file);
      setSelectedFile(url);
    }
  };
  return (
    <div
      className={`${
        selectedImage
          ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
          : ""
      } absolute top-0 left-0 w-full h-full bg-gray-50/20`}>
      <label
        htmlFor="update_photo"
        className="border rounded-full w-[200px] h-[200px] element-center cursor-pointer">
        <CameraIcon className="!w-8 !h-8 text-gray-800" />
      </label>
      <input
        className="hidden"
        id="update_photo"
        type="file"
        accept="image/*"
        name="image"
        onChange={handleChangeFile}
      />
    </div>
  );
}
