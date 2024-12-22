import React from "react";

const BudgetCard: React.FC<{
  name: string;
  total: number;
  spent: number;
}> = ({ name, total, spent }) => {
  const progress = (spent / total) * 100;

  return (
    <div className="flex flex-col items-start p-4 bg-white shadow-md rounded-lg w-80 transform transition-transform hover:scale-105">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-[#111c3d] text-xl font-bold">${total.toLocaleString()}</p>
      </div>
      <div className="w-full h-2 mt-3 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-[#111c3d] rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between w-full mt-2 text-sm text-gray-600">
        <span>${spent.toLocaleString()} Spent</span>
        <span>${total.toLocaleString()} Total</span>
      </div>
    </div>
  );
};

export default BudgetCard;
