import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Aside } from "~/components/navigation/aside";

export const meta: MetaFunction = () => {
    return [
        { title: "Lysand-FE" },
        {
            name: "description",
            content: "Frontend for the Lysand project",
        },
    ];
};

export default function AppLayout() {
    return (
        <main className="bg-background text-primary min-h-dvh">
            <Aside />
            <Outlet />
        </main>
    );
}
