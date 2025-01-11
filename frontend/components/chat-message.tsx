"use client";

// import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners";
import BotAvatar from "@/components/bot-avatar";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";


export interface ChatMessageProps {
    message:any;
    isLoading:boolean;
}

export default function ChatMessage({
    message,
    isLoading
}: ChatMessageProps) {

    // const { toast } = useToast();
    const { theme } = useTheme();


    return (
        <div className={cn(
            "group flex items-center gap-x-3 py-4 w-full ",
            message.role === "user" && "justify-end"
        )}>
            {message.role !== "user" && <BotAvatar/>}
            <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-green-500 font-medium">
                {isLoading ? <BeatLoader size={5} color={theme === "light" ? "black" : "white"} /> : (
                    <div>
                        {message.display}
                    </div>
                )}
            </div>
            {message.role === "user" && <UserAvatar />}
        </div>
    )
}