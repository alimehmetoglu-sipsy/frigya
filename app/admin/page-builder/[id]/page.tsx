'use client';

import { useState, useEffect, use } from 'react';
import { 
  Save, ArrowLeft, Eye, Settings, Plus, Trash2, MoveUp, MoveDown,
  Type, Image, List, Quote, Code, Map, Users, Mail, Calendar,
  FileText, Link2, Video, Music, Download, ChevronUp, ChevronDown
} from 'lucide-react';
import Link from 'next/link';

interface Component {
  id: string;
  type: string;
  content: any;
  settings: any;
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  template: string;
  components: Component[];
  published: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

const componentTypes = [
  { id: 'heading', name: 'Başlık', icon: Type, category: 'Metin' },
  { id: 'paragraph', name: 'Paragraf', icon: FileText, category: 'Metin' },
  { id: 'image', name: 'Resim', icon: Image, category: 'Medya' },
  { id: 'gallery', name: 'Galeri', icon: Image, category: 'Medya' },
  { id: 'video', name: 'Video', icon: Video, category: 'Medya' },
  { id: 'list', name: 'Liste', icon: List, category: 'Metin' },
  { id: 'quote', name: 'Alıntı', icon: Quote, category: 'Metin' },
  { id: 'button', name: 'Buton', icon: Link2, category: 'Etkileşim' },
  { id: 'divider', name: 'Ayırıcı', icon: Code, category: 'Düzen' },
  { id: 'spacer', name: 'Boşluk', icon: Code, category: 'Düzen' },
  { id: 'map', name: 'Harita', icon: Map, category: 'Etkileşim' },
  { id: 'contact', name: 'İletişim Formu', icon: Mail, category: 'Etkileşim' },
  { id: 'team', name: 'Ekip Üyeleri', icon: Users, category: 'İçerik' },
  { id: 'services', name: 'Hizmetler', icon: List, category: 'İçerik' },
  { id: 'testimonials', name: 'Referanslar', icon: Quote, category: 'İçerik' },
  { id: 'faq', name: 'SSS', icon: FileText, category: 'İçerik' },
  { id: 'cta', name: 'Harekete Geçirme', icon: Link2, category: 'Etkileşim' },
  { id: 'hero', name: 'Hero Bölümü', icon: Image, category: 'Düzen' },
  { id: 'features', name: 'Özellikler', icon: List, category: 'İçerik' },
  { id: 'stats', name: 'İstatistikler', icon: Calendar, category: 'İçerik' }
];

export default function PageBuilder({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [pageData, setPageData] = useState<PageData>({
    id: '',
    title: '',
    slug: '',
    template: '',
    components: [],
    published: false,
    seo: {
      title: '',
      description: '',
      keywords: ''
    }
  });
  
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showComponentLibrary, setShowComponentLibrary] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  useEffect(() => {
    if (id !== 'new') {
      fetchPageData();
    }
  }, [id]);

  const fetchPageData = async () => {
    try {
      const res = await fetch(`/api/pages/${id}`);
      const data = await res.json();
      setPageData(data);
    } catch (error) {
      console.error('Sayfa verisi yüklenemedi:', error);
    }
  };

  const addComponent = (type: string) => {
    const newComponent: Component = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      settings: getDefaultSettings(type)
    };

    setPageData({
      ...pageData,
      components: [...pageData.components, newComponent]
    });
    setShowComponentLibrary(false);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'heading':
        return { text: 'Yeni Başlık', level: 'h2' };
      case 'paragraph':
        return { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' };
      case 'image':
        return { src: 'https://via.placeholder.com/800x400', alt: 'Placeholder' };
      case 'button':
        return { text: 'Tıklayın', link: '#', style: 'primary' };
      case 'list':
        return { items: ['Öğe 1', 'Öğe 2', 'Öğe 3'], style: 'bullet' };
      case 'quote':
        return { text: 'Harika bir alıntı', author: 'Yazar Adı' };
      case 'divider':
        return { style: 'solid' };
      case 'spacer':
        return { height: '50px' };
      case 'hero':
        return { 
          title: 'Hero Başlık',
          subtitle: 'Alt başlık metni',
          image: 'https://via.placeholder.com/1920x600',
          button: { text: 'Başla', link: '#' }
        };
      case 'features':
        return {
          items: [
            { title: 'Özellik 1', description: 'Bu özelliğin açıklaması' },
            { title: 'Özellik 2', description: 'Bu özelliğin açıklaması' },
            { title: 'Özellik 3', description: 'Bu özelliğin açıklaması' }
          ]
        };
      default:
        return {};
    }
  };

  const getDefaultSettings = (type: string) => {
    return {
      padding: { top: 20, bottom: 20, left: 0, right: 0 },
      margin: { top: 0, bottom: 20, left: 0, right: 0 },
      background: 'transparent',
      animation: 'none'
    };
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setPageData({
      ...pageData,
      components: pageData.components.map(comp =>
        comp.id === id ? { ...comp, ...updates } : comp
      )
    });
  };

  const deleteComponent = (id: string) => {
    setPageData({
      ...pageData,
      components: pageData.components.filter(comp => comp.id !== id)
    });
    setSelectedComponent(null);
  };

  const moveComponent = (id: string, direction: 'up' | 'down') => {
    const index = pageData.components.findIndex(comp => comp.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === pageData.components.length - 1)
    ) {
      return;
    }

    const newComponents = [...pageData.components];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]];
    
    setPageData({ ...pageData, components: newComponents });
  };

  const savePage = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      const method = id === 'new' ? 'POST' : 'PATCH';
      const url = id === 'new' ? '/api/pages' : `/api/pages/${id}`;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData)
      });

      if (res.ok) {
        setMessage('Sayfa başarıyla kaydedildi!');
        if (id === 'new') {
          const newPage = await res.json();
          window.location.href = `/admin/page-builder/${newPage.id}`;
        }
      } else {
        setMessage('Kaydetme sırasında hata oluştu.');
      }
    } catch (error) {
      console.error('Sayfa kaydedilemedi:', error);
      setMessage('Kaydetme sırasında hata oluştu.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const renderComponent = (component: Component) => {
    switch (component.type) {
      case 'heading':
        const HeadingTag = component.content.level as keyof JSX.IntrinsicElements;
        return <HeadingTag className="font-bold">{component.content.text}</HeadingTag>;
      
      case 'paragraph':
        return <p className="text-gray-700">{component.content.text}</p>;
      
      case 'image':
        return <img src={component.content.src} alt={component.content.alt} className="w-full rounded-lg" />;
      
      case 'button':
        return (
          <button className={`px-6 py-2 rounded-lg ${
            component.content.style === 'primary' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}>
            {component.content.text}
          </button>
        );
      
      case 'list':
        return (
          <ul className={component.content.style === 'bullet' ? 'list-disc pl-5' : 'list-decimal pl-5'}>
            {component.content.items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-primary-500 pl-4 italic">
            <p>"{component.content.text}"</p>
            {component.content.author && <cite className="text-sm text-gray-600">- {component.content.author}</cite>}
          </blockquote>
        );
      
      case 'divider':
        return <hr className="my-4 border-gray-300" />;
      
      case 'spacer':
        return <div style={{ height: component.content.height }} />;
      
      case 'hero':
        return (
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src={component.content.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">{component.content.title}</h1>
                <p className="text-xl mb-4">{component.content.subtitle}</p>
                {component.content.button && (
                  <button className="bg-primary-500 text-white px-6 py-2 rounded-lg">
                    {component.content.button.text}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {component.content.items?.map((item: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        );
      
      default:
        return <div>Bileşen türü desteklenmiyor: {component.type}</div>;
    }
  };

  const categories = ['Tümü', ...Array.from(new Set(componentTypes.map(c => c.category)))];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sol Panel - Bileşen Listesi */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <Link href="/admin/pages" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Sayfalara Dön</span>
          </Link>
          <h2 className="text-xl font-bold">Sayfa Düzenleyici</h2>
        </div>

        <div className="p-4">
          <input
            type="text"
            value={pageData.title}
            onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg mb-4"
            placeholder="Sayfa Başlığı"
          />

          <button
            onClick={() => setShowComponentLibrary(!showComponentLibrary)}
            className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 mb-4 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Bileşen Ekle
          </button>

          {showComponentLibrary && (
            <div className="mb-4 border rounded-lg p-4">
              <div className="mb-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {componentTypes
                  .filter(c => selectedCategory === 'Tümü' || c.category === selectedCategory)
                  .map(comp => {
                    const Icon = comp.icon;
                    return (
                      <button
                        key={comp.id}
                        onClick={() => addComponent(comp.id)}
                        className="p-3 border rounded-lg hover:bg-gray-50 text-left"
                      >
                        <Icon className="w-5 h-5 mb-1 text-primary-500" />
                        <div className="text-sm font-medium">{comp.name}</div>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium text-gray-700 mb-2">Sayfa Bileşenleri</h3>
            {pageData.components.map((component, index) => (
              <div
                key={component.id}
                onClick={() => setSelectedComponent(component.id)}
                className={`p-3 border rounded-lg cursor-pointer ${
                  selectedComponent === component.id ? 'border-primary-500 bg-primary-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">
                      {componentTypes.find(c => c.id === component.type)?.name || component.type}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveComponent(component.id, 'up');
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveComponent(component.id, 'down');
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteComponent(component.id);
                      }}
                      className="p-1 hover:bg-red-100 rounded text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orta Alan - Önizleme */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{pageData.title || 'Başlıksız Sayfa'}</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Settings className="w-5 h-5" />
              </button>
              <Link
                href={`/${pageData.slug}`}
                target="_blank"
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Eye className="w-5 h-5" />
              </Link>
              <button
                onClick={savePage}
                disabled={isSaving}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
              >
                <Save className="w-5 h-5 inline mr-2" />
                {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>

          {message && (
            <div className={`mb-4 p-4 rounded-lg ${
              message.includes('başarı') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {showSettings && (
            <div className="mb-6 p-4 border rounded-lg">
              <h3 className="font-bold mb-4">SEO Ayarları</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Başlığı
                  </label>
                  <input
                    type="text"
                    value={pageData.seo.title}
                    onChange={(e) => setPageData({
                      ...pageData,
                      seo: { ...pageData.seo, title: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Açıklama
                  </label>
                  <textarea
                    value={pageData.seo.description}
                    onChange={(e) => setPageData({
                      ...pageData,
                      seo: { ...pageData.seo, description: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anahtar Kelimeler
                  </label>
                  <input
                    type="text"
                    value={pageData.seo.keywords}
                    onChange={(e) => setPageData({
                      ...pageData,
                      seo: { ...pageData.seo, keywords: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="kelime1, kelime2, kelime3"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {pageData.components.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Plus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Henüz bileşen eklenmedi</p>
                <p className="text-sm">Sol panelden bileşen ekleyerek başlayın</p>
              </div>
            ) : (
              pageData.components.map(component => (
                <div
                  key={component.id}
                  className={`relative group ${
                    selectedComponent === component.id ? 'ring-2 ring-primary-500 rounded-lg p-4' : 'p-4'
                  }`}
                  onClick={() => setSelectedComponent(component.id)}
                >
                  {renderComponent(component)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sağ Panel - Bileşen Ayarları */}
      {selectedComponent && (
        <div className="w-80 bg-white shadow-lg overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Bileşen Ayarları</h3>
              <button
                onClick={() => setSelectedComponent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-4">
            {(() => {
              const component = pageData.components.find(c => c.id === selectedComponent);
              if (!component) return null;

              switch (component.type) {
                case 'heading':
                  return (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Metin
                        </label>
                        <input
                          type="text"
                          value={component.content.text}
                          onChange={(e) => updateComponent(component.id, {
                            content: { ...component.content, text: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Seviye
                        </label>
                        <select
                          value={component.content.level}
                          onChange={(e) => updateComponent(component.id, {
                            content: { ...component.content, level: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg"
                        >
                          <option value="h1">H1</option>
                          <option value="h2">H2</option>
                          <option value="h3">H3</option>
                          <option value="h4">H4</option>
                          <option value="h5">H5</option>
                          <option value="h6">H6</option>
                        </select>
                      </div>
                    </div>
                  );

                case 'paragraph':
                  return (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Metin
                      </label>
                      <textarea
                        value={component.content.text}
                        onChange={(e) => updateComponent(component.id, {
                          content: { ...component.content, text: e.target.value }
                        })}
                        className="w-full px-3 py-2 border rounded-lg"
                        rows={5}
                      />
                    </div>
                  );

                case 'image':
                  return (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Resim URL
                        </label>
                        <input
                          type="text"
                          value={component.content.src}
                          onChange={(e) => updateComponent(component.id, {
                            content: { ...component.content, src: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Alt Metin
                        </label>
                        <input
                          type="text"
                          value={component.content.alt}
                          onChange={(e) => updateComponent(component.id, {
                            content: { ...component.content, alt: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  );

                case 'button':
                  return (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Buton Metni
                        </label>
                        <input
                          type="text"
                          value={component.content.text}
                          onChange={(e) => updateComponent(component.id, {
                            content: { ...component.content, text: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Link
                        </label>
                        <input
                          type="text"
                          value={component.content.link}
                          onChange={(e) => updateComponent(component.id, {
                            content: { ...component.content, link: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stil
                        </label>
                        <select
                          value={component.content.style}
                          onChange={(e) => updateComponent(component.id, {
                            content: { ...component.content, style: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg"
                        >
                          <option value="primary">Birincil</option>
                          <option value="secondary">İkincil</option>
                        </select>
                      </div>
                    </div>
                  );

                default:
                  return <div>Bu bileşen için ayar bulunmuyor</div>;
              }
            })()}
          </div>
        </div>
      )}
    </div>
  );
}