"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BudgetCard from "./BudgetCard";
import AddBillModal from "./AddBillModal";
import Loading from "@/components/derived/loading";

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
const BudgetBillingDashboard: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData[]>([]);
  const [filteredData, setFilteredData] = useState<SiteData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchSiteData = async () => {
    try {
      const response = await axios.get<SiteData[]>("/api/data/SiteData");
      setSiteData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (_) {
        setError("")
        alert("Failed to add the bill. Please try again."+ _);
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

  if (loading) return <Loading/>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Budgets</h1>

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
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-3xl font-bold">+</span>
          <p className="text-sm font-medium mt-2">Add Bill</p>
        </div>

        {filteredData.map((site) => {
          const spent = site.amount * 0.5; // Example: 50% of budget spent

          return (
            <BudgetCard
              key={site.id}
              name={site.Location}
              total={site.amount}
              spent={spent}
            />
          );
        })}
      </div>

      {/* Add Bill Modal */}
      <AddBillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        siteData={siteData}
        onUpdate={fetchSiteData}
      />
    </div>
  );
};

export default BudgetBillingDashboard;
