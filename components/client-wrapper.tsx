'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ClientLanguageSelectorProps {
  loadLanguageContent: (lang: string) => void;
}

export function ClientLanguageSelector({ loadLanguageContent }: ClientLanguageSelectorProps) {
  const searchParams = useSearchParams();
  const [currentLanguage, setCurrentLanguage] = useState('zh-TW');

  useEffect(() => {
    const langParam = searchParams?.get('lang');
    if (langParam) {
      loadLanguageContent(langParam);
      setCurrentLanguage(langParam);
    } else {
      const storedLang = localStorage.getItem('language');
      if (storedLang) {
        loadLanguageContent(storedLang);
        setCurrentLanguage(storedLang);
      }
    }
  }, [searchParams, loadLanguageContent]);

  return (
    <div className="flex space-x-2">
      <Button
        variant={currentLanguage === 'zh-TW' ? 'secondary' : 'ghost'}
        className="px-2 py-1 text-sm"
        onClick={() => loadLanguageContent('zh-TW')}
      >
        中文
      </Button>
      <Button
        variant={currentLanguage === 'en-US' ? 'secondary' : 'ghost'}
        className="px-2 py-1 text-sm"
        onClick={() => loadLanguageContent('en-US')}
      >
        English
      </Button>
    </div>
  );
}
