
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SuccessStoryCard from '@/components/SuccessStoryCard';
import { successStoriesData } from '@/data/mockData';

const SuccessStoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Success Stories</h1>
          <div className="mb-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              Read inspiring stories of rural youth who have transformed their lives through 
              skills development and career opportunities.
            </p>
          </div>
          
          <div className="space-y-8">
            {successStoriesData.map((story) => (
              <SuccessStoryCard key={story.id} {...story} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;
