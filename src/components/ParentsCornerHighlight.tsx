
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const ParentsCornerHighlight = () => {
  return (
    <div className="bg-orange-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Parents Corner</h2>
            <p className="text-gray-700 mb-6">
              We understand that parents play a crucial role in their children's career decisions.
              Our Parents Corner provides resources, guidance, and information to help you support
              your child's aspirations and make informed decisions about their future.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Understand various career paths available today</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Learn how to support your child's career interests</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Get answers to common questions about education and careers</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Connect with counselors for personalized guidance</span>
              </li>
            </ul>
            <Link to="/parents">
              <Button className="bg-orange-500 hover:bg-orange-400 text-white">Visit Parents Corner</Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Parent and child discussing future" 
              className="rounded-xl shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsCornerHighlight;
