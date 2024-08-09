import { Link } from "@remix-run/react";
import {
    Bell,
    Earth,
    Home,
    Keyboard,
    Pencil,
    Settings2,
    Ticket,
} from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const timelines = [
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
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-72 p-4 flex-col border-r border-border bg-background md:flex">
            <nav className="flex flex-col justify-center gap-4 w-full">
                <Link to="#">
                    <Avatar className="size-11 rounded ring-1 ring-ring/10 hover:scale-105 duration-200 bg-primary">
                        <AvatarImage
                            src="/logo.webp"
                            alt="Logo of your instance"
                        />
                    </Avatar>
                </Link>
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-xs uppercase">
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
                                className="w-full justify-start"
                            >
                                <timeline.icon className="mr-2 size-4" />

                                {timeline.name}
                            </Button>
                        </Link>
                    ))}
                </div>
            </nav>
            <nav className="mt-auto flex flex-col gap-4 sm:py-5">
                <h3 className="font-semibold text-xs uppercase">Account</h3>

                <Link to="/register">
                    <Button
                        variant="outline"
                        size="default"
                        className="w-full justify-start"
                    >
                        <Ticket className="mr-2 size-4" />
                        Register
                    </Button>
                </Link>
                <Link to="/settings">
                    <Button
                        variant="outline"
                        size="default"
                        className="w-full justify-start"
                    >
                        <Settings2 className="mr-2 size-4" />
                        Settings
                    </Button>
                </Link>

                <h3 className="font-semibold text-xs uppercase">Posts</h3>

                <Button className="w-full">
                    <Pencil className="mr-2 size-4" />
                    Compose
                    <kbd className="text-xs font-semibold rounded bg-background font-mono p-1 flex flex-row ml-auto text-primary items-center">
                        <Keyboard className="mr-1 size-4" />
                        <span className="mt-0.5">N</span>
                    </kbd>
                </Button>
            </nav>
        </aside>
    );
};

export const AccountPicker = () => {
    return;
};
