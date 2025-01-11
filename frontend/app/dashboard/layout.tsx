"use client"
import Sidebar from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { useEffect, useState } from "react";


type Props = {
    children: React.ReactNode;
  };
  
export default function MainLayout({
    children,
}: Props) {

    const [isMounted,setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }

    return (
      <div>
        <MobileHeader />
        <Sidebar className="hidden lg:flex" />
        <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
          <div className="max-w-[1056px] mx-auto pt-6 h-full">
            {children}
          </div>
        </main>
      </div>
    );
  };