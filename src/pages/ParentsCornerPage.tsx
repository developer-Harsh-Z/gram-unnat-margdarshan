import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParentsGuideCard from '@/components/ParentsGuideCard';
import { parentsGuidesData, faqsData } from '@/data/mockData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ParentsCornerPage = () => {
  // Group FAQs by category
  const faqsByCategory: { [key: string]: typeof faqsData } = {};
  faqsData.forEach(faq => {
    if (!faqsByCategory[faq.category]) {
      faqsByCategory[faq.category] = [];
    }
    faqsByCategory[faq.category].push(faq);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Parents Corner</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Resources and guidance to help you support your child's career journey and aspirations.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Guides for Parents</h2>
            <div className="space-y-8">
              {parentsGuidesData.map((guide) => (
                <ParentsGuideCard key={guide.id} {...guide} />
              ))}
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Tabs defaultValue={Object.keys(faqsByCategory)[0]}>
              <TabsList className="w-full grid grid-cols-3 max-w-2xl mx-auto">
                {Object.keys(faqsByCategory).map((category) => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(faqsByCategory).map(([category, faqs]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <Accordion type="single" collapsible className="max-w-3xl mx-auto bg-white rounded-lg p-6 shadow-sm">
                    {faqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Need More Help?</h3>
            <p className="mb-6">
              Connect with our parent counselors for personalized guidance on supporting your child's career journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+919876543210" className="btn-primary px-6 py-3 rounded-md inline-block">
                Call: +91 9876543210
              </a>
              <a href="mailto:parents@nammadisha.org" className="btn-outline px-6 py-3 rounded-md inline-block">
                Email: parents@nammadisha.org
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ParentsCornerPage;
