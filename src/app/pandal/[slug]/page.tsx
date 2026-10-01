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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
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
      url: `https://pujo2026.kolkata.in/pandal/${pandal.slug}`,
      images: [
        {
          url: pandal.featured_image,
          width: 1200,
          height: 630,
          alt: `${pandal.name} Durga Puja 2026`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [pandal.featured_image]
    }
  };
}

export default async function PandalPage({ params }: PageProps) {
  const { slug } = await params;
  const pandal = PANDALS_DATA.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
  );

  if (!pandal) {
    notFound();
  }

  return <PandalClientView pandal={pandal} />;
}
