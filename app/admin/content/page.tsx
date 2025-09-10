'use client';

import { useState, useEffect } from 'react';
import { Save, Edit2 } from 'lucide-react';

export default function ContentAdmin() {
  const [content, setContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      description: '',
      ctaText: 'Rotayı Keşfet',
      ctaLink: '/rota'
    },
    introduction: {
      title: '',
      paragraphs: ['', '', '']
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      if (data) {
        setContent({
          hero: data.hero || content.hero,
          introduction: data.introduction || content.introduction
        });
      }
    } catch (error) {
      console.error('İçerik yüklenemedi:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/data', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'hero',
          data: content.hero
        })
      });
      
      await fetch('/api/data', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'introduction',
          data: content.introduction
        })
      });
      
      if (res.ok) {
        setMessage('İçerik başarıyla kaydedildi!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Kaydetme sırasında hata oluştu.');
      }
    } catch (error) {
      console.error('İçerik kaydedilemedi:', error);
      setMessage('Kaydetme sırasında hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İçerik Yönetimi</h1>
          <p className="text-gray-600 mt-2">Ana sayfa içeriklerini buradan düzenleyebilirsiniz.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? 'Kaydediliyor...' : 'Kaydet'}</span>
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('başarı') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Edit2 className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Hero Bölümü</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Başlık
              </label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Başlık
              </label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, subtitle: e.target.value }
                })}
                rows={2}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Açıklama
              </label>
              <textarea
                value={content.hero.description}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, description: e.target.value }
                })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Edit2 className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Tanıtım Bölümü</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Başlık
              </label>
              <input
                type="text"
                value={content.introduction.title}
                onChange={(e) => setContent({
                  ...content,
                  introduction: { ...content.introduction, title: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            {content.introduction.paragraphs.map((para, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paragraf {index + 1}
                </label>
                <textarea
                  value={para}
                  onChange={(e) => {
                    const newParagraphs = [...content.introduction.paragraphs];
                    newParagraphs[index] = e.target.value;
                    setContent({
                      ...content,
                      introduction: { ...content.introduction, paragraphs: newParagraphs }
                    });
                  }}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}