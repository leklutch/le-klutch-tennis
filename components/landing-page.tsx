"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Facebook,
  Instagram,
  Clock,
  MapPin,
  Phone,
  ChevronDown,
  Users,
  Award,
  Activity,
  Brain,
  Check,
  Copy,
  Shield,
  Dumbbell,
  Coffee,
} from "lucide-react";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import { Suspense } from "react";
import { ClientLanguageSelector } from "./client-wrapper";

// import { useSearchParams } from 'next/navigation';

import { Menu } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
export const SelectTrigger = SelectPrimitive.Trigger;
export const SelectContent = SelectPrimitive.Content;
export const SelectItem = SelectPrimitive.Item;

import zhTW from "@/locales/zh-TW.json";
import enUS from "@/locales/en-US.json";

// 定義支持的語言列表
const SUPPORTED_LANGUAGES = ["zh-TW", "en-US"];

// 初始化字體
const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });
const notoSerifTC = Noto_Serif_TC({ subsets: ["latin"], weight: "700" });

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
}
// Animated section component
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-1000 ${
        isIntersecting
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Accordion component
function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

function AccordionItem({
  trigger,
  children,
}: {
  trigger: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="flex justify-between w-full py-4 px-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-green-800">{trigger}</span>
        <ChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-green-600`}
        />
      </button>
      {isOpen && <div className="p-6">{children}</div>}
    </div>
  );
}

export function LandingPageComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("zh-TW");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // 初始化時從 localStorage 或其他地方獲取當前語言
    const savedLanguage = localStorage.getItem("language") || "zh-TW";
    setCurrentLanguage(savedLanguage);
    loadLanguageContent(savedLanguage);
  }, []);

  const handleLanguageChange = (value: string) => {
    setCurrentLanguage(value);
    loadLanguageContent(value);
    localStorage.setItem("language", value);
  };

  const [content, setContent] = useState(zhTW);
  const loadLanguageContent = useCallback((lang: string) => {
    try {
      if (!SUPPORTED_LANGUAGES.includes(lang)) {
        throw new Error("Unsupported language");
      }
      const newContent = lang === "zh-TW" ? zhTW : enUS;
      setContent(newContent);
      localStorage.setItem("language", lang);

      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.pushState({}, "", url);
    } catch (error) {
      console.error(`Failed to load language: ${lang}`, error);
      setContent(zhTW);
      localStorage.setItem("language", "zh-TW");

      // Update URL to default language
      const url = new URL(window.location.href);
      url.searchParams.set("lang", "zh-TW");
      window.history.pushState({}, "", url);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
      document.body.removeChild(textArea);
    }
  }, []);

  // Extract image URLs into variables
  const heroBackgroundUrl =
    "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const featureIcons = [Users, Award, Activity, Brain];

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className={`min-h-screen bg-[#064423]/10 ${notoSansTC.className}`}>
      <header className="bg-[#064423] text-white p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/le-klutch-logo.png"
              alt="LE KLUTCH 可奇室內網球俱樂部標誌，專業室內網球設施"
              width={48}
              height={48}
            />
            <h1 className="text-2xl font-bold font-serif">
              {content.header.title}
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {Object.entries(content.header.nav).map(([key, value]) => (
              <a
                key={key}
                href={`#${key}`}
                className="hover:text-green-300 transition duration-300"
              >
                {value}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <Select
                value={currentLanguage}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue>
                    {currentLanguage === "zh-TW" ? "中文" : "EN"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh-TW">中文</SelectItem>
                  <SelectItem value="en-US">EN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="hidden md:block">
              <ClientLanguageSelector
                loadLanguageContent={loadLanguageContent}
              />
            </div>
            <Button
              className="border border-current hover:bg-green-100 transition-colors"
              onClick={() => window.open("https://lin.ee/9bs6DF0", "_blank")}
            >
              {content.header.cta}
            </Button>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {Object.entries(content.header.nav).map(([key, value]) => (
              <a
                key={key}
                href={`#${key}`}
                className="block py-2 hover:text-green-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {value}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="pt-20">
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url("/images/cover.jpg")`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <AnimatedSection className="relative z-10 text-center text-white p-8 rounded-lg">
            <h2 className="text-5xl font-bold mb-4">{content.hero.title}</h2>
            <p className="text-2xl mb-8">{content.hero.subtitle}</p>
            <div className="flex justify-center">
              {" "}
              {/* Add this container */}
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

        <AnimatedSection>
          <section
            id="about"
            className="py-20 bg-gradient-to-br from-white to-green-50 scroll-mt-20"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold mb-16 text-center text-green-800">
                {content.about.title}
              </h2>
              <div className="space-y-12">
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">
                    {content.about.subtitle}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {content.about.description}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {content.about.features.map((feature, index) => {
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
                      {content.about.promotion.title}
                    </h3>
                    <p className="text-2xl mb-2 text-center">
                      {content.about.promotion.price}
                    </p>
                    <p className="text-lg mb-6 font-semibold text-center">
                      {content.about.promotion.description}
                    </p>
                    <Button
                      className="w-full bg-white text-green-600 hover:bg-green-50 transition-colors text-lg py-3 font-bold"
                      onClick={() =>
                        window.open("https://lin.ee/9bs6DF0", "_blank")
                      }
                    >
                      {content.about.promotion.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="facilities" className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-green-800">
                {content.facilities.title}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-6 text-center">
                {content.facilities.description}
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {content.facilities.features.map((feature, index) => {
                  const Icon = [MapPin, Clock, Shield, Users, Dumbbell, Coffee][
                    index % 6
                  ];
                  return (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-lg flex items-start"
                    >
                      <Icon className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-green-700">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section id="pricing" className="py-20 bg-white scroll-mt-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                {content.pricing.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-[#064423]/5 shadow-md hover:shadow-xl transition duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      {content.pricing.singlePurchase.title}
                    </h3>
                    <p className="text-4xl font-bold text-center mb-6">
                      {content.pricing.singlePurchase.price}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {content.pricing.singlePurchase.features.map(
                        (feature, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronDown className="text-green-600 mr-2" />{" "}
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() =>
                        window.open("https://lin.ee/9bs6DF0", "_blank")
                      }
                    >
                      {content.pricing.singlePurchase.cta}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#064423]/10 shadow-md hover:shadow-xl transition duration-300 transform scale-105">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      {content.pricing.coachLesson.title}
                    </h3>
                    <p className="text-4xl font-bold text-center mb-6">
                      {content.pricing.coachLesson.price}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {content.pricing.coachLesson.features.map(
                        (feature, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronDown className="text-green-600 mr-2" />{" "}
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {content.pricing.coachLesson.cta}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#064423]/5 shadow-md hover:shadow-xl transition duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      {content.pricing.groupLesson.title}
                    </h3>
                    <p className="text-4xl font-bold text-center mb-6">
                      {content.pricing.groupLesson.price}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {content.pricing.groupLesson.features.map(
                        (feature, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronDown className="text-green-600 mr-2" />{" "}
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {content.pricing.groupLesson.cta}
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center mt-12">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-black border border-black hover:bg-gray-100">
                      {content.pricing.moreDetails}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>
                        {content.pricing.detailedInfo.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[70vh]">
                      <h3 className="text-2xl font-bold mt-4 mb-2">
                        {content.pricing.detailedInfo.groupLessons.title}
                      </h3>
                      <p className="mb-2">
                        {content.pricing.detailedInfo.groupLessons.description}
                      </p>
                      <table className="w-full border-collapse border border-gray-300 mb-6">
                        <thead>
                          <tr className="bg-green-100">
                            {content.pricing.detailedInfo.groupLessons.tableHeaders.map(
                              (header, index) => (
                                <th
                                  key={index}
                                  className="border border-gray-300 p-2"
                                >
                                  {header}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {content.pricing.detailedInfo.groupLessons.packages.map(
                            (pkg, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                  {pkg.name}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {pkg.price}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {pkg.points}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {pkg.averagePrice}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>

                      <h3 className="text-2xl font-bold mt-6 mb-2">
                        {content.pricing.detailedInfo.coachLessons.title}
                      </h3>
                      <table className="w-full border-collapse border border-gray-300 mb-6">
                        <thead>
                          <tr className="bg-green-100">
                            {content.pricing.detailedInfo.coachLessons.tableHeaders.map(
                              (header, index) => (
                                <th
                                  key={index}
                                  className="border border-gray-300 p-2"
                                >
                                  {header}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {content.pricing.detailedInfo.coachLessons.packages.map(
                            (pkg, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                  {pkg.name}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {pkg.price}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {pkg.averagePrice}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <h3 className="text-2xl font-bold mt-6 mb-2">
                        {content.pricing.detailedInfo.paymentInfo.title}
                      </h3>

                      <div className="p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <p className="font-semibold">
                              {
                                content.pricing.detailedInfo.paymentInfo
                                  .accountName
                              }
                            </p>
                            <p className="text-gray-700">
                              {
                                content.pricing.detailedInfo.paymentInfo
                                  .accountNameValue
                              }
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="font-semibold">
                              {content.pricing.detailedInfo.paymentInfo.bank}
                            </p>
                            <p className="text-gray-700">
                              {
                                content.pricing.detailedInfo.paymentInfo
                                  .bankValue
                              }
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="font-semibold">
                              {
                                content.pricing.detailedInfo.paymentInfo
                                  .accountNumber
                              }
                            </p>
                            <div className="flex items-center space-x-2">
                              <p className="text-gray-700">
                                {
                                  content.pricing.detailedInfo.paymentInfo
                                    .accountNumberValue
                                }
                              </p>
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    content.pricing.detailedInfo.paymentInfo
                                      .accountNumberValue
                                  )
                                }
                                className="p-1 rounded-md hover:bg-green-100 transition-colors"
                                aria-label={
                                  content.pricing.detailedInfo.paymentInfo
                                    .copyButton
                                }
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
                        <h4 className="font-bold mb-2">
                          {content.pricing.detailedInfo.notes.title}
                        </h4>
                        <p>
                          {content.pricing.detailedInfo.notes.paymentMethod}
                        </p>
                        <p>
                          {
                            content.pricing.detailedInfo.notes
                              .confirmationInstruction
                          }{" "}
                          <a
                            href="https://lin.ee/9bs6DF0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline"
                          >
                            Line
                          </a>{" "}
                          {content.pricing.detailedInfo.notes.provideInfo}
                        </p>
                        <ul className="list-disc list-inside ml-4">
                          {content.pricing.detailedInfo.notes.requiredInfo.map(
                            (info, index) => (
                              <li key={index}>{info}</li>
                            )
                          )}
                        </ul>
                        <p className="mt-2">
                          {content.pricing.detailedInfo.notes.confirmation}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section id="faq" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-green-800">
                {content.faq.title}
              </h2>
              <div className="max-w-3xl mx-auto">
                <Accordion>
                  {content.faq.questions.map((item, index) => (
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
        </AnimatedSection>
        <AnimatedSection>
          <section
            id="contact"
            className="py-20 bg-[#064423] text-white scroll-mt-20"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                {content.contact.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {content.contact.subtitle}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <MapPin size={24} />
                      <p>{content.contact.address}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone size={24} />
                      <p>{content.contact.phone}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Clock size={24} />
                      <p>{content.contact.hours}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <a
                      href="https://lin.ee/9bs6DF0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="currentColor"
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
                <div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14455.573594174992!2d121.574743!3d25.071602!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac797d43166f%3A0xe74037b25677c94b!2z5aSn5ryi56eR5oqA57i96YOo56ys5LiA5pyf!5e0!3m2!1szh-TW!2stw!4v1728294876348!5m2!1szh-TW!2stw"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      <footer className="bg-[#064423] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{content.footer.copyright}</p>
          <p className="mt-2">{content.footer.credits}</p>
        </div>
      </footer>
    </div>
  );
}
