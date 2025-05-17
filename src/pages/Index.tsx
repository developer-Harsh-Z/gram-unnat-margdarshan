import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CallToAction from '@/components/CallToAction';
import ChatBot from '@/components/ChatBot';
import ParentsCornerHighlight from '@/components/ParentsCornerHighlight';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <ParentsCornerHighlight />
        <CallToAction />
        <ChatBot />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
