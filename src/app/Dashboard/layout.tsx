// layout.tsx (server-side layout)
import './globals.css'
import Sidebar from "@/components/derived/SideBar";
import ClientSessionProvider from '@/app/(auth)/ClientSessionProvider' // Import the client component
import Footer from "@/components/derived/Footer";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";



export const metadata = {
  title: "DashBoard",
  description: "Generated by Ycce",
};

// Define the type for the props
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
       <link rel="icon" href="/images/logo.png" type="/images/png" sizes="32x32" />
      <ClientSessionProvider>
        <body >
        <main>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel
                defaultSize={12} 
                className="bg-gray-200"
              ><Sidebar />
              </ResizablePanel>

              <ResizableHandle className="bg-gray-300 w-1" withHandle />

              <ResizablePanel
                defaultSize={88}>
                <div>{children}</div>
              </ResizablePanel>
            </ResizablePanelGroup>
        </main>
        <Footer/>
        </body>
      </ClientSessionProvider>
    </html>
  );
}


    