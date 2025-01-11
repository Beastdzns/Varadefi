"use client"
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function Footer() {
    const { theme } = useTheme();
    return (
        <div className="fixed bottom-0 w-full p-4 border-t ">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className={cn("space-x-4 md:block md:w-auto flex items-center justify-between w-full text-3xl text-white", theme === "light" && "text-slate-900")}>
                    <Button size="sm" variant="ghost">
                        Privacy Policy
                    </Button>
                    <Button size="sm" variant="ghost">
                        Terms of Service
                    </Button>
                </div>
            </div>
        </div>
    );
};