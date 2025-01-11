import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";

interface UserAvatarProps{
    src?:string;
}

export default function UserAvatar({}:UserAvatarProps){
    return (
        <Avatar className="h-12 w-12 flex justify-center items-center">
            <UserIcon/>
        </Avatar>
    )
}