import fs from 'fs/promises';
import path from 'path';
import yaml from 'yaml';
import { LandingPageComponent } from '@/components/landing-page';

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

async function getNewsData(): Promise<News[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'news.yaml');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return yaml.parse(fileContents) as News[];
  } catch (error) {
    console.error('Error reading news data:', error);
    return [];
  }
}

export default async function Page() {
  const newsData = await getNewsData();
  return <LandingPageComponent initialNewsData={newsData} />;
}
