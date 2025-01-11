import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RecoilContextProvider } from "@/components/providers/RecoilContextProvider";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vara Chat",
  description: "Vara AI Chat Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col justify-between h-screen">
              <main className="flex flex-col h-full">
                <main className="px-4 py-4 h-full">{children}</main> 
              </main>
              {/* <Footer /> */}
            </div>
          </ThemeProvider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
