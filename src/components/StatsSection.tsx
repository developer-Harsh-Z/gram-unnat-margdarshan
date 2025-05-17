
import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: "10,000+", label: "Rural Youth Reached" },
    { value: "500+", label: "Success Stories" },
    { value: "200+", label: "Partner Organizations" },
    { value: "50+", label: "Districts Covered" }
  ];

  return (
    <div className="bg-blue-800 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
