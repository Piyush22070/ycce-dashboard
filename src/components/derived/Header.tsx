import { Session } from "next-auth"; // Import the Session type
import Image from "next/image"; // For rendering the user's avatar

type HeaderProps = {
  session: Session | null;
};

const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg max-w-5xl w-full mx-auto rounded-2xl">
      {/* Left Section: Search Box */}
      <div className="flex-1 flex items-center bg-white border rounded-full shadow-sm px-3 max-w-full">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19a8 8 0 100-16 8 8 0 000 16zm6.293-2.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="ml-3 w-full text-gray-600 focus:outline-none border-none placeholder-gray-500"
        />
      </div>

      {/* Right Section: Icons and Avatar */}
      <div className="flex items-center space-x-4 ml-4">
        {/* Group Icon */}
        <div className="relative group">
          <svg
            className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a5 5 0 00-5-5h-6a5 5 0 00-5 5v2h5M12 14a5 5 0 100-10 5 5 0 000 10z"
            />
          </svg>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>

        {/* Notification Icon */}
        <div className="relative group">
          <svg
            className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V4a3 3 0 00-6 0v1.083A6.002 6.002 0 002 11v3.159c0 .538-.214 1.055-.595 1.436L0 17h5m10 0v2a3 3 0 01-6 0v-2m6 0H9"
            />
          </svg>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            5
          </span>
        </div>

        {/* User Avatar */}
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User Avatar"}
            className="w-10 h-10 rounded-full border border-gray-300 shadow-md"
            width={40}
            height={40}
          />
        ) : (
          <div className="w-10 h-10 bg-gray-400 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default Header;