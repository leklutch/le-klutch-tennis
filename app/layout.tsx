import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Head from 'next/head';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '可奇室內網球俱樂部 | LE KLUTCH', // 更新標題包含目標關鍵字
  description:
    'LE KLUTCH 提供優質的室內網球設施與專業教練，讓您在舒適的環境中提升球技。立即預約，體驗可奇網球的魅力！', // 更新描述包含關鍵字
  openGraph: {
    title: '可奇室內網球俱樂部 | LE KLUTCH',
    description:
      'LE KLUTCH 提供優質的室內網球設施與專業教練，讓您在舒適的環境中提升球技。立即預約，體驗可奇網球的魅力！',
    url: 'https://yourwebsite.com', // 替換為您的網站 URL
    siteName: 'LE KLUTCH',
    images: [
      {
        url: 'https://yourwebsite.com/images/og-image.jpg', // 替換為您的 OG 圖片 URL
        width: 800,
        height: 600,
        alt: 'LE KLUTCH 網球俱樂部',
      },
    ],
    locale: 'zh-TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '可奇室內網球俱樂部 | LE KLUTCH',
    description:
      'LE KLUTCH 提供優質的室內網球設施與專業教練，讓您在舒適的環境中提升球技。立即預約，體驗可奇網球的魅力！',
    images: ['https://yourwebsite.com/images/twitter-image.jpg'], // 替換為您的 Twitter 圖片 URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SportsClub',
              name: 'LE KLUTCH',
              description:
                'LE KLUTCH 提供優質的室內網球設施與專業教練，讓您在舒適的環境中提升球技。',
              url: 'https://yourwebsite.com', // 替換為您的網站 URL
              address: {
                '@type': 'PostalAddress',
                streetAddress: '台北市內湖區舊宗路二段181巷2號2F',
                addressLocality: '台北市',
                addressRegion: '內湖區',
                postalCode: '114', // 替換為實際郵遞區號
                addressCountry: 'TW',
              },
              telephone: '02-2797-5889',
              openingHours: 'Mo-Su 08:00-20:00',
              image: 'https://yourwebsite.com/images/logo.png', // 替換為您的 Logo 圖片 URL
              sameAs: [
                'https://www.facebook.com/yourpage', // 替換為您的 Facebook 頁面
                'https://www.instagram.com/yourprofile', // 替換為您的 Instagram 頁面
              ],
            }),
          }}
        />

        <link rel="alternate" href="https://yourwebsite.com" hrefLang="zh-TW" />
        <link rel="alternate" href="https://yourwebsite.com/en" hrefLang="en-US" />
        <link rel="alternate" href="https://yourwebsite.com" hrefLang="x-default" />
        <link rel="canonical" href="https://yourwebsite.com" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
