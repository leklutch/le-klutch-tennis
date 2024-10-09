import React from "react";
import { Button } from "@/components/ui/button";
import { Users, Award, Activity, Brain } from "lucide-react";

type AboutSectionContent = {
  title: string;
  subtitle: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
  promotion: {
    title: string;
    price: string;
    description: string;
    cta: string;
  };
};

const featureIcons = [Users, Award, Activity, Brain];

const AboutSection = ({ content }: { content: AboutSectionContent }) => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-white to-green-20 scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-16 text-center text-green-800">
          {content.title}
        </h2>
        <div className="space-y-12">
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-green-700">
              {content.subtitle}
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {content.description}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {content.features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <div
                  key={feature.title}
                  className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  <Icon className="w-8 h-8 text-green-600 mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-green-700">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-green-600 p-8 rounded-xl shadow-lg text-white transform hover:scale-105 transition-all duration-300">
              <h3 className="text-3xl font-bold mb-4 text-center">
                {content.promotion.title}
              </h3>
              <p className="text-2xl mb-2 text-center">
                {content.promotion.price}
              </p>
              <p className="text-lg mb-6 font-semibold text-center">
                {content.promotion.description}
              </p>
              <Button
                className="w-full bg-white text-green-600 hover:bg-green-50 transition-colors text-lg py-3 font-bold"
                onClick={() => window.open("https://lin.ee/9bs6DF0", "_blank")}
              >
                {content.promotion.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
