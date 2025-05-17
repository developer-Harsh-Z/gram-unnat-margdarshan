
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-pattern bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Discover Your Path</span> to Success
            </h1>
            <p className="text-lg mb-8 text-gray-600 max-w-lg">
              Connecting rural youth with personalized career guidance, skill development opportunities, and mentorship tailored to your background and aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/profile">
                <Button className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg w-full sm:w-auto">Get Started</Button>
              </Link>
              <Link to="/opportunities">
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-6 rounded-md text-lg w-full sm:w-auto">Explore Opportunities</Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1623043453741-9236aea45a7a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Rural youth with aspirations" 
              className="rounded-xl shadow-lg max-w-full h-auto max-h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
