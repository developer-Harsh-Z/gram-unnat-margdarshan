
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileForm from '@/components/ProfileForm';

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Create Your Profile</h1>
          <div className="mb-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              Complete your profile to receive personalized recommendations for skills development, 
              career pathways, and opportunities based on your background and interests.
            </p>
          </div>
          <ProfileForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
