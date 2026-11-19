import type { Metadata } from 'next';
import ServicesView from '@/components/views/ServicesView';
import siteConfig from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Engineering Capabilities & Services',
  description:
    'Comprehensive software engineering capabilities: Full-Stack Web Engineering, REST API & Backend Systems, Microservices & Event-Driven Architecture, and Database Architecture.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: `Engineering Capabilities & Services | ${siteConfig.name}`,
    description:
      'Explore SoraZen Technologies core competencies: Next.js frontend engineering, high-concurrency microservices, and high-performance database tuning.',
    url: `${siteConfig.url}/services`,
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'SoraZen Engineering Capabilities',
      },
    ],
  },
};

export default function Page() {
  return <ServicesView />;
}
