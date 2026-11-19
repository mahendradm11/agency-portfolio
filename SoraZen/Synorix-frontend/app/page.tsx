import type { Metadata } from 'next';
import HomeView from '@/components/views/HomeView';
import siteConfig from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'High-Performance Engineering & Digital Products',
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteConfig.name} | High-Performance Engineering & Digital Products`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.legalName} Engineering Studio`,
      },
    ],
  },
};

export default function Page() {
  return <HomeView />;
}
