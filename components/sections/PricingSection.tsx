import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Check, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState, useCallback } from 'react';

type PricingSectionContent = {
  title: string;
  singlePurchase: {
    title: string;
    price: string;
    features: string[];
    cta: string;
  };
  coachLesson: {
    title: string;
    price: string;
    features: string[];
    cta: string;
  };
  groupLesson: {
    title: string;
    price: string;
    features: string[];
    cta: string;
  };
  moreDetails: string;
  detailedInfo: {
    title: string;
    groupLessons: {
      title: string;
      description: string;
      tableHeaders: string[];
      packages: {
        name: string;
        price: string;
        points: string;
        averagePrice: string;
      }[];
    };
    coachLessons: {
      title: string;
      tableHeaders: string[];
      packages: {
        name: string;
        price: string;
        averagePrice: string;
      }[];
    };
    paymentInfo: {
      title: string;
      accountName: string;
      accountNameValue: string;
      bank: string;
      bankValue: string;
      accountNumber: string;
      accountNumberValue: string;
      copyButton: string;
    };
    notes: {
      title: string;
      paymentMethod: string;
      confirmationInstruction: string;
      requiredInfo: string[];
      confirmation: string;
      provideInfo: string;
    };
  };
};

const PricingSection = ({ content }: { content: PricingSectionContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = useCallback(async (text: string) => {
    if (!text) {
      console.error('No text provided to copy');
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        console.log('Text copied using Clipboard API');
      } else {
        // Fallback to older method
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Styling to keep textarea off-screen and unobtrusive
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        // For iOS compatibility
        textArea.setSelectionRange(0, text.length);

        const successful = document.execCommand('copy');
        if (successful) {
          console.log('Text copied using execCommand');
        } else {
          throw new Error('execCommand failed');
        }

        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);

  return (
    <section id="pricing" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">{content.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-[#064423]/5 shadow-md hover:shadow-xl transition duration-300">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-center">
                {content.singlePurchase.title}
              </h3>
              <p className="text-4xl font-bold text-center mb-6">{content.singlePurchase.price}</p>
              <ul className="space-y-2 mb-6">
                {content.singlePurchase.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronDown className="text-green-600 mr-2" /> {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('https://lin.ee/9bs6DF0', '_blank')}
              >
                {content.singlePurchase.cta}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#064423]/10 shadow-md hover:shadow-xl transition duration-300 transform scale-105">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-center">{content.coachLesson.title}</h3>
              <p className="text-4xl font-bold text-center mb-6">{content.coachLesson.price}</p>
              <ul className="space-y-2 mb-6">
                {content.coachLesson.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronDown className="text-green-600 mr-2" /> {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setIsModalOpen(true)}
              >
                {content.coachLesson.cta}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#064423]/5 shadow-md hover:shadow-xl transition duration-300">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-center">{content.groupLesson.title}</h3>
              <p className="text-4xl font-bold text-center mb-6">{content.groupLesson.price}</p>
              <ul className="space-y-2 mb-6">
                {content.groupLesson.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronDown className="text-green-600 mr-2" /> {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setIsModalOpen(true)}
              >
                {content.groupLesson.cta}
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-12">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black border border-black hover:bg-gray-100">
                {content.moreDetails}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{content.detailedInfo.title}</DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto max-h-[70vh]">
                <h3 className="text-2xl font-bold mt-4 mb-2">
                  {content.detailedInfo.groupLessons.title}
                </h3>
                <p className="mb-2">{content.detailedInfo.groupLessons.description}</p>
                <table className="w-full border-collapse border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-green-100">
                      {content.detailedInfo.groupLessons.tableHeaders.map((header, index) => (
                        <th key={index} className="border border-gray-300 p-2">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.detailedInfo.groupLessons.packages.map((pkg, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">{pkg.name}</td>
                        <td className="border border-gray-300 p-2">{pkg.price}</td>
                        <td className="border border-gray-300 p-2">{pkg.points}</td>
                        <td className="border border-gray-300 p-2">{pkg.averagePrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 className="text-2xl font-bold mt-6 mb-2">
                  {content.detailedInfo.coachLessons.title}
                </h3>
                <table className="w-full border-collapse border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-green-100">
                      {content.detailedInfo.coachLessons.tableHeaders.map((header, index) => (
                        <th key={index} className="border border-gray-300 p-2">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.detailedInfo.coachLessons.packages.map((pkg, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">{pkg.name}</td>
                        <td className="border border-gray-300 p-2">{pkg.price}</td>
                        <td className="border border-gray-300 p-2">{pkg.averagePrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="text-2xl font-bold mt-6 mb-2">
                  {content.detailedInfo.paymentInfo.title}
                </h3>

                <div className="p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="font-semibold">
                        {content.detailedInfo.paymentInfo.accountName}
                      </p>
                      <p className="text-gray-700">
                        {content.detailedInfo.paymentInfo.accountNameValue}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">{content.detailedInfo.paymentInfo.bank}</p>
                      <p className="text-gray-700">{content.detailedInfo.paymentInfo.bankValue}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">
                        {content.detailedInfo.paymentInfo.accountNumber}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-700">
                          {content.detailedInfo.paymentInfo.accountNumberValue}
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(content.detailedInfo.paymentInfo.accountNumberValue)
                          }
                          className="p-1 rounded-md hover:bg-green-100 transition-colors"
                          aria-label={content.detailedInfo.paymentInfo.copyButton}
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">{content.detailedInfo.notes.title}</h4>
                  <p>{content.detailedInfo.notes.paymentMethod}</p>
                  <p>
                    {content.detailedInfo.notes.confirmationInstruction}{' '}
                    <a
                      href="https://lin.ee/9bs6DF0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      Line
                    </a>{' '}
                    {content.detailedInfo.notes.provideInfo}
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    {content.detailedInfo.notes.requiredInfo.map((info, index) => (
                      <li key={index}>{info}</li>
                    ))}
                  </ul>
                  <p className="mt-2">{content.detailedInfo.notes.confirmation}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
