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

// Define the types for your data
interface SiteData {
  date: string;
  amount: number;
  Location: string;
  labourInvolved: number;
}

export default function Finance() {
  const [data, setData] = useState<SiteData[]>([]); // Specify the type here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data from /api/data/SiteData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data/SiteData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: SiteData[] = await response.json(); // Specify the type of the result
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Transform backend data into chart-friendly formats
  const expensesPerMonth = data.map((entry) => ({
    name: new Date(entry.date).toLocaleString("default", { month: "short" }),
    Expeniture: entry.amount / 1000, // Converting to thousands for better display
  }));

  const labourPerSite = data.map((entry) => ({
    name: entry.Location,
    value: entry.labourInvolved,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF45F8"];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-gray-600">TOTAL BUDGET</h2>
          <p className="text-2xl font-bold">
            {data.reduce((total, entry) => total + entry.amount, 0).toLocaleString()}
          </p>
          <p className="text-green-500">↑ Since last year</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-gray-600">TOTAL Labour</h2>
          <p className="text-2xl font-bold">
            {data.reduce((total, entry) => total + entry.labourInvolved, 0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-gray-600">ONGOING PROJECTS</h2>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-gray-600">RECENT PROJECT</h2>
          <></>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
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

        {/* Labour Distribution Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
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
      </div>
    </div>
  );
}
