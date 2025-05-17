
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileForm from '@/components/ProfileForm';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-800 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If authenticated and loaded, show the profile page
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
