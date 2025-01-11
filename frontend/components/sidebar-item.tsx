"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Wallet2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};



export default function SidebarItem({
  label,
  iconSrc,
  href,
}: Props) {
  const pathname = usePathname();
  const active = pathname === href;
  const {theme}=useTheme();

  return (
    <Button
      variant={active ? "sidebarOutline"  : "sidebar"}
      className={cn("justify-start h-[52px] font-medium",theme==="light"?"text-black":"text-white")}
      asChild
    >
      <Link href={href}>
      <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};
