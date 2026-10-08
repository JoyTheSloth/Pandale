import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PANDALS_DATA } from '@/data/pandals';
import PandalClientView from '@/components/PandalClientView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PANDALS_DATA.map((pandal) => ({
    slug: pandal.slug
  }));
}

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://pandalekolkata.vercel.app';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = getSiteUrl();
  const pandal = PANDALS_DATA.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
  );

  if (!pandal) {
    return {
      title: 'Pandal Not Found | Pujo 2026',
      description: 'Explore Kolkata Durga Puja 2026 pandals and metro guides.'
    };
  }

  const title = `${pandal.name} — Kolkata Durga Puja 2026 | Metro & Pandal Guide`;
  const description = `${pandal.name} (${pandal.locality}, ${pandal.area}). Nearest Metro: ${pandal.nearest_metro} (${pandal.walking_distance} walk). Theme: ${pandal.theme}. View 2026 photos & directions.`;

  return {
    title,
    description,
    keywords: [
      pandal.name,
      `${pandal.name} 2026`,
      pandal.locality,
      pandal.area,
      pandal.nearest_metro,
      'Kolkata Durga Puja 2026',
      'Pujo 2026'
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${siteUrl}/pandal/${pandal.slug}`,
      images: [
        {
          url: pandal.featured_image,
          width: 1200,
          height: 630,
          alt: `${pandal.name} Durga Puja`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [pandal.featured_image]
    },
    alternates: {
      canonical: `${siteUrl}/pandal/${pandal.slug}`,
    },
  };
}

export default async function PandalPage({ params }: PageProps) {
  const { slug } = await params;
  const siteUrl = getSiteUrl();
  const pandal = PANDALS_DATA.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
  );

  if (!pandal) {
    notFound();
  }

  // Schema.org Structured Data for Local SEO & Generative AI Engines
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TouristAttraction', 'Place', 'Event'],
        '@id': `${siteUrl}/pandal/${pandal.slug}#attraction`,
        name: pandal.name,
        description: pandal.description,
        url: `${siteUrl}/pandal/${pandal.slug}`,
        image: pandal.featured_image.startsWith('http')
          ? pandal.featured_image
          : `${siteUrl}${pandal.featured_image}`,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: pandal.latitude,
          longitude: pandal.longitude,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: pandal.locality,
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          postalCode: '700001',
          addressCountry: 'IN',
        },
        publicAccess: true,
        isAccessibleForFree: true,
        touristType: ['Cultural', 'Religious', 'Heritage'],
        organizer: pandal.puja_committee ? {
          '@type': 'Organization',
          name: pandal.puja_committee,
        } : undefined,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pandals',
            item: `${siteUrl}/pandals`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: pandal.name,
            item: `${siteUrl}/pandal/${pandal.slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the nearest metro station to ${pandal.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The nearest metro station to ${pandal.name} is ${pandal.nearest_metro}, which is approximately a ${pandal.walking_distance} walk (${pandal.walking_time_mins} minutes).`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the best time to visit ${pandal.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The best recommended time to visit is ${pandal.best_time}.`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the theme of ${pandal.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: pandal.theme || `${pandal.name} showcases traditional and creative cultural artistry for Durga Puja.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PandalClientView pandal={pandal} />
    </>
  );
}
