import type { Metadata } from "next";
import { Inter, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Fernanda Mascheti",
  description: "Desenvolvedora Front-end",
  keywords: [
    "desenvolvedora",
    "frontend",
    "react",
    "nextjs",
    "javascript",
    "typescript",
  ],
  authors: [{ name: "Fernanda Mascheti" }],
  creator: "Fernanda Mascheti",
  publisher: "Fernanda Mascheti",
  metadataBase: new URL("https://teste-tecnico-alura-two.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fernanda Mascheti - Desenvolvedora Front-end",
    description: "Portfolio da desenvolvedora front-end Fernanda Mascheti",
    url: "https://teste-tecnico-alura-two.vercel.app",
    siteName: "Fernanda Mascheti",
    images: [
      {
        url: "https://teste-tecnico-alura-two.vercel.app/seo.png",
        width: 1200,
        height: 630,
        alt: "Fernanda Mascheti - Desenvolvedora Front-end",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fernanda Mascheti - Desenvolvedora Front-end",
    description: "Portfolio da desenvolvedora front-end Fernanda Mascheti",
    images: ["/seo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.variable} ${chakraPetch.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-brand-blue-600 text-white p-3 z-50"
        >
          Pular para o conteúdo principal
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
