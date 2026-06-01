import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediCall Survey",
  description: "Help shape healthcare in Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
