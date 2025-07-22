import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدیریت کاربران",
  description: "ساخته شده توسط مهدی یار پورسالاری",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-estedad h-dvh">{children}</body>
    </html>
  );
}
