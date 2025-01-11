"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, Edit3Icon, MessagesSquare, MoreVertical,Bot } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import BotAvatar from "./bot-avatar";


interface ChatHeaderProps {
    
}


export default function ChatHeader( {}: ChatHeaderProps) {

    const router = useRouter();
    const [isMounted,setIsMounted]=useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted) return null;

    return (
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4 px-4">
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost">
                    <ChevronLeft
                        className="h-8 w-8"
                    />
                </Button>
                <BotAvatar />
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">
                            Vara Wallet Assistant
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <MessagesSquare
                                className="w-3 h-3 mr-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 