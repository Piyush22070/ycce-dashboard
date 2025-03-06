import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FaUser, FaSignOutAlt, FaBell, FaSearch } from "react-icons/fa";

type HeaderProps = {
  session: Session | null;
};

const Header: React.FC<HeaderProps> = ({ session }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to handle delayed close
  let timeoutId: NodeJS.Timeout;
  const openDropdown = () => {
    clearTimeout(timeoutId);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    timeoutId = setTimeout(() => setDropdownOpen(false), 300); // Delayed close for easy clicking
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 shadow-md">
      {/* Left Section: Search Icon */}
      <div className="flex items-center">
      <div className="flex items-center md:w-[500px] max-w-md bg-white border border-gray-300 rounded-[10px] shadow-sm px-4 py-2">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full outline-none bg-transparent text-gray-700"
      />
    </div>
      </div>

      {/* Right Section: Icons + User Info */}
      <div className="flex items-center space-x-4">
        {/* Group Icon */}
        

        {/* Notification Icon */}
        <div>
          <FaBell/>
        </div>

        {/* User Avatar + Dropdown */}
        {session ? (
          <div 
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            {/* Avatar */}
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              width={40}
              height={40}
            />

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg">
                {/* Profile Button */}
                <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FaUser className="mr-2 text-gray-500" /> Profile
                </button>

                {/* Sign Out Button */}
                <button
                  onClick={() => signOut()}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <FaSignOutAlt className="mr-2" /> Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-4 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
