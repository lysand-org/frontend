import { Link } from "@remix-run/react";
import {
    Bell,
    Earth,
    Home,
    LineChart,
    Package,
    Package2,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "~/components/ui/tooltip";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const timelines = [
    {
        href: "/home",
        name: "Home",
        icon: Home,
        requiresAuth: true,
    },
    {
        href: "/public",
        name: "Public",
        icon: Earth,
    },
    {
        href: "/local",
        name: "Local",
        icon: Home,
    },
    {
        href: "/notifications",
        name: "Notifications",
        icon: Bell,
        requiresAuth: true,
    },
];

export const Aside = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 p-4 flex-col border-r border-border bg-background sm:flex hover:w-72 duration-200 group">
            <nav className="flex flex-col justify-center gap-4 w-full">
                <Link to="#">
                    <Avatar className="size-11 rounded ring-1 ring-ring/10 hover:scale-105 duration-200 bg-primary">
                        <AvatarImage
                            src="https://social.lysand.org/logo.webp"
                            alt="Logo of your instance"
                        />
                    </Avatar>
                </Link>
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                        Timelines
                    </h3>

                    {timelines.map((timeline) => (
                        <Link
                            to={timeline.href}
                            key={timeline.href}
                            className="w-full overflow-hidden"
                        >
                            <Button
                                variant="outline"
                                size="default"
                                className="w-full justify-start px-3.5"
                            >
                                <timeline.icon className="mr-2 size-4 shrink-0" />
                                <span className="shrink-0 line-clamp-1 opacity-0 group-hover:opacity-100 duration-100">
                                    {timeline.name}
                                </span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </nav>
            <nav className="mt-auto flex flex-col gap-4 px-2 sm:py-5">
                <h3 className="font-semibold text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                    Account
                </h3>
            </nav>
        </aside>
    );
};
