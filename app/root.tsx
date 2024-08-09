import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import "./globals.css";
import type { LoaderFunction } from "@remix-run/node";
import {
    PreventFlashOnWrongTheme,
    type Theme,
    ThemeProvider,
    useTheme,
} from "remix-themes";
import { TooltipProvider } from "~/components/ui/tooltip";
import { themeSessionResolver } from "./sessions.server";

// Return the theme from the session storage using the loader
export const loader: LoaderFunction = async ({ request }) => {
    const { getTheme } = await themeSessionResolver(request);
    return {
        theme: getTheme(),
    };
};

export function App() {
    const data = useLoaderData<{
        theme: Theme | null;
    }>();
    const [theme] = useTheme();

    return (
        <html lang="en" data-theme={theme}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
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
    const data = useLoaderData<{
        theme: Theme | null;
    }>();
    return (
        <ThemeProvider
            specifiedTheme={data.theme}
            themeAction="/action/set-theme"
        >
            <TooltipProvider>
                <App />
            </TooltipProvider>
        </ThemeProvider>
    );
}
