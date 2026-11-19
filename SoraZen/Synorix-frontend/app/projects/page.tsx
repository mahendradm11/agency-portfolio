import type { Metadata } from 'next';
import ProjectsView from '@/components/views/ProjectsView';
import siteConfig from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Engineering Case Studies & Featured Work',
  description:
    'Explore production systems built by SoraZen Technologies: real-time financial trading engines, distributed log ingestion pipelines, AI recommendation systems, and SaaS platforms.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: `Featured Work & Engineering Case Studies | ${siteConfig.name}`,
    description:
      'Verified case studies in high-concurrency architecture, real-time data pipelines, and full-stack software products.',
    url: `${siteConfig.url}/projects`,
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'SoraZen Engineering Case Studies',
      },
    ],
  },
};

export default function Page() {
  return <ProjectsView />;
}
