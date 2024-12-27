import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";

interface PdfCardProps {
  fileUrl: string;
  title: string;
  description: string;
}

const PdfCard: React.FC<PdfCardProps> = ({ fileUrl, title, description }) => {
  const thumbnailPluginInstance = thumbnailPlugin();

  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col items-center border shadow-lg hover:shadow-xl group overflow-hidden w-full max-w-3xl mx-auto no-underline"
    >
      {/* PDF Thumbnail */}
      <div className="relative w-full h-72 cursor-pointer bg-gray-100 flex items-center justify-center">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
          <div className="h-full w-full">
            <Viewer
              fileUrl={fileUrl}
              plugins={[thumbnailPluginInstance]}
              initialPage={0} // Display the first page by default
            />
          </div>
        </Worker>
      </div>

      {/* PDF Info */}
      <div className="w-full bg-white dark:bg-gray-800 p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </a>
  );
};

export default PdfCard;
