
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface OpportunityProps {
  id: string;
  title: string;
  organization: string;
  location: string;
  category: string;
  description: string;
  deadline: string;
  tags: string[];
}

const OpportunityCard = ({
  title,
  organization,
  location,
  category,
  description,
  deadline,
  tags
}: OpportunityProps) => {
  return (
    <Card className="w-full card-hover overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-sm mt-1">{organization} • {location}</CardDescription>
          </div>
          <Badge 
            className={`
              ${category === 'Training' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : ''}
              ${category === 'Job' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
              ${category === 'Scholarship' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : ''}
              ${category === 'Apprenticeship' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' : ''}
            `}
          >
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-gray-600">
        <p className="mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100">{tag}</Badge>
          ))}
        </div>
        <p className="text-xs font-medium mt-3 text-red-600">Deadline: {deadline}</p>
      </CardContent>
      <CardFooter className="pt-3 flex justify-between">
        <Button variant="outline" className="text-sm">Learn More</Button>
        <Button className="bg-blue-800 hover:bg-blue-700 text-white text-sm">Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
