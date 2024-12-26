"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/derived/Header";
import { pdfs } from "@/app/api/data/pdfData/pdfdata"
import PdfCard from "@/components/derived/PdfCard";

const Documents: React.FC = () => {
  const { data: session } = useSession();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const togglePopUp = () => {
    setIsPopUpVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 relative">
      {/* Header Component */}
      <div className="py-3">
        <Header session={session} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center py-7">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Manage Your Documents
        </h1>
      </div>

      {/* Display PDFs */}
      <div className="flex justify-center items-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 w-9/12">
          {pdfs.map((pdf) => (
            <PdfCard key={pdf.id} fileUrl={pdf.pdfPath} title={pdf.title} description={pdf.description} />
          ))}
        </div>
      </div>

      {/* Sticky Upload Button */}
      <button
        onClick={togglePopUp}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg transform transition duration-300 hover:scale-110"
      >
        Upload File
      </button>

      {/* Upload Popup */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
          isPopUpVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 ${
            isPopUpVisible ? "scale-100" : "scale-95"
          }`}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Upload a File
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select a file to upload to your document library.
          </p>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-48 mt-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="file"
            />
          </label>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={togglePopUp}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
