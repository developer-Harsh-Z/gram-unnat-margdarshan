
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ParentsGuideProps {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  image: string;
}

const ParentsGuideCard = ({
  title,
  description,
  category,
  content,
  image
}: ParentsGuideProps) => {
  return (
    <Card className="w-full card-hover overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{category}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">{description}</p>
            <Button className="bg-orange-500 hover:bg-orange-400 text-white">Read Guide</Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default ParentsGuideCard;
