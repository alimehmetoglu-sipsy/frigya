'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Copy, Settings, Layout, Type, Image, FileText, List, Map, Users, Mail } from 'lucide-react';
import Link from 'next/link';

interface Page {
  id: string;
  title: string;
  slug: string;
  template: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const pageTemplates = [
  { id: 'blank', name: 'Boş Sayfa', icon: FileText, description: 'Sıfırdan başla' },
  { id: 'content', name: 'İçerik Sayfası', icon: Type, description: 'Başlık ve metin içeriği' },
  { id: 'gallery', name: 'Galeri Sayfası', icon: Image, description: 'Fotoğraf galerisi' },
  { id: 'services', name: 'Hizmetler', icon: List, description: 'Hizmet listesi' },
  { id: 'contact', name: 'İletişim', icon: Mail, description: 'İletişim formu ve bilgileri' },
  { id: 'team', name: 'Ekip', icon: Users, description: 'Ekip üyeleri' },
  { id: 'route', name: 'Rota', icon: Map, description: 'Rota ve harita bilgileri' }
];

export default function PagesAdmin() {
  const [pages, setPages] = useState<Page[]>([]);
  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      setPages(data.pages || []);
    } catch (error) {
      console.error('Sayfalar yüklenemedi:', error);
    }
  };

  const createPage = async () => {
    if (!newPageTitle || !newPageSlug) {
      setMessage('Sayfa başlığı ve URL gereklidir.');
      return;
    }

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPageTitle,
          slug: newPageSlug,
          template: selectedTemplate,
          published: false
        })
      });

      if (res.ok) {
        const newPage = await res.json();
        setPages([...pages, newPage]);
        setShowNewPageModal(false);
        setNewPageTitle('');
        setNewPageSlug('');
        setSelectedTemplate('blank');
        setMessage('Sayfa başarıyla oluşturuldu!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Sayfa oluşturulamadı:', error);
      setMessage('Sayfa oluşturulurken hata oluştu.');
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) return;

    try {
      const res = await fetch(`/api/pages/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setPages(pages.filter(p => p.id !== id));
        setMessage('Sayfa silindi.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Sayfa silinemedi:', error);
    }
  };

  const togglePublish = async (id: string, published: boolean) => {
    try {
      const res = await fetch(`/api/pages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published })
      });

      if (res.ok) {
        setPages(pages.map(p => 
          p.id === id ? { ...p, published: !published } : p
        ));
      }
    } catch (error) {
      console.error('Durum güncellenemedi:', error);
    }
  };

  const generateSlug = (title: string) => {
    const turkishChars: { [key: string]: string } = {
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
      'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
    };
    
    let slug = title.toLowerCase();
    Object.keys(turkishChars).forEach(char => {
      slug = slug.replace(new RegExp(char, 'g'), turkishChars[char]);
    });
    
    return slug
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sayfa Yönetimi</h1>
          <p className="text-gray-600 mt-2">Web sitenizdeki tüm sayfaları yönetin</p>
        </div>
        <button
          onClick={() => setShowNewPageModal(true)}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Sayfa</span>
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('başarı') || message.includes('silindi') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Sayfalar Listesi */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sayfa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Şablon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Güncelleme
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Varsayılan Sayfalar */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Ana Sayfa</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">/</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sistem</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Yayında
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link href="/admin/content" className="text-primary-600 hover:text-primary-900 mr-3">
                  <Edit2 className="w-4 h-4 inline" />
                </Link>
                <Link href="/" target="_blank" className="text-gray-600 hover:text-gray-900">
                  <Eye className="w-4 h-4 inline" />
                </Link>
              </td>
            </tr>
            
            {['rota-aciklamasi', 'rotada', 'seyahat-tavsiyeleri', 'kaynaklar', 'galeri', 'iletisim'].map(slug => (
              <tr key={slug} className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {slug === 'rota-aciklamasi' && 'Rota Açıklaması'}
                    {slug === 'rotada' && 'Rotada'}
                    {slug === 'seyahat-tavsiyeleri' && 'Seyahat Tavsiyeleri'}
                    {slug === 'kaynaklar' && 'Kaynaklar'}
                    {slug === 'galeri' && 'Galeri'}
                    {slug === 'iletisim' && 'İletişim'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">/{slug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sistem</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Yayında
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    href={`/admin/page-builder/${slug}`} 
                    className="text-primary-600 hover:text-primary-900 mr-3"
                    title="Sayfa Builder ile Düzenle"
                  >
                    <Edit2 className="w-4 h-4 inline" />
                  </Link>
                  <Link href={`/${slug}`} target="_blank" className="text-gray-600 hover:text-gray-900">
                    <Eye className="w-4 h-4 inline" />
                  </Link>
                </td>
              </tr>
            ))}

            {/* Kullanıcı Sayfaları */}
            {pages.map((page) => (
              <tr key={page.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{page.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">/{page.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pageTemplates.find(t => t.id === page.template)?.name || page.template}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => togglePublish(page.id, page.published)}
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      page.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {page.published ? 'Yayında' : 'Taslak'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(page.updatedAt).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    href={`/admin/page-builder/${page.id}`}
                    className="text-primary-600 hover:text-primary-900 mr-3"
                  >
                    <Edit2 className="w-4 h-4 inline" />
                  </Link>
                  {page.published && (
                    <Link 
                      href={`/${page.slug}`} 
                      target="_blank"
                      className="text-gray-600 hover:text-gray-900 mr-3"
                    >
                      <Eye className="w-4 h-4 inline" />
                    </Link>
                  )}
                  <button
                    onClick={() => deletePage(page.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Yeni Sayfa Modal */}
      {showNewPageModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Yeni Sayfa Oluştur</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sayfa Başlığı
                </label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => {
                    setNewPageTitle(e.target.value);
                    setNewPageSlug(generateSlug(e.target.value));
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Örn: Hakkımızda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL (Slug)
                </label>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">/</span>
                  <input
                    type="text"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="hakkimizda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şablon Seçin
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {pageTemplates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-4 border-2 rounded-lg text-left hover:border-primary-500 transition-colors ${
                          selectedTemplate === template.id 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <Icon className="w-8 h-8 text-primary-500 mb-2" />
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-gray-500">{template.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => {
                  setShowNewPageModal(false);
                  setNewPageTitle('');
                  setNewPageSlug('');
                  setSelectedTemplate('blank');
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={createPage}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Sayfa Oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}