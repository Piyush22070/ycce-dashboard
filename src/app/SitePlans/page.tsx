"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import axios from "axios"; // Import axios

// Define the Site type (use this if it's not already defined elsewhere)
export type Site = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  Location: string;
  date: string;
  PhoneNo: string;
  email: string;
  sitePlan: string;
};

export default function FileExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Site[]>([]); // State for holding the fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error handling
  const router = useRouter(); // Next.js router hook for navigation

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/data"); // Axios request
        setData(response.data); // Store the fetched data in the state
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter files based on the search query
  const Sites = data.filter((site) =>
    site.Location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle the loading and error states
  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      {/* Title and Search Bar */}
      <div className="mb-4">
        <h1 className="text-lg font-bold mb-2">Site Plan</h1>
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[500px] p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Site Grid */}
      <div className="grid grid-cols-3 gap-4">
        {Sites.map((site) => (
          <div
            key={site.id}
            className="relative cursor-pointer flex flex-col items-center border rounded-lg shadow-sm hover:shadow-md group"
          >
            {/* Image Container */}
            <div className="relative w-[90] aspect-w-1 aspect-h-1 overflow-hidden rounded">
              {/* Image */}
              <img
                src={site.sitePlan}
                alt={site.Location}
                className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
              />
              {/* Vignette Effect */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>

              {/* Edit Button and Name Overlay (Visible after hover) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Location Name */}
                <p className="text-white font-bold text-2xl mb-2">{site.Location}</p>

                {/* Edit Button */}
                <button
                  className="p-2 bg-white text-gray-700 rounded-full shadow hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation triggered by parent onClick
                    router.push(`/SitePlans/${site.id}`); // Navigate to the edit page
                  }}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
