// sidebar.tsx
import React from 'react';

export function Sidebar({ children, className }) {
  return <div className={`bg-gray-800 text-white fixed top-0 left-0 h-full ${className}`}>{children}</div>;
}

export function SidebarContent({ children, className }) {
  return <div className={`flex flex-col p-4 overflow-y-auto ${className}`}>{children}</div>;
}

export function SidebarFooter({ children, className }) {
  return <div className={`p-4 bg-gray-900 ${className}`}>{children}</div>;
}

export function SidebarGroup({ children, className }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

export function SidebarHeader({ className }) {
  return (
    <div className={`p-4 bg-gray-900 ${className}`}>
      <h2 className="text-xl font-semibold">Sidebar Header</h2>
    </div>
  );
}

export function SidebarTrigger({ className }) {
  return (
    <button
      className={`bg-gray-600 hover:bg-gray-500 text-white p-2 rounded ${className}`}
    >
      Toggle Sidebar
    </button>
  );
}

export function SidebarProvider({ children }) {
  return <div>{children}</div>;
}
