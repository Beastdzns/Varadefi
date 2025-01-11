"use client";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import TypeWriterComponent from "typewriter-effect";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// Dynamically import SplineViewer to avoid SSR issues
const SplineViewer = dynamic(() => import('@/components/SplineViewer'), { ssr: false });

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
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
    <div className="relative w-full h-screen flex flex-col pb-20 pt-16">
      {/* Spline 3D Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* New Spline Scene URL */}
        <SplineViewer sceneUrl="https://prod.spline.design/eMr5HTepeZw5guiN/scene.splinecode" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-between flex-grow px-4 py-10">
        <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
          <h1 className={cn("text-4xl md:text-7xl text-center text-white mb-6", theme === "light" && "text-black")}>
            TokenTechies
          </h1>
        </div>



        <Button className="mt-6" size="lg" asChild>
          <Link href="/chat">
            Get started
          </Link>
        </Button>
      </div>
    </div>
  );
}
