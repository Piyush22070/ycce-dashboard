import React from 'react';
import { FaUsers, FaBuilding, FaUserCircle, FaCog, FaSignInAlt, FaUserPlus, FaExclamationTriangle } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-screen bg-blue-950 text-white flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          <span className="text-2xl font-bold">YCCE</span>
          <span className="text-sm ml-1">Production</span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          <ul className="space-y-2">
            <li className="flex items-center px-6 py-2 hover:bg-blue-800">
              <FaUserCircle className="mr-3" />
              <span>Overview</span>
            </li>
            <li className="flex items-center px-6 py-2 hover:bg-blue-800">
              <FaUsers className="mr-3" />
              <span>Customers</span>
            </li>
            <li className="flex items-center px-6 py-2 hover:bg-blue-800">
              <FaBuilding className="mr-3" />
              <span>Companies</span>
            </li>
            <li className="flex items-center px-6 py-2 hover:bg-blue-800">
              <FaUserCircle className="mr-3" />
              <span>Account</span>
            </li>
            <li className="flex items-center px-6 py-2 hover:bg-blue-800">
              <FaCog className="mr-3" />
              <span>Settings</span>
            </li>
            <li className="flex items-center px-6 py-2 hover:bg-blue-800">
              <FaSignInAlt className="mr-3" />
              <span>Login</span>
            </li>
            <li className="flex items-center px-6 py-2 hover:bg-blue-800">
              <FaUserPlus className="mr-3" />
              <span>Register</span>
            </li>
            <li className="flex items-center px-6 py-2 hover:bg-blue-800">
              <FaExclamationTriangle className="mr-3" />
              <span>Error</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
