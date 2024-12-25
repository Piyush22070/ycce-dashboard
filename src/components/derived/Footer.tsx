import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#111c3d] text-white pt-10 pb-4">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
              <span>YCCE</span>
              <span className="text-red-500">⚡</span>
              <span>Production</span>
              </h2>
              <p className="text-gray-400 mt-4">
                YCCE Production is a new-age construction management platform for developers,
                contractors, and design studios. It enables complete workflow
                automation for all professionals involved in construction and
                interior projects management.
              </p>
              <div className="flex space-x-4 mt-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition transform hover:scale-110"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition transform hover:scale-110"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition transform hover:scale-110"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition transform hover:scale-110"
                >
                  <FaYoutube size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition transform hover:scale-110"
                >
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-lg font-semibold text-white">Solutions</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition transform hover:translate-x-2"
                  >
                    Lead Management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition transform hover:translate-x-2"
                  >
                    Project Management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition transform hover:translate-x-2"
                  >
                    Vendor Management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition transform hover:translate-x-2"
                  >
                    Task Management
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition transform hover:translate-x-2"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition transform hover:translate-x-2"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition transform hover:translate-x-2"
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-red-500 transition transform hover:translate-x-2"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col lg:flex-row justify-around items-center mt-8 text-gray-400 text-sm">
            <div>
              <a href="#" className="hover:text-red-500 transition">
                Privacy Policy
              </a>{' '}
              |{' '}
              <a href="#" className="hover:text-red-500 transition">
                Terms of Service
              </a>
            </div>
            <p className="mt-4 lg:mt-0">© 2024 Vonken Brandtech Pvt. Ltd.</p>
          </div>
        </div>
      </footer>
      <p className="text-center bg-white  text-xs mt-6 lg:mt-0">
       © 2025 Ycce Pvt. Ltd.
     </p>
    </div>
  );
};

export default Footer;