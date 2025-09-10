import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageData(slug);
  
  if (!page) {
    return {
      title: 'Sayfa Bulunamadı',
    };
  }

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || '',
    keywords: page.seo?.keywords || '',
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Admin sayfalarını kontrol et (bunlar için 404 döndür)
  if (slug === 'admin') {
    notFound();
  }
  
  const page = await getPageData(slug);
  
  if (!page) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <DynamicPageContent page={page} />
      <Footer />
    </>
  );
}