import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export type SiteData = {
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
  manager?: string; // Optionally include the manager field
  labourDetails?: string; // Optionally include labour details field
};

type AddLabourManagerProps = {
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData[];
  onUpdate: () => Promise<void>;
};

const AddLabourManager: React.FC<AddLabourManagerProps> = ({
  isOpen,
  onClose,
  siteData,
  onUpdate,
}) => {
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [selectedManager, setSelectedManager] = useState<string>(""); // New state for manager
  const [labourCount, setLabourCount] = useState<number | "">(""); // New state for number of labour involved

  // Handle submit for adding or updating bill
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSite || !selectedManager || !labourCount) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("manager", selectedManager);
    formData.append("labourInvolved", labourCount.toString()); // Storing labour count

    try {
      // Assuming you're updating or adding details for the selected site
      await axios.put(`/api/data/SiteData/${selectedSite}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Labour/manager information updated successfully!");
      await onUpdate(); // Refresh data
      onClose(); // Close modal
    } 
    catch (_) {
      alert("Failed to update. Please try again."+_);
    }
  };

  useEffect(() => {
    if (selectedSite) {
      const selectedSiteData = siteData.find(site => site.id === selectedSite);
      if (selectedSiteData) {
        // Set initial values for the selected site
        setSelectedManager(selectedSiteData.manager || ""); 
        setLabourCount(selectedSiteData.labourInvolved || ""); // Set the initial labour count
      }
    }
  }, [selectedSite, siteData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add/Update Labour and Manager</h2>
        <form onSubmit={handleSubmit}>
          {/* Select Site */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Site</label>
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a site</option>
              {siteData.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.Location}
                </option>
              ))}
            </select>
          </div>

          {/* Manager */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Manager</label>
            <input
              type="text"
              value={selectedManager}
              onChange={(e) => setSelectedManager(e.target.value)}
              placeholder="Update Manger Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Labour Count */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Number of Labour</label>
            <input
              type="number"
              value={labourCount}
              onChange={(e) => setLabourCount(Number(e.target.value))}
              placeholder="Enter number of labour involved"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="px-4 py-2 bg-[#111c3d] text-white rounded-lg">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLabourManager;
