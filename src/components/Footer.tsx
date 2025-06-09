
import React from 'react';
import { Link } from 'react-router-dom';
import { BeakerIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BeakerIcon className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">VIVARILY</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              AI-powered oil optimization platform that predicts lubricant performance 
              using advanced machine learning models. Eliminate expensive physical testing 
              with instant, accurate predictions.
            </p>
            <p className="text-sm text-gray-400">
              Developed at IIT Kharagpur
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/platform" className="hover:text-white transition-colors">Oil Prediction</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 VIVARILY. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            contact@vivarily.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
