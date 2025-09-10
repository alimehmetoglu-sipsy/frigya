'use client';

import { useState, useEffect } from 'react';
import { Save, Home, Utensils, Map, AlertTriangle, Plus, Trash2, Edit2 } from 'lucide-react';

export default function RotadaAdmin() {
  const [content, setContent] = useState({
    services: [
      {
        icon: 'Home',
        title: 'Konaklama',
        description: 'Bölge, sakinlerinin misafirperverliği ile tanınır. Ziyaretçiler, her üç ülkede de rota boyunca bulunan geleneksel evlerde konaklayabilirler.'
      },
      {
        icon: 'Utensils',
        title: 'Yiyecek ve İçecek',
        description: 'Rota kısmen ıssız dağlık bölgelerden geçtiği için yanınızda her zaman yeterli miktarda su ve yiyecek bulundurmanız tavsiye edilir.'
      },
      {
        icon: 'Map',
        title: 'İşaretleme ve Yönlendirme',
        description: 'Balkanların Zirveleri rotasının tamamı, rota boyunca özel işaretleme sistemleri ile işaretlenmiştir.'
      }
    ],
    markings: [
      { country: 'Arnavutluk', colors: 'Beyaz/Kırmızı/Beyaz' },
      { country: 'Kosova', colors: 'Kırmızı/Beyaz/Kırmızı' },
      { country: 'Karadağ', colors: 'Kırmızı daire/Beyaz dolgu' }
    ],
    warnings: [
      'Mümkün olduğunda, kalacak yer garantilemek için önceden rezervasyon yapmanız önemle tavsiye edilir.',
      'Rotanın tamamı işaretlenmiş olsa da, kısmen ıssız dağ bölgelerinden geçer.',
      'Rota boyunca çok az çöp toplama tesisi bulunduğunu unutmayın.'
    ]
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingType, setEditingType] = useState<string>('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      if (data && data.onTrail) {
        setContent(data.onTrail);
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
          section: 'onTrail',
          data: content
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

  const addService = () => {
    setContent({
      ...content,
      services: [...content.services, {
        icon: 'Home',
        title: 'Yeni Hizmet',
        description: 'Hizmet açıklaması'
      }]
    });
  };

  const removeService = (index: number) => {
    setContent({
      ...content,
      services: content.services.filter((_, i) => i !== index)
    });
  };

  const addWarning = () => {
    const newWarning = prompt('Yeni uyarı metni girin:');
    if (newWarning) {
      setContent({
        ...content,
        warnings: [...content.warnings, newWarning]
      });
    }
  };

  const removeWarning = (index: number) => {
    setContent({
      ...content,
      warnings: content.warnings.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rotada Sayfası Yönetimi</h1>
          <p className="text-gray-600 mt-2">Rota üzerindeki hizmetler ve bilgileri düzenleyin.</p>
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
        {/* Hizmetler */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Rota Üzerindeki Hizmetler</h2>
            <button
              onClick={addService}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Hizmet Ekle</span>
            </button>
          </div>

          <div className="space-y-4">
            {content.services.map((service, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          İkon (Home, Utensils, Map)
                        </label>
                        <input
                          type="text"
                          value={service.icon}
                          onChange={(e) => {
                            const newServices = [...content.services];
                            newServices[index].icon = e.target.value;
                            setContent({ ...content, services: newServices });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Başlık
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const newServices = [...content.services];
                            newServices[index].title = e.target.value;
                            setContent({ ...content, services: newServices });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Açıklama
                      </label>
                      <textarea
                        value={service.description}
                        onChange={(e) => {
                          const newServices = [...content.services];
                          newServices[index].description = e.target.value;
                          setContent({ ...content, services: newServices });
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeService(index)}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* İşaretleme Sistemleri */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">İşaretleme Sistemleri</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.markings.map((marking, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ülke
                  </label>
                  <input
                    type="text"
                    value={marking.country}
                    onChange={(e) => {
                      const newMarkings = [...content.markings];
                      newMarkings[index].country = e.target.value;
                      setContent({ ...content, markings: newMarkings });
                    }}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 mb-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Renkler
                  </label>
                  <input
                    type="text"
                    value={marking.colors}
                    onChange={(e) => {
                      const newMarkings = [...content.markings];
                      newMarkings[index].colors = e.target.value;
                      setContent({ ...content, markings: newMarkings });
                    }}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Önemli Uyarılar */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Önemli Uyarılar</h2>
            <button
              onClick={addWarning}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Uyarı Ekle</span>
            </button>
          </div>

          <div className="space-y-2">
            {content.warnings.map((warning, index) => (
              <div key={index} className="flex items-start justify-between bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start flex-1">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                  <input
                    type="text"
                    value={warning}
                    onChange={(e) => {
                      const newWarnings = [...content.warnings];
                      newWarnings[index] = e.target.value;
                      setContent({ ...content, warnings: newWarnings });
                    }}
                    className="flex-1 bg-transparent border-0 focus:ring-0 text-gray-700"
                  />
                </div>
                <button
                  onClick={() => removeWarning(index)}
                  className="ml-3 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}