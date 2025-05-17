
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-purple-700 text-white section-padding">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
          Create your profile today and discover personalized opportunities that match your background, interests, and career goals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/profile">
            <Button className="bg-white text-blue-800 hover:bg-gray-100 text-lg px-8 py-6 w-full sm:w-auto">Create Your Profile</Button>
          </Link>
          <Link to="/opportunities">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 w-full sm:w-auto">Explore Opportunities</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
