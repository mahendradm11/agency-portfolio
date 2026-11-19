import siteConfig from '@/lib/siteConfig';

export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/sorazen-logo.svg`,
          width: 200,
          height: 200,
        },
        image: `${siteConfig.url}/hero.png`,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.location.city,
          addressCountry: siteConfig.location.country,
        },
        sameAs: [
          siteConfig.social.whatsapp,
        ],
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Global',
        },
        priceRange: '$$$$',
        knowsAbout: siteConfig.keywords,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
