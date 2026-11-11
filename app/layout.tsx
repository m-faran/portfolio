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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "light dark",
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

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = (stored === 'light' || stored === 'dark') ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = resolved;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`${geistSans.className} min-h-full flex flex-col bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
