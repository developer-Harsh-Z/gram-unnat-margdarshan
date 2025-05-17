import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="NammaDisha Logo" className="h-12 w-auto" />
              <h2 className="text-xl font-bold">Namma<span className="text-orange-500">Disha</span></h2>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering rural youth with personalized career guidance, skill development opportunities, and mentorship.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">{t('myProfile')}</Link></li>
              <li><Link to="/opportunities" className="text-gray-400 hover:text-white transition-colors">{t('opportunities')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('resources')}</h3>
            <ul className="space-y-2">
              <li><Link to="/parents" className="text-gray-400 hover:text-white transition-colors">{t('parentsCorner')}</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('governmentSchemes')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('skillPrograms')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('scholarships')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@nammadisha.org</li>
              <li>Phone: +91-9876543210</li>
              <li>Address: Bengaluru, Karnataka, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 NammaDisha. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
