import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSwipeable } from "react-swipeable";
import { Loader2 } from "lucide-react";

interface News {
  title: {
    "zh-TW": string;
    "en-US": string;
  };
  description: {
    "zh-TW": string;
    "en-US": string;
  };
  link: string;
}

interface NewsSectionProps {
  content: {
    title: string;
    news: News[];
  };
  language: string;
}

interface GlobalWindow extends Window {
  instgrm?: {
    Embeds: {
      process: () => void;
    };
  };
}

const NewsSection: React.FC<NewsSectionProps> = ({ content, language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 檢查是否為移動設備
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const globalWindow = window as unknown as GlobalWindow;
      if (globalWindow.instgrm) {
        globalWindow.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // useEffect(() => {
  //   if ((window as GlobalWindow).instgrm) {
  //     (window as GlobalWindow).instgrm?.Embeds.process();
  //   }
  // }, [currentIndex]);

  // 保留這個 useEffect，它在語言變化時重置當前索引
  useEffect(() => {
    setCurrentIndex(0);
  }, [language]);

  // 使用 useCallback 來記憶這些函數，避免不必要的重新渲染
  const nextNews = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + (isMobile ? 1 : 3) >= content.news.length
        ? 0
        : prevIndex + (isMobile ? 1 : 3)
    );
  }, [content.news.length, isMobile]);

  const prevNews = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const totalItems = content.news.length;
      const itemsPerPage = isMobile ? 1 : 3;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (prevIndex === 0) {
        return (totalPages - 1) * itemsPerPage;
      }
      return Math.max(0, prevIndex - itemsPerPage);
    });
  }, [content.news.length, isMobile]);

  const handlers = useSwipeable({
    onSwipedLeft: nextNews,
    onSwipedRight: prevNews,
    trackMouse: true,
  });

  return (
    <section id="news" className="py-16 bg-green-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{content.title}</h2>
        <div className="flex justify-center mt-4 pb-4">
          {Array.from({
            length: Math.ceil(content.news.length / (isMobile ? 1 : 3)),
          }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index ===
                (currentIndex / (isMobile ? 1 : 3)) %
                  Math.ceil(content.news.length / (isMobile ? 1 : 3))
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index * (isMobile ? 1 : 3))}
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          {!isMobile && (
            <Button onClick={prevNews} variant="ghost" className="mr-4 z-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          <div
            className={`overflow-hidden w-full ${
              isMobile ? "max-w-full" : "max-w-6xl"
            }`}
            {...handlers}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / (isMobile ? 1 : 3)
                }%)`,
              }}
            >
              {content.news.map((news, index) => (
                <div
                  key={`${language}-${index}`} // 修改 key 以包含語言
                  className={`${
                    isMobile ? "w-full" : "w-1/3"
                  } flex-shrink-0 flex-grow-0 ${isMobile ? "px-0" : "px-2"}`}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 whitespace-pre-line">
                        {news.title[language as keyof typeof news.title]}
                      </h3>
                      <p className="text-gray-700 mb-4 whitespace-pre-line">
                        {
                          news.description[
                            language as keyof typeof news.description
                          ]
                        }
                      </p>

                      {/* check if link is instagram post if not using <a> tag to open in new tab */}
                      {news.link.includes("instagram.com") ? (
                        <div
                          className="relative"
                          style={{
                            minWidth: "326px",
                            maxWidth: "540px",
                            height: "570px",
                          }}
                        >
                          <blockquote
                            className="instagram-media absolute inset-0"
                            data-instgrm-preserve-position
                            data-instgrm-permalink={news.link}
                            data-instgrm-version="14"
                            style={{
                              background: "#FFF",
                              border: "0",
                              width: "100%",
                              height: "100%",
                              overflow: "hidden",
                            }}
                          >
                            <div className="h-full flex items-center justify-center">
                              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            </div>
                          </blockquote>
                        </div>
                      ) : (
                        <a
                          href={news.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <Button onClick={nextNews} variant="ghost" className="ml-4 z-10">
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(NewsSection); // 使用 React.memo 來優化性能
