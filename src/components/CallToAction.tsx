import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CallToAction = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-blue-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">{t('ctaTitle')}</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link to="/signup">
              <Button className="bg-white text-blue-800 hover:bg-blue-50">
                {t('createProfile')}
              </Button>
          </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
          <Link to="/opportunities">
              <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                {t('exploreOpportunities')}
              </Button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
