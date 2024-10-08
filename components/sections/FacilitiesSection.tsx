import React from 'react';
import { MapPin, Clock, Shield, Users, Dumbbell, Coffee } from 'lucide-react';

type FacilitiesSectionContent = {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
};

const FacilitiesSection = ({ content }: { content: FacilitiesSectionContent }) => {
  return (
    <section id="facilities" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-green-800">{content.title}</h2>
        <p className="text-lg leading-relaxed text-gray-700 mb-6 text-center">
          {content.description}
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {content.features.map((feature, index) => {
            const Icon = [MapPin, Clock, Shield, Users, Dumbbell, Coffee][index % 6];
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex items-start">
                <Icon className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-green-700">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
