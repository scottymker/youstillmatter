import "./globals.css";
import RegisterSW from "@/components/RegisterSW";
import InstallPWA from "@/components/InstallPWA";

export const metadata = {
  title: "YouStillMatter",
  description: "Calm tools, crisis contacts, and self-care — privacy-first.",
  manifest: "/manifest.json",
  themeColor: "#06b6d4",
  icons: [
    { rel: "icon", url: "/icons/icon-192.png" },
    { rel: "apple-touch-icon", url: "/icons/icon-192.png" }
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* iOS standalone support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-screen">
        <RegisterSW />
        <InstallPWA />
        <div className="mx-auto max-w-2xl p-5">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">YouStillMatter</h1>
            <nav className="flex gap-3 text-sm">
              <a href="/" className="underline-offset-4 hover:underline">Home</a>
              <a href="/self-care" className="underline-offset-4 hover:underline">Self-Care</a>
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
