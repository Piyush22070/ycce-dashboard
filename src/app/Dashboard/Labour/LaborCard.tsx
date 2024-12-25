import React from "react";
const LabourCard: React.FC<{
  name: string;
  labourInvolved: number;
  siteManager: string; // Site manager's name
  totalLabour: number; // Total labour in the database
}> = ({ name, labourInvolved, siteManager, totalLabour }) => {
  const labourPercentage = totalLabour ? (labourInvolved / totalLabour) * 100 : 0;

  return (
    <div className="flex flex-col items-start p-4 bg-white shadow-md rounded-lg md:w-80 transform transition-transform hover:scale-105">
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
export default LabourCard