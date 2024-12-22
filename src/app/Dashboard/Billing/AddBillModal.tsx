"use client";

import React, { useState } from "react";
import axios from "axios";

type SiteData = {
    id: string;
    amount: number;
    status: string;
    Location: string;
    date: string;
    PhoneNo: string;
    email: string;
    sitePlan: string;
    labourInvolved: number;
    startDate: string;
    endDate: string;
    description: string;
  };

const AddBillModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData[];
  onUpdate: () => void;
}> = ({ isOpen, onClose, siteData, onUpdate }) => {
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [billAmount, setBillAmount] = useState<number | "">("");
  const [billFile, setBillFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSite || !billAmount || !billFile) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("billFile", billFile);
    formData.append("billAmount", billAmount.toString());

    try {
      await axios.put(`/api/data/SiteData/${selectedSite}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Bill added successfully!");
      onUpdate(); // Refresh data
      onClose(); // Close modal
    } catch (_) {
        alert("Failed to add the bill. Please try again."+ _);
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Bill</h2>
        <form onSubmit={handleSubmit}>
          {/* Select Site */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Site
            </label>
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a site
              </option>
              {siteData.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.Location}
                </option>
              ))}
            </select>
          </div>

          {/* Bill Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bill Amount
            </label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              placeholder="Enter amount"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload Bill */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Bill
            </label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setBillFile(e.target.files?.[0] || null)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Add Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBillModal;
