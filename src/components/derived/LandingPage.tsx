"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-8 h-8 text-[#111c3d]" />
          <span className="text-sm font-bold">Ycce-DashBoard</span>
        </div>
        <div className="flex space-x-4 text-sm">
          <Button className="px-4 py-2"><Link href='/Dashboard'>Dashboard</Link></Button>
          <Button className="px-4 py-2 bg-[#111c3d] text-white rounded-md">
          <Link href='/Dashboard'>Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mt-[170px] px-4">
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Manager Your Expense
        </motion.h1>
        
        <motion.h2 
          className="text-xl font-bold text-[#111c3d] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Control your Money
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Start Creating your budget and save ton of money
        </motion.p>
        
        <motion.button 
          className="px-8 py-3 bg-[#111c3d] text-white rounded-md text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
        <Link href='/Dashboard'>
        Get Started
        </Link>
        </motion.button>
      </div>

      {/* Dashboard Preview */}
      <motion.div 
        className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 text-[#111c3d] mr-2" />
          <span className="text-sm font-bold">Ycce-DashBoard</span>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-6">
            <h3 className="text-sm font-bold">Hi, Madam 👋</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-gray-600">Total Budget</h4>
              <p className="text-xl font-bold">₹650000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-gray-600">Total Spend</h4>
              <p className="text-2xl font-bold">₹240000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-gray-600">No. Of Sites</h4>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;