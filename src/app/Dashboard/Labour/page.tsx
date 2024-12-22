"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/derived/loading";

type SiteData = {
  id: string;
  Location: string;
  labourInvolved: number;
  siteManager: string; // Site manager's name
};

const LabourCard: React.FC<{
  name: string;
  labourInvolved: number;
  siteManager: string; // Site manager's name
  totalLabour: number; // Total labour in the database
}> = ({ name, labourInvolved, siteManager, totalLabour }) => {
  const labourPercentage = totalLabour ? (labourInvolved / totalLabour) * 100 : 0;

  return (
    <div className="flex flex-col items-start p-4 bg-white shadow-md rounded-lg w-80 transform transition-transform hover:scale-105">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>

      {/* Labour Progress Bar */}
      <div className="w-full h-2 mt-3 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-[#111c3d] rounded-full"
          style={{ width: `${labourPercentage}%` }}
        ></div>
      </div>

      {/* Display Labour Involved / Total Labour */}
      <div className="mt-2 flex justify-between w-full text-sm text-gray-700">
        <p><strong>{labourInvolved} / {totalLabour} Labour</strong></p>
        <p>{labourPercentage.toFixed(2)}%</p>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p><strong>Site Manager:</strong> {siteManager}</p>
      </div>
    </div>
  );
};

const LabourDashboard: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData[]>([]);
  const [totalLabour, setTotalLabour] = useState<number>(0); // State to store total labour
  const [filteredData, setFilteredData] = useState<SiteData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSiteData = async () => {
    try {
      const response = await axios.get<SiteData[]>("/api/data/SiteData");
      setSiteData(response.data);
      setFilteredData(response.data);

      // Calculate the total labour in the database
      const totalLabour = response.data.reduce((sum, site) => sum + site.labourInvolved, 0);
      setTotalLabour(totalLabour);

      setLoading(false);
    } catch (_) {
      setError("Failed to fetch data"+_);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = siteData.filter((site) =>
      site.Location.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  if (loading) return <Loading/>
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Labour Details</h1>

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
        {filteredData.map((site) => {
          return (
            <LabourCard
              key={site.id}
              name={site.Location}
              labourInvolved={site.labourInvolved}
              siteManager={site.siteManager}
              totalLabour={totalLabour}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LabourDashboard;
