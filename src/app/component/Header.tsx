import { Session } from "next-auth"; // Import the Session type

type HeaderProps = {
  session: Session | null; // Define the type for the session prop
};

const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <div>
      header
      <div>
        name: {session?.user?.name || "Guest"}
      </div>
    </div>
  );
};

export default Header;
