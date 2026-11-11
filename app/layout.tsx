import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Faran | Full Stack Software Engineer",
  description:
    "Product-minded Full-Stack & Mobile Engineer specializing in production web platforms and cross-platform mobile apps (React Native). Available for freelance MVPs and contracts on Upwork.",
  keywords: [
    "Full-Stack Engineer",
    "React Native Developer",
    "Next.js Developer",
    "Mobile App Developer",
    "Freelance Software Engineer",
    "Faran Portfolio",
  ],
  authors: [{ name: "Faran" }],
  openGraph: {
    title: "Faran | Full-Stack & Mobile Engineer",
    description:
      "Production web platforms and cross-platform mobile apps (React Native). Taking products from zero to deployment.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark h-full ${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${geistSans.className} min-h-full flex flex-col bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}

