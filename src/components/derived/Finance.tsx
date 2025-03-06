import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Loading from "./loading";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Define the types for your data
interface SiteData {
  date: string;
  amount: number;
  Location: string;
  labourInvolved: number;
}

export default function Finance() {
  const [data, setData] = useState<SiteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0]


  // Fetch the data from /api/data/SiteData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data/SiteData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: SiteData[] = await response.json();
        setData(result);
        setLoading(false);
      } catch (error: unknown) {
        setData([]);
        if(0) {
          if (error instanceof Error) {
            setError(error.message); // Storing the error message (string)
          } else {
            // If the error is not an instance of Error, set a generic message
            setError('An unknown error occurred.');
          }
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Transform backend data into chart-friendly formats
  const expensesPerMonth = data.map((entry) => ({
    name: new Date(entry.date).toLocaleString("default", { month: "short" }),
    Expeniture: entry.amount / 1000,
  }));

  const labourPerSite = data.map((entry) => ({
    name: entry.Location,
    value: entry.labourInvolved,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF45F8"];

  return (
    <div className="md:p-4">
      <div className="md:w-[1000px] flex flex-col gap-2 md:flex md:flex-row justify-evenly m-10">
        <div className="bg-white p-4 rounded-lg shadow-lg text-sm md:w-[250px]">
          <h2 className="text-gray-600">TOTAL BUDGET</h2>
          <p className="text-2xl font-bold">
            {data.reduce((total, entry) => total + entry.amount, 0).toLocaleString()}
          </p>
          <p className="text-green-500">↑ Since last year</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm md:w-[250px]">
          <h2 className="text-gray-600">TOTAL Labour</h2>
          <p className="text-2xl font-bold">
            {data.reduce((total, entry) => total + entry.labourInvolved, 0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm md:w-[250px]">
          <h2 className="text-gray-600">ONGOING PROJECTS</h2>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm md:w-[250px]">
          <h2 className="text-gray-600">RECENT PROJECT</h2>
          <p className="text-2xl font-bold">Parking</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-4 gap-3 justify-evenly">
        
        <div className="bg-white p-4 rounded-lg shadow-lg text-sm w-full md:w-1/3">
          <h2 className="text-lg font-semibold mb-4">Expenses Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expensesPerMonth}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Expeniture" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm w-full md:w-1/3">
          <h2 className="text-lg font-semibold mb-4">Labour Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={labourPerSite}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {labourPerSite.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-lg text-sm w-full md:w-1/3">
          <h2 className="text-sm font-semibold mb-4 text-center">Project Calendar</h2>
          <Calendar  value={today} className="border-none rounded-lg shadow-md w-full" />
          <p className="mt-4 text-center text-gray-700 font-medium">Selected Project Date: {today}</p>
        </div>

      </div>
    </div>
  );
}
