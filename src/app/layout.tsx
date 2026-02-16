import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Footer, Header } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

function AdSenseScript() {
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null;

  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Personal Finance & Salary Tools`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4604662808401939" />
        <meta name="google-site-verification" content="8G_MHpYNXlNM6coLpU7abGf1HFIlYLixt3IB7ATh1Pc" />
      </head>
      <body className={`${inter.variable} ${sourceSerif.variable} bg-slate-50 text-slate-900 antialiased`}>
        <AdSenseScript />
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
