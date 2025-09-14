import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';
import { generateSEOMetadata, generateStructuredData } from '@/lib/metadata';
import Script from 'next/script';

interface Page {
  slug: string;
  title: string;
  published: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

async function getPageData(slug: string) {
  try {
    const pagesFilePath = path.join(process.cwd(), 'data', 'pages.json');
    const data = await fs.readFile(pagesFilePath, 'utf-8');
    const pagesData = JSON.parse(data);
    const page = pagesData.pages.find((p: Page) => p.slug === slug && p.published);
    return page;
  } catch (error) {
    console.error('Error reading page:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const pagesFilePath = path.join(process.cwd(), 'data', 'pages.json');
    const data = await fs.readFile(pagesFilePath, 'utf-8');
    const pagesData = JSON.parse(data);
    
    return pagesData.pages
      .filter((p: Page) => p.published)
      .map((p: Page) => ({
        slug: p.slug,
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const page = await getPageData(slug);

  if (!page) {
    return {
      title: 'Sayfa Bulunamadı',
    };
  }

  return generateSEOMetadata({
    locale: locale as 'tr' | 'en' | 'sq',
    title: page.seo?.title || page.title,
    description: page.seo?.description || '',
    path: `/${slug}`,
    type: 'article'
  });
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

  // Admin sayfalarını kontrol et (bunlar için 404 döndür)
  if (slug === 'admin') {
    notFound();
  }

  const page = await getPageData(slug);

  if (!page) {
    notFound();
  }

  const articleData = generateStructuredData({
    type: 'Article',
    locale: locale as 'tr' | 'en' | 'sq',
    data: {
      title: page.seo?.title || page.title,
      description: page.seo?.description || '',
      path: `/${slug}`,
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString()
    }
  });

  return (
    <>
      <Script
        id="structured-data-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleData)
        }}
      />
      <Navigation />
      <DynamicPageContent page={page} />
      <Footer />
    </>
  );
}