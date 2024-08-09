import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Lysand-FE" },
        {
            name: "description",
            content: "Frontend for the Lysand project",
        },
    ];
};

export default function Index() {
    return <div className="font-sans p-4" />;
}
