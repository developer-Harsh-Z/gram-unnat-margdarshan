import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            {t('welcome')}
            </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t('ctaDesc')}
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/signup">
                <Button className="w-full bg-blue-800 text-white hover:bg-blue-700">
                  {t('createProfile')}
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link to="/opportunities">
                <Button variant="outline" className="w-full border-blue-800 text-blue-800 hover:bg-blue-50">
                  {t('exploreOpportunities')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
