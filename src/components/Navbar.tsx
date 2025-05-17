import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleCareerQuizClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      navigate('/login');
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="NammaDisha Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-blue-800 hidden sm:inline">{t('appName')}</span>
            </Link>
          </div>
          
          {!isMobile ? (
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium">{t('home')}</Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium">{t('myProfile')}</Link>
                <Link to="/opportunities" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium">{t('opportunities')}</Link>
                <Link to="/parents" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium">{t('parentsCorner')}</Link>
                <Link 
                  to="/career-quiz" 
                  onClick={handleCareerQuizClick}
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium"
                >
                  {t('careerQuiz')}
                </Link>
                <Link
                  to="/career-guidance"
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium"
                >
                  {t('careerGuidance')}
                </Link>
                <Link
                  to="/career-chat"
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md font-medium"
                >
                  {t('careerChat')}
                </Link>
                
                {/* Language Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => changeLanguage('en')}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('kn')}>
                      ಕನ್ನಡ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {!loading && user ? (
                  <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50" onClick={handleLogout}>{t('logout')}</Button>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">{t('login')}</Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="bg-blue-800 text-white hover:bg-blue-700">{t('signup')}</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="md:hidden flex items-center">
              <Button 
                variant="ghost" 
                className="text-gray-700" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">{t('home')}</Link>
            <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">{t('myProfile')}</Link>
            <Link to="/opportunities" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">{t('opportunities')}</Link>
            <Link to="/parents" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">{t('parentsCorner')}</Link>
            <Link 
              to="/career-quiz" 
              onClick={handleCareerQuizClick}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {t('careerQuiz')}
            </Link>
            <Link
              to="/career-guidance"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {t('careerGuidance')}
            </Link>
            <Link
              to="/career-chat"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              {t('careerChat')}
            </Link>
            
            {/* Language Switcher in Mobile Menu */}
            <div className="px-3 py-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => changeLanguage('en')}
              >
                English
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => changeLanguage('kn')}
              >
                ಕನ್ನಡ
              </Button>
            </div>

            {!loading && user ? (
              <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50 w-full text-left" onClick={handleLogout}>{t('logout')}</Button>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">{t('login')}</Link>
                <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-blue-800 hover:bg-blue-700 hover:text-white bg-blue-50 hover:bg-blue-800">{t('signup')}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
