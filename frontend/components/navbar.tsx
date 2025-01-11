"use client";

import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import MobileSidebar from "@/components/mobile-sidebar";

import { useEffect, useState } from "react";
import { Plus, Settings, StoreIcon, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import dynamic from 'next/dynamic';

// @ts-ignore
const web3Accounts = dynamic(() => import('@polkadot/extension-dapp'), { ssr: false });
// @ts-ignore
const web3Enable = dynamic(() => import('@polkadot/extension-dapp'), { ssr: false });

const font = Poppins({
    weight: "600",
    subsets: ['latin']
})

const routes = [
    {
        icon: User2,
        href: "/chat",
        label: "Dashboard",
        logined: true,
    },
    {
        href: "/twilo",
        label: "Call AI",
    },
    {
        href: "/bucket",
        label: "Bucket",
    },
]

export default function Navbar() {

    const router = useRouter();

    const [account, setAccount] = useState<InjectedAccountWithMeta[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);

    const [isMounted, setIsMounted] = useState(false);

    async function connectWalletFunc() {
        const { web3Enable, web3Accounts } = await import("@polkadot/extension-dapp");
        const extensions = await web3Enable("WhispherCash");

        if (extensions.length === 0) {
            alert("No Extension Found");
        }

        const allAccounts = await web3Accounts();

        console.log(allAccounts);

        if (allAccounts.length === 1) {
            setSelectedAccount(allAccounts[0]);
        }
    }

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <div className="flex md:hidden">
                    <MobileSidebar />
                </div>
                <Link
                    href="/"
                >
                    <Logo />
                </Link>
            </div>

            <div className="flex items-center gap-x-3">
                <div className="hidden md:flex gap-6 pr-20">
                    {routes.map((route) => {
                        return (
                            <Button variant="ghost" onClick={() => router.push(route.href)} key={route.href}>
                                <h1 className={cn("font-bold text-lg cursor-pointer", font.className)} >
                                    {route.label}
                                </h1>
                            </Button>
                        )
                    })}
                </div>
                <Button size="sm" onClick={() => connectWalletFunc()}>
                    {selectedAccount === null ? 'Connect' : 'Disconnect'}
                    <Wallet
                        className="h-4 w-4 fill-white ml-2"
                    />
                </Button>
                <ModeToggle />
            </div>
        </div>
    )
}
