
import React, { useRef, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext.tsx';

const ImageUploader = ({ photos, setPhotos }) => {
  const fileInputRef = useRef(null);
  const { t } = useContext(LanguageContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Fix: Explicitly type 'file' as File to access its properties.
      Array.from(files).forEach((file: File) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              setPhotos(prev => [...prev, reader.result]);
            }
          };
          // Fix: 'file' is now correctly typed as Blob (File extends Blob).
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    React.createElement("div", null,
      React.createElement("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-4" },
        photos.map((photo, index) => (
          React.createElement("div", { key: index, className: "relative aspect-square" },
            React.createElement("img", { src: photo, alt: `upload-preview-${index}`, className: "w-full h-full object-cover rounded-md" }),
            React.createElement("button",
              {
                type: "button",
                onClick: () => removePhoto(index),
                className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold"
              },
              "×"
            )
          )
        ))
      ),
      React.createElement("input",
        {
          type: "file",
          ref: fileInputRef,
          onChange: handleFileChange,
          multiple: true,
          accept: "image/*",
          capture: "environment",
          className: "hidden"
        }
      ),
      React.createElement("button",
        {
          type: "button",
          onClick: () => fileInputRef.current?.click(),
          className: "w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors"
        },
        t('form.addPhoto')
      )
    )
  );
};

export default ImageUploader;