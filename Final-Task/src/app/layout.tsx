import type { Metadata } from "next";
import "./global.css";
import ClientProvider from "@/components/AuthProvider/ClientProvider";

export const metadata: Metadata = {
  title: "A2SV Opportunities",
  description: "Find and apply for opportunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
