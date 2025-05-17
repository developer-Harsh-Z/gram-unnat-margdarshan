
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export interface SuccessStoryProps {
  id: string;
  name: string;
  location: string;
  image: string;
  story: string;
  occupation: string;
}

const SuccessStoryCard = ({
  name,
  location,
  image,
  story,
  occupation
}: SuccessStoryProps) => {
  return (
    <Card className="w-full card-hover overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-64 md:h-auto relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3">
          <CardHeader>
            <div className="mb-1 text-2xl font-bold">{name}</div>
            <div className="text-sm text-gray-600">{location} • {occupation}</div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{story}</p>
          </CardContent>
          <CardFooter className="text-sm text-blue-800 flex justify-end">
            <button className="underline hover:text-blue-600">Read full story</button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default SuccessStoryCard;
