import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (user) {
      navigate('/career-quiz');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">{t('appName')}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t('appDescription')}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {!user && (
                    <>
                      <div className="rounded-md shadow">
                        <Link
                          to="/register"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                        >
                          {t('getStarted')}
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link
                          to="/login"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10"
                        >
                          {t('signIn')}
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Career Quiz Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
              {t('careerQuiz')}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('discoverYourPath')}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {t('quizDescription')}
            </p>
          </div>

          <div className="mt-10">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {t('quizFeatures')}
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="h-6 w-6 text-green-500" />
                        </div>
                        <p className="ml-3 text-base text-gray-500">
                          {t('quizFeature1')}
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="h-6 w-6 text-green-500" />
                        </div>
                        <p className="ml-3 text-base text-gray-500">
                          {t('quizFeature2')}
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="h-6 w-6 text-green-500" />
                        </div>
                        <p className="ml-3 text-base text-gray-500">
                          {t('quizFeature3')}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Button
                      onClick={handleStartQuiz}
                      className="w-full py-6 text-lg font-medium"
                    >
                      {user ? t('startQuiz') : t('loginToStart')}
                    </Button>
                    {!user && (
                      <p className="mt-4 text-sm text-gray-500 text-center">
                        {t('loginRequired')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the home page content */}
    </div>
  );
};

export default HomePage; 