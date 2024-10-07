"use client";

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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

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
  value,
  trigger,
  children,
}: {
  value: string;
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
        {trigger}
        <ChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="p-6">{children}</div>}
    </div>
  );
}

export function LandingPageComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Extract image URLs into variables
  const heroBackgroundUrl =
    "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  const tennisCourt1Url =
    "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
  const tennisPlayerUrl =
    "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
  const tennisCoachUrl =
    "https://images.unsplash.com/photo-1591491653056-4e9d563a42de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
  const tennisEquipmentUrl =
    "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-[#004730]/10">
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
          <Button className="hidden md:block border border-current hover:bg-green-100 transition-colors">
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
              </div>
            </div>
          </AnimatedSection>
        </section>

        <AnimatedSection>
          <section id="about" className="py-20 bg-white scroll-mt-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                LE KLUTCH
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg mb-6">
                    LE KLUTCH
                    是指在關鍵時刻表現出色，這種獨特的成就源於練習和熱忱。
                    讓我們一起享受網球，創造我們自己的 LE KLUTCH 時刻！
                  </p>
                  <p className="text-lg mb-6">為什麼打網球？</p>
                  <ol className="list-decimal list-inside text-lg mb-6 space-y-2">
                    <li>一項有趣且充滿挑戰的運動</li>
                    <li>能提高手眼協調能力</li>
                    <li>幫助你保持活力和敏捷</li>
                    <li>可以鍛煉你的戰略思維</li>
                    <li>是一個社交互動的好機會</li>
                    <li>能提升你的競爭力和自信心</li>
                    <li>有機會挑戰自我和突破極限</li>
                    <li>可以持續進步的運動，帶來成就感</li>
                  </ol>
                  <p className="text-lg mb-6">
                    無論你是初學者還是有經驗的球員，網球都能為你帶來無窮樂趣和收穫。
                    加入我們，一起體驗網球的魅力，創造屬於你的 LE KLUTCH 時刻！
                  </p>
                  <p className="text-lg mb-6">
                    我們致力於提供最優質的室內網球體驗，無論您是初學者還是專業選手，都能在這裡找到適合自己的課程和設施。
                  </p>
                  <div className="bg-green-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">體驗優惠</h3>
                    <p>體驗價 NT$390/ 30分鐘</p>
                    <p>每人限購一次</p>
                    <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                      立即預約
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src={tennisCourt1Url}
                    alt="網球場"
                    className="rounded-lg shadow-lg"
                  />
                  <img
                    src={tennisPlayerUrl}
                    alt="網球動員"
                    className="rounded-lg shadow-lg"
                  />
                  <img
                    src={tennisCoachUrl}
                    alt="網球教練"
                    className="rounded-lg shadow-lg"
                  />
                  <img
                    src={tennisEquipmentUrl}
                    alt="網球設備"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section
            id="facilities"
            className="py-20 bg-[#004730]/10 scroll-mt-20"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                世界級設施
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-white shadow-md hover:shadow-xl transition duration-300">
                  <CardContent className="p-6 text-center">
                    <Activity
                      size={48}
                      className="mx-auto mb-4 text-green-600"
                    />
                    <h3 className="text-xl font-bold mb-2">5個室內球場</h3>
                    <p>配備完美照明和溫控系統的先進室內球場</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-md hover:shadow-xl transition duration-300">
                  <CardContent className="p-6 text-center">
                    <Users size={48} className="mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-bold mb-2">專業教練</h3>
                    <p>經驗豐富的教練為各級別球員提供個人化訓練</p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-md hover:shadow-xl transition duration-300">
                  <CardContent className="p-6 text-center">
                    <Award size={48} className="mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-bold mb-2">ITF認證</h3>
                    <p>我們的設施符合國際網球聯合會標準</p>
                  </CardContent>
                </Card>
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
                        window.open(
                          "https://liff.line.me/1561801204-Yq0nkXBm",
                          "_blank"
                        )
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

                      <div className="bg-green-100 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">注意事項：</h4>
                        <p>團課 & 教練課僅限【匯款】</p>
                        <p>匯款完成後，請提供以下資訊以便確認：</p>
                        <ul className="list-disc list-inside ml-4">
                          <li>會員姓名</li>
                          <li>手機後三碼</li>
                          <li>匯款帳號後三碼</li>
                        </ul>
                        <p className="mt-2">我們將在營業時間為您儲值點數 🎾</p>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-bold">匯款帳號：</h4>
                        <p>戶名: 可奇運動器材有限公司</p>
                        <p>銀行: 玉山銀行 808</p>
                        <p>帳號: 0543940-68683</p>
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
              <h2 className="text-4xl font-bold mb-12 text-center">常見問題</h2>
              <Accordion>
                <AccordionItem value="item-1" trigger="球場使用規則">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>為維護消費者安全，球道內最多兩人同時擊球</li>
                    <li>
                      球道打擊區會員請務必穿著運動服裝及軟底運動鞋入場，禁止穿著不合場地使用規範之鞋類
                    </li>
                    <li>
                      球道區嚴禁口香糖及攜帶任何食品、飲料入場 (開水、毛巾除外)
                    </li>
                  </ul>
                </AccordionItem>
                <AccordionItem value="item-2" trigger="課程預約規則">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>為維護其他消費者安全，開課15分鐘後即無法進入教室。</li>
                    <li>
                      訂課系統預約截止時間為開課前六小時，若開課六小時內想約上課，請來電洽詢或連繫LINE客服確認是否可以預約該課
                    </li>
                  </ul>
                </AccordionItem>
                <AccordionItem value="item-3" trigger="課程方案規則">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>課程方案購買當天立即生效，起算為第一天</li>
                    <li>
                      課程方案為個人制，無法共用。但可全數轉讓，無法部分轉讓且以一次為限。每筆轉讓均收NT$400一次性手續費（體驗課方案無法轉讓）。
                    </li>
                    <li>
                      購課後因故無法參加可提供退費，每筆退費均收NT$600一次性手續費（已使用課程之扣款採單堂原價計算，不適用於多堂優惠方案）。
                    </li>
                    <li>
                      購課後符合以下法定事由，在出示相關證明後享有一次延期機會：
                      <ul className="list-disc pl-5 mt-2">
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
                <AccordionItem value="item-4" trigger="營業時間">
                  <p>10:00AM~10:00PM</p>
                </AccordionItem>
                <AccordionItem value="item-5" trigger="交通資訊">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>捷運: 文湖線港墘站</li>
                    <li>公車: 陽光抽水站</li>
                  </ul>
                </AccordionItem>
                <AccordionItem value="item-6" trigger="停車資訊">
                  <p>周遭有許多路邊停車格以及付費停車場</p>
                </AccordionItem>
              </Accordion>
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
