'use client';

import { useState } from 'react';
import { Save, Download, Phone, Globe, Plus, Trash2, Edit2 } from 'lucide-react';

export default function KaynaklarAdmin() {
  const [content, setContent] = useState({
    downloads: [
      {
        title: 'Balkanların Zirveleri Resmi Rehberi',
        description: 'Rotanın tüm etaplarını içeren detaylı PDF rehber',
        type: 'PDF',
        size: '15 MB',
        url: '#'
      },
      {
        title: 'GPS Rota Dosyaları',
        description: 'GPX formatında tüm rota verileri',
        type: 'GPX',
        size: '2 MB',
        url: '#'
      },
      {
        title: 'Konaklama Rehberi',
        description: 'Tüm konaklama noktalarının detaylı listesi',
        type: 'PDF',
        size: '5 MB',
        url: '#'
      }
    ],
    contacts: [
      {
        country: 'Arnavutluk',
        organizations: [
          { name: 'Albanian Tourism Organization', phone: '+355 4 2234 567', email: 'info@albania-tourism.al' },
          { name: 'Theth National Park', phone: '+355 68 2234 567', email: 'theth@parks.al' }
        ]
      },
      {
        country: 'Kosova',
        organizations: [
          { name: 'Kosovo Tourism Board', phone: '+383 38 200 200', email: 'info@kosovotourism.xk' },
          { name: 'Peja Tourist Information', phone: '+383 39 432 100', email: 'visit@peja.xk' }
        ]
      },
      {
        country: 'Karadağ',
        organizations: [
          { name: 'Montenegro Tourism Organization', phone: '+382 20 665 200', email: 'info@montenegro.travel' },
          { name: 'Plav Tourist Center', phone: '+382 51 251 100', email: 'tourism@plav.me' }
        ]
      }
    ],
    links: [
      {
        category: 'Haritalar ve Navigasyon',
        links: [
          { name: 'OpenStreetMap - Balkanlar', url: '#' },
          { name: 'Rota GPX İndirmeleri', url: '#' },
          { name: 'Çevrimdışı Harita Uygulamaları', url: '#' }
        ]
      },
      {
        category: 'Hava Durumu',
        links: [
          { name: 'Mountain Weather Balkans', url: '#' },
          { name: '7 Günlük Tahmin', url: '#' },
          { name: 'Canlı Web Kameraları', url: '#' }
        ]
      }
    ]
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    
    setTimeout(() => {
      setMessage('İçerik başarıyla kaydedildi!');
      setIsSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const addDownload = () => {
    setContent({
      ...content,
      downloads: [...content.downloads, {
        title: 'Yeni Dosya',
        description: 'Dosya açıklaması',
        type: 'PDF',
        size: '1 MB',
        url: '#'
      }]
    });
  };

  const removeDownload = (index: number) => {
    setContent({
      ...content,
      downloads: content.downloads.filter((_, i) => i !== index)
    });
  };

  const addOrganization = (countryIndex: number) => {
    const newOrg = {
      name: 'Yeni Organizasyon',
      phone: '+90 000 000 0000',
      email: 'email@example.com'
    };
    const newContacts = [...content.contacts];
    newContacts[countryIndex].organizations.push(newOrg);
    setContent({ ...content, contacts: newContacts });
  };

  const removeOrganization = (countryIndex: number, orgIndex: number) => {
    const newContacts = [...content.contacts];
    newContacts[countryIndex].organizations = newContacts[countryIndex].organizations.filter((_, i) => i !== orgIndex);
    setContent({ ...content, contacts: newContacts });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kaynaklar Yönetimi</h1>
          <p className="text-gray-600 mt-2">İndirilebilir dosyalar, iletişim bilgileri ve faydalı bağlantıları yönetin.</p>
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
        {/* İndirilebilir Dosyalar */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">İndirilebilir Dosyalar</h2>
            <button
              onClick={addDownload}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Dosya Ekle</span>
            </button>
          </div>

          <div className="space-y-4">
            {content.downloads.map((download, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Başlık</label>
                      <input
                        type="text"
                        value={download.title}
                        onChange={(e) => {
                          const newDownloads = [...content.downloads];
                          newDownloads[index].title = e.target.value;
                          setContent({ ...content, downloads: newDownloads });
                        }}
                        className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Açıklama</label>
                      <input
                        type="text"
                        value={download.description}
                        onChange={(e) => {
                          const newDownloads = [...content.downloads];
                          newDownloads[index].description = e.target.value;
                          setContent({ ...content, downloads: newDownloads });
                        }}
                        className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Tip</label>
                      <select
                        value={download.type}
                        onChange={(e) => {
                          const newDownloads = [...content.downloads];
                          newDownloads[index].type = e.target.value;
                          setContent({ ...content, downloads: newDownloads });
                        }}
                        className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="PDF">PDF</option>
                        <option value="GPX">GPX</option>
                        <option value="DOC">DOC</option>
                        <option value="ZIP">ZIP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Boyut</label>
                      <input
                        type="text"
                        value={download.size}
                        onChange={(e) => {
                          const newDownloads = [...content.downloads];
                          newDownloads[index].size = e.target.value;
                          setContent({ ...content, downloads: newDownloads });
                        }}
                        className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeDownload(index)}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Dosya URL</label>
                  <input
                    type="text"
                    value={download.url}
                    onChange={(e) => {
                      const newDownloads = [...content.downloads];
                      newDownloads[index].url = e.target.value;
                      setContent({ ...content, downloads: newDownloads });
                    }}
                    className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary-500"
                    placeholder="https://..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
          
          <div className="space-y-6">
            {content.contacts.map((country, countryIndex) => (
              <div key={countryIndex} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">{country.country}</h3>
                  <button
                    onClick={() => addOrganization(countryIndex)}
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    + Organizasyon Ekle
                  </button>
                </div>
                
                <div className="space-y-3">
                  {country.organizations.map((org, orgIndex) => (
                    <div key={orgIndex} className="bg-gray-50 rounded p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">İsim</label>
                            <input
                              type="text"
                              value={org.name}
                              onChange={(e) => {
                                const newContacts = [...content.contacts];
                                newContacts[countryIndex].organizations[orgIndex].name = e.target.value;
                                setContent({ ...content, contacts: newContacts });
                              }}
                              className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Telefon</label>
                            <input
                              type="text"
                              value={org.phone}
                              onChange={(e) => {
                                const newContacts = [...content.contacts];
                                newContacts[countryIndex].organizations[orgIndex].phone = e.target.value;
                                setContent({ ...content, contacts: newContacts });
                              }}
                              className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">E-posta</label>
                            <input
                              type="email"
                              value={org.email}
                              onChange={(e) => {
                                const newContacts = [...content.contacts];
                                newContacts[countryIndex].organizations[orgIndex].email = e.target.value;
                                setContent({ ...content, contacts: newContacts });
                              }}
                              className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeOrganization(countryIndex, orgIndex)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}