import Link from 'next/link';
import React from 'react';
import { FaMap, FaPage4 ,FaMoneyBillAlt, FaUserCircle, FaCog, FaWordpress, FaExclamationTriangle,  FaSitemap, FaPeopleCarry} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-[1000px] bg-[#111c3d] text-white flex flex-col justify-between text-sm">
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
            <Link href="/" className="flex items-center px-6 py-2 text-white focus:outline-none">
              <FaSitemap className="mr-3 " />
              <p>Overview</p>
            </Link>

            <Link href="/SitePlans" className="flex items-center px-6 py-2 text-white focus:outline-none">
              <FaMap className="mr-3" />
              <p>SitePlans</p>
            </Link>
            
            <Link href="/Documents" className="flex items-center px-6 py-2 text-white focus:outline-none">
              <FaWordpress className="mr-3" />
              <p>Document</p>
            </Link>

            <Link href="/Billing" className="flex items-center px-6 py-2 text-white focus:outline-none">
              <FaMoneyBillAlt className="mr-3" />
              <p>Billing</p>
            </Link>
            
            <Link href="/Labour" className="flex items-center px-6 py-2 text-white focus:outline-none">
              <FaPeopleCarry className="mr-3" />
              <p>Labour</p>
            </Link>

            <Link href="/Account" className="flex items-center px-6 py-2 text-white focus:outline-none">
              <FaUserCircle className="mr-3" />
              <p>Account</p>
            </Link>

            <Link href="/Setting" className="flex items-center px-6 py-2 text-white focus:outline-none">
              <FaCog className="mr-3" />
              <p>Setting</p>
            </Link>

            <Link href="/Error" className="flex items-center px-6 py-2 text-white focus:outline-none">
              <FaExclamationTriangle className="mr-3" />
              <p>Error</p>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
