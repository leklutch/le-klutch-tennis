import type { AppProps } from "next/app";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "../styles/globals.css";

const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });
const notoSerifTC = Noto_Serif_TC({ subsets: ["latin"], weight: "700" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-noto-sans: ${notoSansTC.style.fontFamily};
          --font-noto-serif: ${notoSerifTC.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
