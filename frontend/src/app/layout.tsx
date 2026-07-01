import type { Metadata } from "next";
import "./globals.css";

import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "AI-Powered Digital Twin of India's Climate",
  description:
    "Interactive climate intelligence platform for India with prediction, simulation, alerts, and dataset management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body>
=======
      <body className="antialiased">
>>>>>>> 02d3f33 (Add frontend application)
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
