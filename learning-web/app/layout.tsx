import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "LearnHub - Master New Skills",
  description: "A content-driven learning platform with organized themes and lectures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
