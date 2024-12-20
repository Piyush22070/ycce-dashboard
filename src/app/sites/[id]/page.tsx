"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { FaCalendar, FaPhone, FaFacebookMessenger, FaEdit } from 'react-icons/fa';

interface DataItem {
  sitePlan: string;
  id: string;
  Location: string;
  status: string;
  date: string;
  PhoneNo: string;
  email: string;
  description : string
}

export default function ProfileCard({ params }: any) {
  const [data, setData] = useState<DataItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before the request
      try {
        const response = await axios.get("http://localhost:3000/api/data"); // Axios request
        const profileData = response.data.find((item: DataItem) => item.id === params.id);
        setData(profileData); // Store the fetched data in state
      } catch (err: any) {
        // Handle errors
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchData(); // Call the fetchData function
  }, [params.id]); // Re-run the effect when params.id 

  if (loading) {
    return <div className="p-12 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-12 text-center text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-12 text-center">No data found for the given profile.</div>;
  }

  return (
    <div className="p-12">
      <div className="mx-auto h-[700px] bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left - Profile Image Container */}
        <div className="relative w-2/3 aspect-w-1 aspect-h-1 overflow-hidden rounded group">
          <img
            src={data.sitePlan}
            alt={data.Location}
            className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
          />
          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>

          {/* Edit Button and Name Overlay (Visible after hover) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Location Name */}
            <p className="text-white font-bold text-2xl mb-2">{data.Location}</p>

            {/* Edit Button */}
            <button
              className="p-2 bg-white text-gray-700 rounded-full shadow hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation triggered by parent onClick
                // Assuming you want to navigate to a page with the profile ID (change as necessary)
                window.location.href = `/SitePlans/${data.id}`;
              }}
            >
              <FaEdit />
            </button>
          </div>
        </div>

        {/* Right - Information Section */}
        <div className="w-2/3 p-6">
          <h1 className="text-3xl font-bold text-gray-900">{data.Location}</h1>
          <p className="text-sm text-gray-700 mb-4">{data.status}</p>

          <p className="text-gray-600 mb-6">
            {data.description}
          </p>

          {/* Personal Information */}
          <div>
            <p className="flex items-center mb-2">
              <span className="mr-2"><FaCalendar /></span> {data.date}
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2"><FaPhone /></span> {data.PhoneNo}
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2"><FaFacebookMessenger /></span> {data.email}
            </p>
          </div>
        </div>
      </div>

      <a className="p-2" href="/">
        <Button variant="secondary">Back</Button>
      </a>
    </div>
  );
}
