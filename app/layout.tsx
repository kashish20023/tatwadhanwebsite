import type { Metadata, Viewport } from "next";
import { ScrollRevealProvider } from "@/components/ui/ScrollRevealProvider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tatvdhan.com"),
  title: {
    default: "Tatvdhan Jaipur | The Wedding Chapter",
    template: "%s | Tatvdhan Jaipur",
  },
  description:
    "Tatvdhan — Rooted in tradition. Made for today. Bespoke Indian bridal & ceremonial couture by Vinayak Agarwal in Jaipur.",
  keywords: [
    "Tatvdhan",
    "Jaipur Couture",
    "Indian Bridal Wear",
    "Sherwani",
    "Zardozi",
    "Luxury Couture",
    "Vinayak Agarwal",
  ],
  authors: [{ name: "Vinayak Agarwal" }],
  creator: "Tatvdhan Jaipur",
  icons: {
    icon: "/images/image_01.png",
    shortcut: "/images/image_01.png",
    apple: "/images/image_01.png",
  },
  openGraph: {
    title: "Tatvdhan Jaipur | The Wedding Chapter",
    description: "Tatvdhan — Rooted in tradition. Made for today.",
    url: "https://tatvdhan.com",
    siteName: "Tatvdhan Jaipur",
    images: [
      {
        url: "/images/image_18.webp",
        width: 1200,
        height: 630,
        alt: "Tatvdhan Jaipur Couture Campaign",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Nourd-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Nourd-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alata&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-[#101010] selection:bg-[#E8C35A] selection:text-black">
        <ScrollRevealProvider />
        {children}
      </body>
    </html>
  );
}
