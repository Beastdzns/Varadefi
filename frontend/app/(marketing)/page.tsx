"use client"
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import TypeWriterComponent from "typewriter-effect"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: [
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
});


export default function Home() {
  const { theme } = useTheme();


  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn(
        "flex items-center justify-center flex-col",
        headingFont.className,
      )}>
        <div className="mb-4 text-sm flex items-center border shadow-sm py-2 px-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          Powered by Vara Blockchain
        </div>
        <h1 className={cn("text-4xl md:text-7xl text-center text-white mb-6", theme === "light" && "text-black")}>
          TokenTechies
        </h1>
        <div className="text-2xl md:text-5xl bg-gradient-to-r from-[#31FAC6] to-[#179675] text-white px-4 p-2 rounded-md  w-fit">
          <TypeWriterComponent
            options={{
              strings: [
                "send 5 tokens to shlok.vara",
                "what is my balance.",
                "swap WETH with testVara.",
                "send 5 tokens to shridhar.vara",
                "ask me anything!",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className={cn(
        "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
        textFont.className,
      )}>

        TokenTechies is a ai wallet that allows you to send and receive money from anywhere in the world, with just plain english.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/chat">
          Get started
        </Link>
      </Button>
    </div>

  );
}