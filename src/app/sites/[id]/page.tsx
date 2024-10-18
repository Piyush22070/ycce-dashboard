import React from 'react';
import {data} from '@/app/data'
import { Button } from '@/components/ui/button';
import { FaCalendar, FaPhone, FaFacebookMessenger } from 'react-icons/fa';


export default function ProfileCard({params}:any) {

    const result = data.find(item => item.id === params.id);


  return (
    <div className='p-12'>
        <div className=" mx-auto h-[700px] bg-white shadow-lg rounded-lg overflow-hidden flex">
      {/* Left - Profile Image */}
      <div className="w-2/3">
        <img
          src="/images/sample.jpg"
          alt="Profile"
          className="w-full h-full object-cover p-5"
        />
      </div>
      
      {/* Right - Information Section */}
      <div className="w-2/3 p-6">
        <h1 className="text-3xl font-bold text-gray-900">{result?.Location}</h1>
        <p className="text-sm text-gray-700 mb-4">{result?.status}</p>
        
        <p className="text-gray-600 mb-6">
          The fenching Work is perForming
        </p>
        
        {/* Personal Information */}
        <div className="">
          <p className="flex items-center mb-2">
            <span className="mr-2"><FaCalendar/></span> {result?.date}
          </p>
          <p className="flex items-center mb-2">
            <span className="mr-2"><FaPhone/></span> {result?.PhoneNo}
          </p>
          <p className="flex items-center mb-2">
            <span className="mr-2"><FaFacebookMessenger/></span> {result?.email}
          </p>
        </div>


      </div>
    </div>

    <a className='p-2' href='/'>
        <Button variant="secondary">Back</Button>
    </a>
        
    </div>
  );
}
