import { Link } from "@remix-run/react";
import { Bell, Home, Pencil, User } from "lucide-react";
import type { FC } from "react";
import { Button } from "../ui/button";
import { Drawer, DrawerTrigger } from "../ui/drawer";

export const MobileNavigation = () => {
    return (
        <nav className="fixed bottom-0 inset-x-0 z-10 h-16 md:hidden grid gap-3 bg-background border-t border-border grid-cols-4 p-2">
            <Drawer>
                <DrawerTrigger asChild={true}>
                    <MobileNavbarButton Icon={Home} text="Home" />
                </DrawerTrigger>
            </Drawer>
            <Link to="/notifications">
                <MobileNavbarButton Icon={Bell} text="Notifications" />
            </Link>
            <Drawer>
                <DrawerTrigger asChild={true}>
                    <MobileNavbarButton Icon={User} text="Account" />
                </DrawerTrigger>
            </Drawer>
            <MobileNavbarButton Icon={Pencil} text="Compose" />
        </nav>
    );
};

const MobileNavbarButton: FC<{
    Icon: FC<{ className?: string }>;
    text: string;
}> = ({ Icon, text }) => {
    return (
        <Button variant="ghost" size="icon" className="w-full h-full">
            <Icon className="size-5" />
            <span className="sr-only">{text}</span>
        </Button>
    );
};
