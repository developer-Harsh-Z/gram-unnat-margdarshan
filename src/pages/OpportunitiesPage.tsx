
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OpportunityCard from '@/components/OpportunityCard';
import { opportunitiesData } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const OpportunitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOpportunities = opportunitiesData.filter(opportunity => 
    opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const trainingOpportunities = filteredOpportunities.filter(op => op.category === 'Training');
  const jobOpportunities = filteredOpportunities.filter(op => op.category === 'Job');
  const scholarshipOpportunities = filteredOpportunities.filter(op => op.category === 'Scholarship');
  const apprenticeshipOpportunities = filteredOpportunities.filter(op => op.category === 'Apprenticeship');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Explore Opportunities</h1>
          <div className="mb-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              Discover skills development programs, jobs, scholarships, and apprenticeships 
              available in your region that match your interests and background.
            </p>
          </div>
          
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search opportunities by keyword, skill, or location..."
                className="pr-10 input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
              <TabsTrigger value="apprenticeships">Apprenticeships</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} {...opportunity} />
                ))}
              </div>
              {filteredOpportunities.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600 mb-4">No opportunities match your search.</p>
                  <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="training">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} {...opportunity} />
                ))}
              </div>
              {trainingOpportunities.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600">No training opportunities match your search.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="jobs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} {...opportunity} />
                ))}
              </div>
              {jobOpportunities.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600">No job opportunities match your search.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="scholarships">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarshipOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} {...opportunity} />
                ))}
              </div>
              {scholarshipOpportunities.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600">No scholarship opportunities match your search.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="apprenticeships">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apprenticeshipOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} {...opportunity} />
                ))}
              </div>
              {apprenticeshipOpportunities.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600">No apprenticeship opportunities match your search.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OpportunitiesPage;
