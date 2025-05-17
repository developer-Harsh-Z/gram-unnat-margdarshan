import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Anitha K",
      location: "Raichur",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      quote: "NammaDisha helped me find a vocational training program in healthcare that I didn't know existed. Now I work at a primary health center near my village.",
      role: "Healthcare Worker"
    },
    {
      name: "Prakash M",
      location: "Bijapur",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      quote: "I was able to connect with a government apprenticeship program through NammaDisha that taught me solar panel installation. This skill is now helping me earn a stable income.",
      role: "Solar Technician"
    },
    {
      name: "Lakshmi R",
      location: "Belgaum",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      quote: "The platform guided me to a scholarship for rural women in technology. I'm now learning computer skills at a training center and teaching others in my community.",
      role: "IT Trainee"
    }
  ];

  return (
    <div className="bg-gray-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from rural youth who have transformed their lives with the right opportunities and guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <blockquote className="text-gray-700 mb-4">"{testimonial.quote}"</blockquote>
                  <div className="mt-auto">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role} • {testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
