// layout.tsx (server-side layout)

import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "../components/derived/SideBar";
import ClientSessionProvider from "./ClientSessionProvider"; // Import the client component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <ClientSessionProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="flex flex-row">
            <div className="w-1/5"><Sidebar/></div>
            <div className="w-4/5">{children}</div>
          </div>
        </body>
      </ClientSessionProvider>
    </html>
  );
}
