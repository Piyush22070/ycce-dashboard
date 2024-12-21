import Login from "./(auth)/Login/Login";

export default async function Home() { 
  // Establish database connection
  return (
    <div>
      <Login />
    </div>
  );
}

