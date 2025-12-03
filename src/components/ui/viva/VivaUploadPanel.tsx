"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface VivaUploadPanelProps {
  onImageUpload?: (file: File) => void;
  onImageRemove?: () => void;
}

export function VivaUploadPanel({ onImageUpload, onImageRemove }: VivaUploadPanelProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
          if (onImageUpload) {
            onImageUpload(file);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (onImageRemove) {
      onImageRemove();
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {!image ? (
        <motion.div
          whileHover={{ scale: 1.01 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging
              ? "border-yellow-400 bg-yellow-400/5"
              : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-yellow-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Upload Image</h3>
          <p className="text-sm text-white/60 text-center max-w-xs">
            Drag and drop your image here, or click to browse
          </p>
          <p className="text-xs text-white/40 mt-4">
            Supports JPG, PNG, WebP (Max 10MB)
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            accept="image/*"
            className="hidden"
          />
        </motion.div>
      ) : (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-auto object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemoveImage}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default VivaUploadPanel;
