import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import React from "react";
import SidebarItem from "./sidebar-item";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import Tokens from "./tokens";

type Props = {
  className?: string;
};

const availableTokens = [
  {
    iconSrc: '/vara-token.svg',
    label: "Vara",
    href: "/vara",
    balance:'0.001'
  },
  {
    iconSrc: '/vara-token.svg',
    label: "TVara",
    href: "/vara",
    balance:'0.121'
  }
];


export default function Sidebar({ className }: Props) {
  return (
    <div className={cn(
      "flex h-full lg:w-[322px] lg:fixed left-0 top-0 px-4 py-6 border-r-2 flex-col",
      className,
    )}>
      <div className="px-2 pb-6">
        <Link href="/">
          <Logo className={"text-xl"} />
        </Link>
      </div>
      <div className="pt-4 py-2 flex flex-col gap-y-2 flex-1">
        <div>
          <div className="font-bold">
            Active Network
          </div>
          <SidebarItem
            iconSrc="/vara-token.svg"
            label="Vara Testnet"
            href="/#"
          />
        </div>
        <div className="pt-3">
          <div className="font-bold">
            Tokens
          </div>
          {availableTokens.map((token) => (
            <Tokens
              key={token.label}
              iconSrc={token.iconSrc}
              label={token.label}
              href={token.href}
              balance={token.balance}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <Button variant={"secondary"} className="w-[80%]">
          Disconnect
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};
