import Link from 'next/link';
import React from 'react';
import { FaMap ,FaMoneyBillAlt, FaUserCircle, FaCog, FaWordpress, FaExclamationTriangle,  FaSitemap, FaPeopleCarry} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-[1150px] bg-[#111c3d] text-white flex flex-col justify-between text-sm">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex md:flex-row flex-col items-center justify-center py-6">
          <span className="text-1xl font-bold">YCCE</span>
          <span className="text-sm ml-1">Production</span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          <ul className="space-y-2">
            <Link href="/Dashboard" className="flex items-center md:px-6 px-3 py-2 text-white focus:outline-none">
              <FaSitemap className="md:mr-3" />
              <p className="hidden md:block">Overview</p>
            </Link>

            <Link href="/Dashboard/SitePlans" className="flex items-center md:px-6 px-3 py-2 text-white focus:outline-none">
              <FaMap className="md:mr-3" />
              <p className="hidden md:block">SitePlans</p>
            </Link>
            
            <Link href="/Dashboard/Documents" className="flex items-center md:px-6 px-3 py-2 text-white focus:outline-none">
              <FaWordpress className="md:mr-3" />
              <p className="hidden md:block">Document</p>
            </Link>

            <Link href="/Dashboard/Billing" className="flex items-center md:px-6 px-3 py-2 text-white focus:outline-none">
              <FaMoneyBillAlt className="md:mr-3" />
              <p className="hidden md:block">Billing</p>
            </Link>
            
            <Link href="/Dashboard/Labour" className="flex items-center md:px-6 px-3 py-2 text-white focus:outline-none">
              <FaPeopleCarry className="md:mr-3" />
              <p className="hidden md:block">Labour</p>
            </Link>

            <Link href="/Dashboard/Account" className="flex items-center md:px-6 px-3 py-2 text-white focus:outline-none">
              <FaUserCircle className="md:mr-3" />
              <p className="hidden md:block">Account</p>
            </Link>

            <Link href="/Dashboard/Setting" className="flex items-center md:px-6 px-3 py-2 text-white focus:outline-none">
              <FaCog className="md:mr-3" />
              <p className="hidden md:block">Setting</p>
            </Link>

            <Link href="/Dashboard/Error" className="flex items-center md:px-6 px-3 py-2 text-white focus:outline-none">
              <FaExclamationTriangle className="md:mr-3" />
              <p className="hidden md:block">Error</p>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
