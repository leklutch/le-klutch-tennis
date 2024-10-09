import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:
    "可奇室內網球俱樂部 | LE KLUTCH 台北網球教學 台北室內網球 網球場 室內網球",
  description:
    "LE KLUTCH 可奇室內網球俱樂部提供頂級室內網球場地、專業網球教學、網球課程與訓練。位於台北內湖，是您提升網球技巧的最佳選擇。立即預約，體驗可奇網球的魅力！",
  openGraph: {
    title:
      "可奇室內網球俱樂部 | LE KLUTCH 台北網球教學 台北室內網球 網球場 室內網球",
    description:
      "LE KLUTCH 可奇室內網球俱樂部提供頂級室內網球場地、專業網球教學、網球課程與訓練。位於台北內湖，是您提升網球技巧的最佳選擇。立即預約，體驗可奇網球的魅力！",
    url: "https://leklutchtennisclub.com", // 替換為您的網站 URL
    siteName: "LE KLUTCH",
    images: [
      {
        url: "https://leklutchtennisclub.com/images/le-klutch-logo.png", // 替換為您的 OG 圖片 URL
        width: 800,
        height: 600,
        alt: "LE KLUTCH 可奇室內網球俱樂部",
      },
    ],
    locale: "zh-TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "可奇室內網球俱樂部 | LE KLUTCH 台北網球教學 台北室內網球 網球場 室內網球",
    description:
      "LE KLUTCH 可奇室內網球俱樂部提供頂級室內網球場地、專業網球教學、網球課程與訓練。位於台北內湖，是您提升網球技巧的最佳選擇。立即預約，體驗可奇網球的魅力！",
    images: ["https://leklutchtennisclub.com/images/le-klutch-logo.png"], // 替換為您的 Twitter 圖片 URL
  },
  alternates: {
    languages: {
      "zh-TW": "/zh-TW",
      "en-US": "/en-US",
    },
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
              "@context": "https://schema.org",
              "@type": "SportsClub",
              name: "LE KLUTCH | 可奇室內網球俱樂部",
              description:
                "LE KLUTCH 可奇室內網球俱樂部提供頂級室內網球場地、專業網球教學、網球課程與訓練。位於台北內湖，擁有優質的室內網球設施與專業教練，是您提升網球技巧的最佳選擇。",
              url: "https://leklutchtennisclub.com/images/le-klutch-logo.png", // 替換為您的網站 URL
              address: {
                "@type": "PostalAddress",
                streetAddress: "台北市內湖區舊宗路二段181巷2號2F",
                addressLocality: "台北市",
                addressRegion: "內湖區",
                postalCode: "114", // 替換為實際郵遞區號
                addressCountry: "TW",
              },
              telephone: "02-2797-5889",
              openingHours: "Mo-Su 08:00-20:00",
              image: "https://leklutchtennisclub.com/images/le-klutch-logo.png", // 替換為您的 Logo 圖片 URL
              sameAs: [
                "https://www.instagram.com/leklutchtennisclub/", // 替換為您的 Facebook 頁面
                "https://www.facebook.com/leklutchtennisclub", // 替換為您的 Instagram 頁面
                "https://lin.ee/9bs6DF0", // 替換為您的 Line 官方帳號
              ],
            }),
          }}
        />

        <link
          rel="alternate"
          href="https://leklutchtennisclub.com?lang=zh-TW"
          hrefLang="zh-TW"
        />
        <link
          rel="alternate"
          href="https://leklutchtennisclub.com?lang=en-US"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://leklutchtennisclub.com"
          hrefLang="x-default"
        />
        <link rel="canonical" href="https://leklutchtennisclub.com" />
      </Head>
      <Script id="microsoft-clarity-script" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ofs3mltdqh");
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
