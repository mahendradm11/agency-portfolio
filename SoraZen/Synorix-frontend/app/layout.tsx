import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GridBackground from '@/components/ui/GridBackground';
import JsonLd from '@/components/seo/JsonLd';
import { Toaster } from 'sonner';
import siteConfig from '@/lib/siteConfig';

export const viewport: Viewport = {
  themeColor: '#050812',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | High-Performance Engineering & Digital Products`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteConfig.name} | High-Performance Engineering & Digital Products`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.legalName} Studio`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | High-Performance Engineering & Digital Products`,
    description: siteConfig.description,
    images: ['/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/sorazen-logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/sorazen-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="bg-[#050812] text-slate-100 antialiased selection:bg-[#00d4ff]/20 selection:text-[#00d4ff]">
        <GridBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#090e24',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f8fafc',
            },
          }}
        />
      </body>
    </html>
  );
}
