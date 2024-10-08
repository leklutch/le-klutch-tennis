import React from "react";
import { Instagram, Facebook } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

interface HeroSectionProps {
  content: {
    title: string;
    subtitle: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/cover.jpg")`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <AnimatedSection className="relative z-10 text-center text-white p-8 rounded-lg">
        <h2 className="text-5xl font-bold mb-4">{content.title}</h2>
        <p className="text-2xl mb-8">{content.subtitle}</p>
        <div className="flex justify-center">
          <div className="flex space-x-4">
            <a
              href="https://lin.ee/9bs6DF0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
                className="hover:text-green-300 transition duration-300"
              >
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/leklutchtennisclub/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                size={24}
                className="hover:text-green-300 transition duration-300"
              />
            </a>
            <a
              href="https://www.facebook.com/leklutchtennisclub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook
                size={24}
                className="hover:text-green-300 transition duration-300"
              />
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default HeroSection;
