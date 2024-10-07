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

export function LandingPageComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-900 text-white p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="/placeholder.svg?height=50&width=50"
              alt="Le Klutch 標誌"
              className="w-12 h-12"
            />
            <h1 className="text-2xl font-bold">Le Klutch</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#about"
              className="hover:text-green-300 transition duration-300"
            >
              ���於我們
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
            <div className="flex space-x-4">
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
            backgroundImage:
              'url("https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
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
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg py-3 px-6">
              開始您的旅程
            </Button>
          </AnimatedSection>
        </section>

        <AnimatedSection>
          <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">關於我們</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg mb-6">
                    LE KLUTCH
                    是指在關鍵時刻表現出色，這種獨特的成就源於練習和熱忱。
                    讓我們一起享受網球，創造我們自己的 LE KLUTCH 時刻！
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
                    src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="網球場"
                    className="rounded-lg shadow-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1542144582-1ba00456b5e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="網球��動員"
                    className="rounded-lg shadow-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1591491653056-4e9d563a42de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="網球教練"
                    className="rounded-lg shadow-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="網球設備"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section id="facilities" className="py-20 bg-green-50">
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
          <section id="pricing" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">
                會員與價格
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-green-50 shadow-md hover:shadow-xl transition duration-300">
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
                <Card className="bg-green-100 shadow-md hover:shadow-xl transition duration-300 transform scale-105">
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
                <Card className="bg-green-50 shadow-md hover:shadow-xl transition duration-300">
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
          <section id="contact" className="py-20 bg-green-800 text-white">
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.4400872756455!2d121.57607661500708!3d25.06073998396407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab7a36efa291%3A0x3e1c7f0c0f8f8f8f!2s181%20Jiuzong%20Rd%2C%20Neihu%20District%2C%20Taipei%20City%2C%20Taiwan%20114!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
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

      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Le Klutch 網球俱樂部。保留所有權利。</p>
          <p className="mt-2">設計與開發 by Le Klutch 團隊</p>
        </div>
      </footer>
    </div>
  );
}
