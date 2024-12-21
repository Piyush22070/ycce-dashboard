"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export type Site = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
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

export default function SiteForm() {
  const [formData, setFormData] = useState<Site>({
    id: "",
    amount: 0,
    status: "pending",
    Location: "",
    date: "",
    PhoneNo: "",
    email: "",
    sitePlan: "",
    labourInvolved: 0,
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/data/SiteData", formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast({
        title: "success",
        description: "Site data successfully added",
      })
      // Optionally clear the form
      setFormData({
        id: "",
        amount: 0,
        status: "pending",
        Location: "",
        date: "",
        PhoneNo: "",
        email: "",
        sitePlan: "",
        labourInvolved: 0,
        startDate: "",
        endDate: "",
        description: "",
      });
    } catch (error : any) {
        toast({
            title: "failed",
            description: error.message,
          })
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Site Details Form</h2>
      <form className="space-y-4">
        {/* ID */}
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            Site ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Site ID"
          />
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Amount"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="Location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="Location"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Location"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="PhoneNo" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="PhoneNo"
            name="PhoneNo"
            value={formData.PhoneNo}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Phone Number"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Email Address"
          />
        </div>

        {/* Site Plan */}
        <div>
          <label htmlFor="sitePlan" className="block text-sm font-medium text-gray-700">
            Site Plan
          </label>
          <input
            type="text"
            id="sitePlan"
            name="sitePlan"
            value={formData.sitePlan}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Site Plan"
          />
        </div>

        {/* Labour Involved */}
        <div>
          <label htmlFor="labourInvolved" className="block text-sm font-medium text-gray-700">
            Labour Involved
          </label>
          <input
            type="number"
            id="labourInvolved"
            name="labourInvolved"
            value={formData.labourInvolved}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Labour Count"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Description"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <Button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={handleSubmit}
          >
            Add Site
          </Button>
        </div>
      </form>
    </div>
  );
}
