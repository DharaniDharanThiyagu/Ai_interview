import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({  setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative w-24 h-24 rounded-full border-2 border-amber-400 overflow-hidden">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-amber-400 bg-amber-50">
            <LuUser size={40} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-1 text-sm text-amber-600 hover:underline">
          <LuUpload />
          <span>Upload</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {previewUrl && (
          <button
            onClick={handleRemoveImage}
            className="flex items-center gap-1 text-sm text-red-500 hover:underline"
          >
            <LuTrash />
            <span>Remove</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
