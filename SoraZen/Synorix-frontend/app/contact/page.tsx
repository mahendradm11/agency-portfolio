import type { Metadata } from 'next';
import ContactView from '@/components/views/ContactView';
import siteConfig from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Start a Project | Contact Engineering Team',
  description:
    'Initiate a discovery sprint with SoraZen Technologies. Discuss full-stack web engineering, microservices refactoring, high-throughput APIs, or dedicated sprint pods.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: `Start a Project | Contact SoraZen | ${siteConfig.name}`,
    description:
      'Direct line to SoraZen technical leadership. Fast turnaround, transparent technical proposals, and architectural evaluations within 24 hours.',
    url: `${siteConfig.url}/contact`,
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Contact SoraZen Technologies',
      },
    ],
  },
};

export default function Page() {
  return <ContactView />;
}
