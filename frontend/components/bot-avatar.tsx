import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

interface BotAvatarProps{

}

export default function BotAvatar({}:BotAvatarProps){
    return (
        <Avatar className="h-12 w-12 flex items-center justify-center">
            <Bot/>
        </Avatar>
    )
}