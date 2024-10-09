import React, { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSwipeable, SwipeEventData } from "react-swipeable";
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
  const [isSwipingActive, setIsSwipingActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleSwiped = useCallback(
    (eventData: SwipeEventData) => {
      if (eventData.dir === "Left") {
        nextNews();
      } else if (eventData.dir === "Right") {
        prevNews();
      }
      setIsSwipingActive(false);
    },
    [nextNews, prevNews]
  );

  const handlers = useSwipeable({
    onSwipeStart: (eventData) => {
      if (Math.abs(eventData.deltaY) < Math.abs(eventData.deltaX)) {
        setIsSwipingActive(true);
        if (eventData.event instanceof TouchEvent) {
          eventData.event.preventDefault();
        }
      }
    },
    onSwiped: handleSwiped,
    onTouchEndOrOnMouseUp: () => {
      setIsSwipingActive(false);
    },
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    // Removed preventDefaultTouchmoveEvent to fix linter error
    swipeDuration: 500,
  });

  const combinedRef = useCombinedRefs(containerRef, handlers.ref);

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
            ref={combinedRef}
            className={`overflow-hidden w-full ${
              isMobile ? "max-w-full" : "max-w-6xl"
            } relative`}
            {...(isMobile ? handlers : {})}
            style={{ touchAction: isSwipingActive ? "none" : "auto" }}
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
                      {news.link.includes("instagram.com") ? (
                        <div
                          className="relative border border-gray-300 rounded-lg overflow-hidden shadow-sm"
                          style={{
                            minWidth: "326px",
                            maxWidth: "540px",
                            height: "570px",
                          }}
                        >
                          <div className="absolute top-0 left-0 right-0 bg-white z-10 border-b border-gray-300">
                            <div className="flex items-center p-3">
                              <img
                                src="https://i.pinimg.com/474x/1e/d6/e0/1ed6e0a9e69176a5fdb7e090a1046b86.jpg"
                                alt="Instagram"
                                className="w-8 h-8 mr-2"
                              />
                              <div className="flex flex-col">
                                <span className="font-semibold text-sm">
                                  Instagram
                                </span>
                                <span className="text-xs text-gray-500">
                                  查看此貼文
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
                          {isMobile && (
                            <div
                              className="absolute inset-0 z-20"
                              style={{
                                pointerEvents: "auto",
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <a
                          href={news.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          閱讀更多 <ChevronRight className="h-4 w-4 ml-1" />
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
