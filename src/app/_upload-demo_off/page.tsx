"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadPanel } from "@/components/ui/viva";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

export default function UploadDemoPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const handleFilesChange = (files: File[]) => {
    setSelectedFiles(files);
    console.log('Files selected:', files);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Advanced Upload Panel</h1>
        <p className="text-white/70">
          Premium drag-and-drop file upload with preview, replacement, and validation
        </p>
      </motion.div>
      
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 bg-black/20 backdrop-blur-lg rounded-lg p-1">
          <TabsTrigger value="single">Single Upload</TabsTrigger>
          <TabsTrigger value="multiple">Multiple Upload</TabsTrigger>
          <TabsTrigger value="video">Video Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single" className="space-y-6">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Single Image Upload</h2>
            <p className="text-white/70 mb-6">
              Upload a single image for processing. Supports JPG, PNG, and WebP formats.
            </p>
            
            <UploadPanel
              maxFiles={1}
              maxFileSize={10}
              allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
              onFilesChange={handleFilesChange}
            />
            
            {selectedFiles.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-white">Ready to Process</h3>
                    <p className="text-white/60 text-sm">
                      {selectedFiles[0].name} ({(selectedFiles[0].size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 bg-viva-yellow text-black font-medium rounded-lg flex items-center gap-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="multiple" className="space-y-6">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Multiple Image Upload</h2>
            <p className="text-white/70 mb-6">
              Upload up to 2 images for comparison or transformation. Supports JPG, PNG, and WebP formats.
            </p>
            
            <UploadPanel
              maxFiles={2}
              maxFileSize={10}
              allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
              onFilesChange={handleFilesChange}
            />
            
            {selectedFiles.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-white">Ready to Process</h3>
                    <p className="text-white/60 text-sm">
                      {selectedFiles.length} {selectedFiles.length === 1 ? 'image' : 'images'} selected
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 bg-viva-yellow text-black font-medium rounded-lg flex items-center gap-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="video" className="space-y-6">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Video Upload</h2>
            <p className="text-white/70 mb-6">
              Upload a short video for processing. Supports MP4 and QuickTime formats.
            </p>
            
            <UploadPanel
              maxFiles={1}
              maxFileSize={50}
              allowedTypes={['video/mp4', 'video/quicktime']}
              onFilesChange={handleFilesChange}
            />
            
            {selectedFiles.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-white">Ready to Process</h3>
                    <p className="text-white/60 text-sm">
                      {selectedFiles[0].name} ({(selectedFiles[0].size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 bg-viva-yellow text-black font-medium rounded-lg flex items-center gap-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 p-6 bg-black/30 backdrop-blur-lg rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Component Features</h2>
        
        <ul className="space-y-2 text-white/80">
          <li className="flex items-start gap-2">
            <span className="text-viva-yellow">•</span>
            <span>Drag and drop file upload with visual feedback</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-viva-yellow">•</span>
            <span>File type validation (images and videos)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-viva-yellow">•</span>
            <span>File size validation with customizable limits</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-viva-yellow">•</span>
            <span>Rich preview for both images and videos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-viva-yellow">•</span>
            <span>Replace and remove functionality</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-viva-yellow">•</span>
            <span>Support for multiple file uploads</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-viva-yellow">•</span>
            <span>Error messages with automatic dismissal</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
