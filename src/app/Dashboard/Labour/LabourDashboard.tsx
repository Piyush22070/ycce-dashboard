"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AddLabourManager from './AddLabbourModal'; // Import the modal for adding labour/manager
import Loading from "@/components/derived/loading"; // Loading component
import LabourCard from './LaborCard'; // Import the LabourCard component

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

const LabourManagement: React.FC = () => {  // Corrected the name here
  const [siteData, setSiteData] = useState<SiteData[]>([]);
  const [filteredData, setFilteredData] = useState<SiteData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [totallabourCount, setTotalLabourCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch site data from the API
  const fetchSiteData = async () => {
    try {
      const response = await axios.get<SiteData[]>("/api/data/SiteData");
      setSiteData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (_) {
      setError("Failed to load site data."+_);
    }
  };

  useEffect(() => {
    fetchSiteData(); // Fetch data on component mount
  }, []);

  // Handle the search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = siteData.filter((site) =>
      site.Location.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  // Calculate total labour count for all sites
  useEffect(() => {
    const totalLabour = siteData.reduce((acc, site) => acc + site.labourInvolved, 0);
    setTotalLabourCount(totalLabour);
  }, [siteData]);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Labours</h1>

      {/* Search Bar */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by location..."
          className="w-[500px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-300"
          onClick={() => setIsModalOpen(true)} // Open the modal when clicked
        >
          <span className="text-3xl font-bold">+</span>
          <p className="text-sm font-medium mt-2">Add Labours/Managers</p>
        </div>

        {/* Display filtered data using LabourCard */}
        {filteredData.map((site) => {
          return (
            <LabourCard
              key={site.id}
              name={site.Location}
              labourInvolved={site.labourInvolved}
              siteManager={"XYZ"} // Replace with dynamic data if available
              totalLabour={totallabourCount}
            />
          );
        })}
      </div>

      {/* Add Labour Manager Modal */}
      <AddLabourManager
        isOpen={isModalOpen}  // Corrected this line to pass the correct state value
        onClose={() => setIsModalOpen(false)}
        siteData={siteData}
        onUpdate={fetchSiteData}
      />
    </div>
  );
};

export default LabourManagement;  // Corrected the name here as well
