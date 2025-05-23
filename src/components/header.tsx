import Link from "next/link";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { HomeIcon, FileIcon, UserRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

import NavButton from "@/components/navButton";
import { ModeToggle } from "@/components/modeToggle";
import { NavButtonMenu } from "./nav-button-menu";

export const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/tickets" label="Home" icon={HomeIcon} />
          <Link
            href="/tickets"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <NavButton href="/tickets" label="Tickets" icon={FileIcon} />
          <NavButtonMenu
            icon={UserRound}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customer", href: "/customers/form" },
            ]}
          />
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="LogOut"
            title="LogOut"
            className="rounded-full"
            asChild
          >
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
};
