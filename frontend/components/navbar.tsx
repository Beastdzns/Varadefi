"use client";

import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import MobileSidebar from "@/components/mobile-sidebar";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import dynamic from "next/dynamic";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  { href: "/chat", label: "Dashboard" },
  { href: "/twilo", label: "Call AI" },
  { href: "/bucket", label: "Bucket" },
];

declare global {
  interface Window {
    wallet?: {
      isConnected: boolean;
      address?: string;
    };
  }
}

export default function Navbar() {
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const connectWalletFunc = async () => {
    const { web3Enable, web3Accounts } = await import("@polkadot/extension-dapp");
    const extensions = await web3Enable("WhisperCash");

    if (extensions.length === 0) {
      alert("No Extension Found");
      return;
    }

    const allAccounts = await web3Accounts();
    if (allAccounts.length > 0) {
      setSelectedAccount(allAccounts[0]);
      window.wallet = {
        isConnected: true,
        address: allAccounts[0].address, // Persist the wallet address globally
      };
    }
  };

  const disconnectWalletFunc = () => {
    setSelectedAccount(null);
    window.wallet = { isConnected: false, address: undefined }; // Clear wallet state globally
  };

  useEffect(() => {
    setIsMounted(true);

    // Check for persistent wallet connection on load
    if (window.wallet?.isConnected) {
      setSelectedAccount({ address: window.wallet.address } as InjectedAccountWithMeta);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <div className="flex md:hidden">
          <MobileSidebar />
        </div>
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex items-center gap-x-3">
        <div className="hidden md:flex gap-6 pr-20">
          {routes.map((route) => (
            <Button variant="ghost" onClick={() => router.push(route.href)} key={route.href}>
              <h1 className={cn("font-bold text-lg cursor-pointer", font.className)}>{route.label}</h1>
            </Button>
          ))}
        </div>
        <Button size="sm" onClick={selectedAccount ? disconnectWalletFunc : connectWalletFunc}>
          {selectedAccount ? `Disconnect (${selectedAccount.meta.name || "Wallet"})` : "Connect"}
          <Wallet className="h-4 w-4 fill-white ml-2" />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
