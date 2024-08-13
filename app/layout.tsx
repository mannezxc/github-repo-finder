import { ReduxProvider } from "@/lib/redux-provider";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.scss";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
    title: "Github Repo Finder",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
