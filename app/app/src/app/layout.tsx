import "./globals.css";
import type { Metadata } from "next";
import { registerSW } from "@/lib/swClient";

export const metadata: Metadata = {
  title: "YouStillMatter",
  description: "Calm tools, crisis contacts, and self-care — privacy-first.",
  manifest: "/manifest.json",
  themeColor: "#2563EB",
  icons: [{ rel: "icon", url: "/icons/icon-192.png" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") registerSW();
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-2xl p-5">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">YouStillMatter</h1>
            <nav className="flex gap-3 text-sm">
              <a href="/" className="underline-offset-4 hover:underline">Home</a>
              <a href="/crisis" className="underline-offset-4 hover:underline">Crisis</a>
              <a href="/grounding" className="underline-offset-4 hover:underline">Grounding</a>
              <a href="/checkin" className="underline-offset-4 hover:underline">Check-in</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-10 text-xs text-mute">
            Not monitored 24/7. In an emergency, call 988 (US) or local emergency services.
          </footer>
        </div>
      </body>
    </html>
  );
}
