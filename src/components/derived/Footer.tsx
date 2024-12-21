import React from 'react';

const Footer = () => {
  return (
    <div>
        <footer className="bg-[#111c3d] text-white p-5">
      <div className=" mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold flex items-center space-x-1">
              <span>YCCE</span>
              <span className="text-red-500">⚡</span>
              <span>Production</span>
            </h2>
        
       
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-gray-800">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-800">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-800">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-800">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-800">
                <i className="fab fa-x-twitter"></i>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold text-white">Solutions</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-800">Lead Management</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Project Management</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Vendor Management</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Task Management</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold ext-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-800">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Pricing</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Blogs</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Help Center</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Downloads*/}
          <div className="text-white mt-4 lg:mt-0">
            <a href="#" className="hover:text-gray-800">Privacy Policy</a> |{' '}
            <a href="#" className="hover:text-gray-800">Terms of Service</a>
          </div>
        </div>
    </footer>
       <p className="text-center bg-white  text-sm mt-6 lg:mt-0">
       © 2025 Ycce Pvt. Ltd.
     </p>

    </div>
    
  );
};

export default Footer;
