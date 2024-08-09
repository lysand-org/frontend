import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import "./globals.css";
import { TooltipProvider } from "~/components/ui/tooltip";
import { ThemeProvider } from "./components/theming/provider";

export function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function AppWithProviders() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <TooltipProvider>
                <App />
            </TooltipProvider>
        </ThemeProvider>
    );
}
