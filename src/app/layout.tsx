import '@/app/Dashboard/globals.css'
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Define the type for the props
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}


    