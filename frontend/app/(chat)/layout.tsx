import { AI } from "@/actions";
import { MobileHeader } from "@/components/mobile-header";
import Sidebar from "@/components/sidebar";


export default function ChatLayout({ children }: { children: React.ReactNode }) {

   
    return (
        <body suppressHydrationWarning>
            <MobileHeader />
            <Sidebar className="hidden lg:flex" />
            <div className="lg:pl-80 h-full pt-[50px] lg:pt-0">
                <div className="w-full mx-auto pt-6 h-full">
                    <AI>
                        {children}
                    </AI>
                </div>
            </div>
        </body>
    )
}