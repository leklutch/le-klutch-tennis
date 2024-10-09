import React, { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Add this utility function above your component
function useCombinedRefs<T>(...refs: React.Ref<T>[]) {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        (ref as React.MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

const NewsSection: React.FC<NewsSectionProps> = ({ content, language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        nextNews();
      } else {
        prevNews();
      }
    }

    touchStartX.current = null;
  };

  return (
    <section
      id="news"
      className="py-16 bg-gradient-to-b from-green-50 to-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
          {content.title}
        </h2>

        <div className="relative mb-4">
          <div className="flex justify-center">
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
          {isMobile && (
            <>
              <Button
                onClick={prevNews}
                variant="ghost"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={nextNews}
                variant="ghost"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center justify-center">
          {!isMobile && (
            <Button onClick={prevNews} variant="ghost" className="mr-4 z-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          <div
            ref={containerRef}
            className={`overflow-hidden w-full ${
              isMobile ? "max-w-full" : "max-w-6xl"
            } relative`}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
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
                  key={`${language}-${index}`}
                  className={`${
                    isMobile ? "w-full" : "w-1/3"
                  } flex-shrink-0 flex-grow-0 ${isMobile ? "px-0" : "px-3"}`}
                >
                  <Card className="h-full transition-all duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1 bg-white rounded-xl overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-green-700 whitespace-pre-line">
                        {news.title[language as keyof typeof news.title]}
                      </h3>
                      <p className="text-gray-600 mb-4 whitespace-pre-line">
                        {
                          news.description[
                            language as keyof typeof news.description
                          ]
                        }
                      </p>
                      {news.link.includes("instagram.com") ? (
                        <div
                          className="relative border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                          style={{
                            minWidth: "326px",
                            maxWidth: "540px",
                            height: "570px",
                          }}
                        >
                          <div className="absolute top-0 left-0 right-0 bg-white z-10 border-b border-gray-300">
                            <div className="flex items-center p-3">
                              <div className="relative w-8 h-8 mr-2">
                                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full"></div>
                                <div className="absolute inset-0.5 bg-white rounded-full"></div>
                                <img
                                  src="/images/le-klutch-logo.png"
                                  alt="Instagram"
                                  className="absolute inset-0.5 w-7 h-7 rounded-full object-cover object-center"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span
                                  className="font-semibold text-sm cursor-pointer"
                                  onClick={() =>
                                    window.open(news.link, "_blank")
                                  }
                                >
                                  @leklutchtennisclub
                                </span>
                              </div>
                              <div className="ml-auto">
                                <svg
                                  className="w-5 h-5 text-blue-500"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.5 6.5h-3.5v-3h-4v3h-3.5l5.5 5.5 5.5-5.5z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <blockquote
                            className="instagram-media absolute inset-0 pt-14"
                            data-instgrm-permalink={news.link}
                            data-instgrm-version="14"
                            style={{
                              background: "#FFF",
                              border: "0",
                              width: "100%",
                              height: "calc(100% - 56px)",
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
                          className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors duration-200"
                        >
                          More <ChevronRight className="h-4 w-4 ml-1" />
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
