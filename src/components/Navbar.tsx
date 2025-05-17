
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-800">Rural<span className="text-orange-500">Path</span></span>
            </Link>
          </div>
          
          {!isMobile ? (
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium">Home</Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium">My Profile</Link>
                <Link to="/opportunities" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium">Opportunities</Link>
                <Link to="/stories" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium">Success Stories</Link>
                <Link to="/parents" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium">Parents Corner</Link>
                <Link to="/login">
                  <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-800 text-white hover:bg-blue-700">Sign Up</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="md:hidden flex items-center">
              <Button 
                variant="ghost" 
                className="text-gray-700" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">Home</Link>
            <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">My Profile</Link>
            <Link to="/opportunities" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">Opportunities</Link>
            <Link to="/stories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">Success Stories</Link>
            <Link to="/parents" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">Parents Corner</Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">Login</Link>
            <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-blue-800 hover:bg-blue-700 hover:text-white bg-blue-50 hover:bg-blue-800">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
