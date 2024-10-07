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
  Handshake,
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
import { Check, Copy } from "lucide-react";

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
  const tennisPlayerUrl =
    "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className={`min-h-screen bg-[#004730]/10 ${notoSansTC.className}`}>
      <header className="bg-[#004730] text-white p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/le-klutch-logo.png"
              alt="Le Klutch 標誌"
              width={48}
              height={48}
            />
            <h1 className="text-2xl font-bold font-serif">Le Klutch</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#about"
              className="hover:text-green-300 transition duration-300"
            >
              關於我們
            </a>
            <a
              href="#facilities"
              className="hover:text-green-300 transition duration-300"
            >
              設施
            </a>
            <a
              href="#pricing"
              className="hover:text-green-300 transition duration-300"
            >
              價格
            </a>
            <a
              href="#contact"
              className="hover:text-green-300 transition duration-300"
            >
              聯絡我們
            </a>
          </nav>
          <Button
            className="hidden md:block border border-current hover:bg-green-100 transition-colors"
            onClick={() => window.open("https://lin.ee/9bs6DF0", "_blank")}
          >
            立即預約
          </Button>
        </div>
      </header>

      <main className="pt-20">
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url("${heroBackgroundUrl}")`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <AnimatedSection className="relative z-10 text-center text-white p-8 rounded-lg">
            <h2 className="text-5xl font-bold mb-4">
              歡迎來到 Le Klutch 網球俱樂部
            </h2>
            <p className="text-2xl mb-8">
              可奇室內網球 - 創造屬於您的 LE KLUTCH 時刻！
            </p>
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
                LE KLUTCH
              </h2>
              <div className="space-y-12">
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">
                    關於我們
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    LE KLUTCH，源自法語「le
                    clutch」，如詩般優雅地詮釋著「關鍵時刻」。在翠綠的網球場上，它化身為決定勝負的精彩瞬間，如同一首激昂的生命頌歌。我們深信，每個人都能在人生的舞台上，揮灑出屬於自己的
                    LE KLUTCH
                    時刻！讓我們一同在這片綠茵上，譜寫屬於自己的網球詩篇，將汗水與熱情融入每一個揮拍的瞬間。
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    {
                      Icon: Activity,
                      text: "充滿樂趣與挑戰",
                      desc: "每一球都是新的冒險，激發你的運動潛能",
                    },
                    {
                      Icon: Users,
                      text: "全身運動健康",
                      desc: "提升體能與協調性，塑造健康強壯的身體",
                    },
                    {
                      Icon: Brain,
                      text: "鍛煉戰略思維",
                      desc: "成為場上的智者，培養快速決策和戰術分析能力",
                    },
                    {
                      Icon: Handshake,
                      text: "擴展社交圈",
                      desc: "結識志同道合的朋友，建立終身的網球夥伴關係",
                    },
                  ].map(({ Icon, text, desc }, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105"
                    >
                      <Icon className="w-12 h-12 text-green-600 mb-4" />
                      <h4 className="text-xl font-semibold mb-2 text-green-700">
                        {text}
                      </h4>
                      <p className="text-gray-600">{desc}</p>
                    </div>
                  ))}
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="bg-green-600 p-8 rounded-xl shadow-lg text-white transform hover:scale-105 transition-all duration-300">
                    <h3 className="text-3xl font-bold mb-4 text-center">
                      限時體驗優惠
                    </h3>
                    <p className="text-2xl mb-2 text-center">
                      僅需 NT$390 / 30分鐘
                    </p>
                    <p className="text-lg mb-6 font-semibold text-center">
                      每人限購一次，機會難得！
                    </p>
                    <Button
                      className="w-full bg-white text-green-600 hover:bg-green-50 transition-colors text-lg py-3 font-bold"
                      onClick={() =>
                        window.open("https://lin.ee/9bs6DF0", "_blank")
                      }
                    >
                      立即預約體驗
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
                世界級設施
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-6 text-center">
                在 LE
                KLUTCH，我們致力於打造頂級的室內網球體驗。從量身定制的課程到先進的設施，我們為每一位球員提供最佳的成長環境。
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    Icon: Activity,
                    title: "5個室內球場",
                    desc: "配備完美照明和溫控系統的先進室內球場",
                  },
                  {
                    Icon: Users,
                    title: "專業教練",
                    desc: "經驗豐富的教練為各級別球員提供個人化訓練",
                  },
                  {
                    Icon: Award,
                    title: "ITF認證",
                    desc: "我們的設施符合國際網球聯合會標準",
                  },
                ].map(({ Icon, title, desc }, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <Icon className="w-12 h-12 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      {title}
                    </h3>
                    <p className="text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section id="pricing" className="py-20 bg-white scroll-mt-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                會員與價格
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-[#004730]/10 shadow-md hover:shadow-xl transition duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      單堂購買
                    </h3>
                    <p className="text-4xl font-bold text-center mb-6">
                      NT$480 - NT$580
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <ChevronDown className="text-green-600 mr-2" /> 60分鐘
                      </li>
                      <li className="flex items-center">
                        <ChevronDown className="text-green-600 mr-2" /> 靈活選擇
                      </li>
                    </ul>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() =>
                        window.open("https://lin.ee/9bs6DF0", "_blank")
                      }
                    >
                      立即購買
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-[#004730]/20 shadow-md hover:shadow-xl transition duration-300 transform scale-105">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      教練課
                    </h3>
                    <p className="text-4xl font-bold text-center mb-6">
                      NT$1,700起
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <ChevronDown className="text-green-600 mr-2" /> 1V1 或
                        1V2 課程
                      </li>
                      <li className="flex items-center">
                        <ChevronDown className="text-green-600 mr-2" />{" "}
                        專業教練指導
                      </li>
                    </ul>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setIsModalOpen(true)}
                    >
                      查看詳情
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-[#004730]/10 shadow-md hover:shadow-xl transition duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      團體課
                    </h3>
                    <p className="text-4xl font-bold text-center mb-6">
                      NT$149起/點
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <ChevronDown className="text-green-600 mr-2" />{" "}
                        多種套餐選擇
                      </li>
                      <li className="flex items-center">
                        <ChevronDown className="text-green-600 mr-2" />{" "}
                        靈活使用點數
                      </li>
                    </ul>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setIsModalOpen(true)}
                    >
                      查看詳情
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center mt-12">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-black border border-black hover:bg-gray-100">
                      查看更多價格詳情
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>詳細價格資訊</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[70vh]">
                      <h3 className="text-2xl font-bold mt-4 mb-2">
                        團課方案價目表
                      </h3>
                      <p className="mb-2">團課時段及課程點數請參閱單月課表</p>
                      <table className="w-full border-collapse border border-gray-300 mb-6">
                        <thead>
                          <tr className="bg-green-100">
                            <th className="border border-gray-300 p-2">
                              點數套餐
                            </th>
                            <th className="border border-gray-300 p-2">
                              套票價格 & 有效期限
                            </th>
                            <th className="border border-gray-300 p-2">點數</th>
                            <th className="border border-gray-300 p-2">
                              每點平均價
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              一點 SINGLE
                            </td>
                            <td className="border border-gray-300 p-2">
                              $190 (7天)
                            </td>
                            <td className="border border-gray-300 p-2">1點</td>
                            <td className="border border-gray-300 p-2">
                              NT$190
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              輕量 STARTER
                            </td>
                            <td className="border border-gray-300 p-2">
                              $7,500 (60天)
                            </td>
                            <td className="border border-gray-300 p-2">43點</td>
                            <td className="border border-gray-300 p-2">
                              NT$174
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              中量 REGULAR
                            </td>
                            <td className="border border-gray-300 p-2">
                              $13,800 (180天)
                            </td>
                            <td className="border border-gray-300 p-2">86點</td>
                            <td className="border border-gray-300 p-2">
                              NT$160
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              海量 GRANDE
                            </td>
                            <td className="border border-gray-300 p-2">
                              $19,000 (180天)
                            </td>
                            <td className="border border-gray-300 p-2">
                              127點
                            </td>
                            <td className="border border-gray-300 p-2">
                              NT$149
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <h3 className="text-2xl font-bold mt-6 mb-2">
                        教練課價目表
                      </h3>
                      <table className="w-full border-collapse border border-gray-300 mb-6">
                        <thead>
                          <tr className="bg-green-100">
                            <th className="border border-gray-300 p-2">套餐</th>
                            <th className="border border-gray-300 p-2">
                              價格 & 有效期
                            </th>
                            <th className="border border-gray-300 p-2">
                              每堂平均
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              1V1教練課 (10堂)
                            </td>
                            <td className="border border-gray-300 p-2">
                              $18,000 (180天)
                            </td>
                            <td className="border border-gray-300 p-2">
                              NT$1,800/堂 (60分鐘)
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              1V1教練課 (20堂)
                            </td>
                            <td className="border border-gray-300 p-2">
                              $34,000 (365天)
                            </td>
                            <td className="border border-gray-300 p-2">
                              NT$1,700/堂 (60分鐘)
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              1V2教練課 (10堂)
                            </td>
                            <td className="border border-gray-300 p-2">
                              $22,000 (180天)
                            </td>
                            <td className="border border-gray-300 p-2">
                              NT$2,200/堂 (60分鐘)
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">
                              1V2教練課 (20堂)
                            </td>
                            <td className="border border-gray-300 p-2">
                              $40,000 (365天)
                            </td>
                            <td className="border border-gray-300 p-2">
                              NT$2,000/堂 (60分鐘)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h3 className="text-2xl font-bold mt-6 mb-2">匯款資訊</h3>

                      <div className=" p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <p className="font-semibold ">戶名</p>
                            <p className="text-gray-700">
                              可奇運動器材有限公司
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="font-semibold ">銀行</p>
                            <p className="text-gray-700">玉山銀行 808</p>
                          </div>
                          <div className="space-y-2">
                            <p className="font-semibold">帳號</p>
                            <div className="flex items-center space-x-2">
                              <p className="text-gray-700">054394068683</p>
                              <button
                                onClick={() => copyToClipboard("054394068683")}
                                className="p-1 rounded-md hover:bg-green-100 transition-colors"
                                aria-label="複製帳號"
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
                        <h4 className="font-bold mb-2">注意事項：</h4>
                        <p>團課 & 教練課僅限【匯款】</p>
                        <p>
                          匯款完成後，請用{" "}
                          <a
                            href="https://lin.ee/9bs6DF0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline"
                          >
                            Line
                          </a>{" "}
                          提供以下資訊以便確認：
                        </p>
                        <ul className="list-disc list-inside ml-4">
                          <li>會員姓名</li>
                          <li>手機後三碼</li>
                          <li>匯款帳號後三碼</li>
                        </ul>
                        <p className="mt-2">我們將在營業時間為您儲值點數 🎾</p>
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
                常見問題
              </h2>
              <div className="max-w-3xl mx-auto">
                <Accordion>
                  <AccordionItem trigger="球場使用規則">
                    <ul className="list-disc pl-8 space-y-4 text-lg">
                      <li>為維護消費者安全，球道內最多兩人同時擊球</li>
                      <li>
                        球道打擊區會員請務必穿著運動服裝及軟底運動鞋入場，禁止穿著不合場地使用規範之鞋類
                      </li>
                      <li>
                        球道區嚴禁口香糖及攜帶任何食品、飲料入場
                        (開水、毛巾除外)
                      </li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem trigger="課程預約規則">
                    <ul className="list-disc pl-8 space-y-4 text-lg">
                      <li>
                        為維護其他消費者安全，開課15分鐘後即無法進入教室。
                      </li>
                      <li>
                        訂課系統預約截止時間為開課前六小時，若開課六小時內想約上課，請來電洽詢或連繫LINE客服確認是否可以預約該課
                      </li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem trigger="課程方案規則">
                    <ul className="list-disc pl-8 space-y-4 text-lg">
                      <li>課程方案購買當天立即生效，起算為第一天</li>
                      <li>
                        課程方案為個人制，無法共用。但可全數轉讓，無法部分轉讓且以一次為限。每筆轉讓均收NT$400一次性手續費（體驗課方案無法轉讓）。
                      </li>
                      <li>
                        購課後因故無法參加可提供退費，每筆退費均收NT$600一次性手續費（已使用課程之扣款採單堂原價計算，不適用於多堂優惠方案）。
                      </li>
                      <li>
                        購課後符合以下法定事由，在出示相關證明後享有一次延期機會：
                        <ul className="list-disc pl-8 mt-2 space-y-2">
                          <li>出國逾一個月</li>
                          <li>身體不適</li>
                          <li>家庭照顧</li>
                          <li>服兵役</li>
                          <li>遷居</li>
                        </ul>
                      </li>
                      <li>
                        一般感冒及女性生理期，不得申請病假且不適用於方案延期
                      </li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem trigger="營業時間">
                    <p className="text-lg pl-8">10:00AM~10:00PM</p>
                  </AccordionItem>
                  <AccordionItem trigger="交通資訊">
                    <ul className="list-disc pl-8 space-y-4 text-lg">
                      <li>捷運: 文湖線港墘站</li>
                      <li>公車: 陽光抽水站</li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem trigger="停車資訊">
                    <p className="text-lg pl-8">
                      周遭有許多路邊停車格以及付費停車場
                    </p>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section
            id="contact"
            className="py-20 bg-[#004730] text-white scroll-mt-20"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">聯絡我們</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-4">與我們聯繫</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <MapPin size={24} />
                      <p>台北市內湖區舊宗路二段181巷2號2F</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone size={24} />
                      <p>02-2797-5889</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Clock size={24} />
                      <p>08:00AM~20:00PM</p>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-4">
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
                      href="https://lin.ee/9bs6DF0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="hover:text-green-300 transition duration-300"
                      >
                        <path d="M15 8h.01M12 8h.01M9 8h.01M6 8h.01M21 12c0 4.418-4.477 8-10 8s-10-3.582-10-8 4.477-8 10-8 10 3.582 10 8z" />
                      </svg>
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

      <footer className="bg-[#004730] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Le Klutch 網球俱樂部。保留所有權利。</p>
          <p className="mt-2">設計與開發 by Le Klutch 團隊</p>
        </div>
      </footer>
    </div>
  );
}
