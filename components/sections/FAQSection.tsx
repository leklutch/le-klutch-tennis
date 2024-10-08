import React from 'react';
import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

// Accordion component
function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

function AccordionItem({ trigger, children }: { trigger: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="flex justify-between w-full py-4 px-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-green-800">{trigger}</span>
        <ChevronDown
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''} text-green-600`}
        />
      </button>
      {isOpen && <div className="p-6">{children}</div>}
    </div>
  );
}

interface FAQSectionProps {
  content: {
    title: string;
    questions: {
      question: string;
      answer: string[];
    }[];
  };
}
const FAQSection = ({ content }: FAQSectionProps) => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-green-800">{content.title}</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion>
            {content.questions.map((item, index) => (
              <AccordionItem key={index} trigger={item.question}>
                <ul className="list-disc pl-8 space-y-4 text-lg">
                  {item.answer.map((answer, answerIndex) => (
                    <li key={answerIndex}>{answer}</li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
