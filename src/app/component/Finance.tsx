import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Finance(){
  // Dummy data for the charts
  const salesData = [
    { name: 'Jan', sales: 15000 },
    { name: 'Feb', sales: 18000 },
    { name: 'Mar', sales: 8000 },
    { name: 'Apr', sales: 5000 },
    { name: 'May', sales: 12000 },
    { name: 'Jun', sales: 13000 },
    { name: 'Jul', sales: 15000 },
    { name: 'Aug', sales: 16000 },
    { name: 'Sep', sales: 14000 },
    { name: 'Oct', sales: 17000 },
    { name: 'Nov', sales: 18000 },
    { name: 'Dec', sales: 19000 },
  ];

  const trafficData = [
    { name: 'Desktop', value: 63 },
    { name: 'Tablet', value: 15 },
    { name: 'Phone', value: 22 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-gray-600">BUDGET</h2>
          <p className="text-2xl font-bold">$24k</p>
          <p className="text-green-500">↑ 12% Since last month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-gray-600">TOTAL CUSTOMERS</h2>
          <p className="text-2xl font-bold">1.6k</p>
          <p className="text-red-500">↓ 16% Since last month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-gray-600">TASK PROGRESS</h2>
          <p className="text-2xl font-bold">75.5%</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-gray-600">TOTAL PROFIT</h2>
          <p className="text-2xl font-bold">$15k</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-lg font-semibold mb-4">Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Source Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg text-sm">
          <h2 className="text-lg font-semibold mb-4">Traffic Source</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {trafficData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-4">
            <div className="mr-4 text-center">
              <p className="text-gray-600">Desktop</p>
              <p className="font-bold">63%</p>
            </div>
            <div className="mr-4 text-center">
              <p className="text-gray-600">Tablet</p>
              <p className="font-bold">15%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Phone</p>
              <p className="font-bold">22%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


