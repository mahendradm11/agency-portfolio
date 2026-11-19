import type { Metadata } from 'next';
import AboutView from '@/components/views/AboutView';
import siteConfig from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'About Us | Software Studio & Engineering Philosophy',
  description:
    'Learn about SoraZen Technologies: our first-principles engineering philosophy, obsessive craft, and technical leadership team based in Bengaluru, India.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: `About Us | First-Principles Engineering | ${siteConfig.name}`,
    description:
      'We partner with high-growth companies to engineer resilient digital products, scalable cloud backends, and maintainable software architectures.',
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'About SoraZen Technologies',
      },
    ],
  },
};

export default function Page() {
  return <AboutView />;
}
