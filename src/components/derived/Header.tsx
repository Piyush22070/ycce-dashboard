import { Session } from "next-auth"; // Import the Session type
import Image from "next/image"; // For rendering the user's avatar

type HeaderProps = {
  session: Session | null;
};

const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <div className="flex items-center justify-between p-1 bg-gray-100 shadow-md max-w-4xl w-full mx-auto">
      {/* Left Section: Search Icon */}
      <div className="flex items-center">
        <svg
          className="w-6 h-6 text-gray-600"
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
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        {/* Group Icon */}
        <svg
          className="w-6 h-6 text-gray-600"
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

        {/* Notification Icon */}
        <svg
          className="w-6 h-6 text-gray-600"
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

        {/* User Avatar */}
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User Avatar"}
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
          />
        ) : (
          <div className="w-8 h-8 bg-gray-400 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default Header;
