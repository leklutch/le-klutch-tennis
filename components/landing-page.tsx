'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
} from 'lucide-react';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';
import { ClientLanguageSelector } from './client-wrapper';
import AnimatedSection from './AnimatedSection';
// import { useSearchParams } from 'next/navigation';

import { Menu } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
export const SelectTrigger = SelectPrimitive.Trigger;
export const SelectContent = SelectPrimitive.Content;
export const SelectItem = SelectPrimitive.Item;

import zhTW from '@/locales/zh-TW.json';
import enUS from '@/locales/en-US.json';

import AboutSection from './sections/AboutSection';
import FacilitiesSection from './sections/FacilitiesSection';
import PricingSection from './sections/PricingSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import HeroSection from './sections/HeroSection';
import NewsSection from './sections/NewsSection';
import { parse } from 'yaml';

// 定義支持的語言列表
const SUPPORTED_LANGUAGES = ['zh-TW', 'en-US'];

// 初始化字體
const notoSansTC = Noto_Sans_TC({ subsets: ['latin'] });
const notoSerifTC = Noto_Serif_TC({ subsets: ['latin'], weight: '700' });

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

// 更新 News 類型定義
type News = {
  title: {
    'zh-TW': string;
    'en-US': string;
  };
  description: {
    'zh-TW': string;
    'en-US': string;
  };
  link: string;
};

// Add this type definition
type ContentType = {
  header: {
    title: string;
    nav: {
      about: string;
      facilities: string;
      pricing: string;
      contact: string;
    };
    cta: string;
  };
  hero: object;
  news: {
    title: string;
    news: News[];
  };
  about: object;
  facilities: object;
  pricing: object;
  contact: object;
  footer: object;
};

export function LandingPageComponent({ initialNewsData }: { initialNewsData: News[] }) {
  const [isClient, setIsClient] = useState(false);

  const [currentLanguage, setCurrentLanguage] = useState('zh-TW');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // 初始化時從 localStorage 或其他地方獲取當前語言
    const savedLanguage = localStorage.getItem('language') || 'zh-TW';
    setCurrentLanguage(savedLanguage);
    loadLanguageContent(savedLanguage);
  }, []);

  const handleLanguageChange = (value: string) => {
    setCurrentLanguage(value);
    loadLanguageContent(value);
    localStorage.setItem('language', value);
  };

  const [content, setContent] = useState(zhTW);
  const loadLanguageContent = useCallback((lang: string) => {
    try {
      if (!SUPPORTED_LANGUAGES.includes(lang)) {
        throw new Error('Unsupported language');
      }
      const newContent = lang === 'zh-TW' ? zhTW : enUS;
      setContent(newContent);
      localStorage.setItem('language', lang);

      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.pushState({}, '', url);
    } catch (error) {
      console.error(`Failed to load language: ${lang}`, error);
      setContent(zhTW);
      localStorage.setItem('language', 'zh-TW');

      // Update URL to default language
      const url = new URL(window.location.href);
      url.searchParams.set('lang', 'zh-TW');
      window.history.pushState({}, '', url);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className={`min-h-screen bg-[#064423]/10 ${notoSansTC.className}`}>
      <header className="bg-[#064423] text-white p-4 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/le-klutch-logo.png"
              alt="LE KLUTCH 可奇室內網球俱樂部標誌，專業室內網球設施"
              width={48}
              height={48}
            />
            <h1 className="text-2xl font-bold font-serif">{content.header.title}</h1>
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
              <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue>{currentLanguage === 'zh-TW' ? '中文' : 'EN'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh-TW">中文</SelectItem>
                  <SelectItem value="en-US">EN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="hidden md:block">
              <ClientLanguageSelector loadLanguageContent={loadLanguageContent} />
            </div>
            <Button
              className="border border-current hover:bg-green-100 transition-colors"
              onClick={() => window.open('https://lin.ee/9bs6DF0', '_blank')}
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
        <HeroSection content={content.hero} />

        <AnimatedSection>
          <NewsSection
            key={currentLanguage} // Add this line
            content={{
              title: content.news.title,
              news: initialNewsData,
            }}
            language={currentLanguage}
          />
        </AnimatedSection>

        <AnimatedSection>
          <AboutSection content={content.about} />
        </AnimatedSection>

        <AnimatedSection>
          <FacilitiesSection content={content.facilities} />
        </AnimatedSection>
        {/* 
        <AnimatedSection>
          <InstagramVideosSection content={content.instagramVideos} />
        </AnimatedSection> */}

        <AnimatedSection>
          <PricingSection content={content.pricing} />
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection content={content.faq} />
        </AnimatedSection>

        <AnimatedSection>
          <ContactSection content={content.contact} />
        </AnimatedSection>
      </main>

      <footer className="bg-[#064423] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{(content.footer as { copyright: string }).copyright}</p>
          <p className="mt-2">{(content.footer as { credits: string }).credits}</p>
        </div>
      </footer>
    </div>
  );
}
