import './globals.css';
export const metadata = { title: 'YouStillMatter' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen p-6">{children}</body>
    </html>
  );
}
