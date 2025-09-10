'use client';

import { useState, useEffect } from 'react';
import { Save, Map, Mountain, Clock, Activity, Plus, Trash2 } from 'lucide-react';

export default function RotaAdmin() {
  const [content, setContent] = useState({
    subtitle: '192 km\'lik efsanevi yürüyüş rotası',
    description: 'Oldukça iddialı "Balkanların Zirveleri" rotası 192 km\'lik bir mesafeyi kapsar ve üç ülkeyi geçerek bir döngü tamamlar.',
    stats: {
      distance: '192 km',
      duration: '10-13 gün',
      countries: '3 ülke',
      maxAltitude: '2,300 m'
    },
    stages: [
      'Theth, Arnavutluk',
      'Valbonë, Arnavutluk',
      'Çerem, Arnavutluk',
      'Dobërdol, Arnavutluk',
      'Milishevc, Kosova',
      'Reka e Allagës, Kosova',
      'Liqinat i Kuçishtës, Kosova',
      'Babino Polje, Karadağ',
      'Plav, Karadağ',
      'Vusanje, Karadağ'
    ],
    technicalDetails: {
      minAltitude: '670 metre',
      maxAltitude: '2,290 metre',
      totalAscent: '9,800 metre',
      totalDescent: '9,900 metre'
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [newStage, setNewStage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      if (data && data.route) {
        setContent({
          subtitle: data.route.subtitle || content.subtitle,
          description: data.route.description || content.description,
          stats: data.route.stats || content.stats,
          stages: data.route.stages || content.stages,
          technicalDetails: data.route.technicalDetails || content.technicalDetails
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
          section: 'route',
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

  const addStage = () => {
    if (newStage.trim()) {
      setContent({
        ...content,
        stages: [...content.stages, newStage.trim()]
      });
      setNewStage('');
    }
  };

  const removeStage = (index: number) => {
    setContent({
      ...content,
      stages: content.stages.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rota Açıklaması Yönetimi</h1>
          <p className="text-gray-600 mt-2">Rota sayfasının içeriklerini buradan düzenleyebilirsiniz.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sol Kolon - Genel Bilgiler */}
        <div className="space-y-6">
          {/* Başlık ve Açıklama */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Genel Bilgiler</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sayfa Alt Başlığı
                </label>
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ana Açıklama
                </label>
                <textarea
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı İstatistikler</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mountain className="w-4 h-4 inline mr-1" />
                  Toplam Mesafe
                </label>
                <input
                  type="text"
                  value={content.stats.distance}
                  onChange={(e) => setContent({
                    ...content,
                    stats: { ...content.stats, distance: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Süre
                </label>
                <input
                  type="text"
                  value={content.stats.duration}
                  onChange={(e) => setContent({
                    ...content,
                    stats: { ...content.stats, duration: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Map className="w-4 h-4 inline mr-1" />
                  Ülkeler
                </label>
                <input
                  type="text"
                  value={content.stats.countries}
                  onChange={(e) => setContent({
                    ...content,
                    stats: { ...content.stats, countries: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Activity className="w-4 h-4 inline mr-1" />
                  Max Yükseklik
                </label>
                <input
                  type="text"
                  value={content.stats.maxAltitude}
                  onChange={(e) => setContent({
                    ...content,
                    stats: { ...content.stats, maxAltitude: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Etaplar ve Teknik Detaylar */}
        <div className="space-y-6">
          {/* Konaklama Noktaları */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Konaklama Noktaları</h2>
            
            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
              {content.stages.map((stage, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">
                    <span className="font-medium text-primary-600">{index + 1}.</span> {stage}
                  </span>
                  <button
                    onClick={() => removeStage(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={newStage}
                onChange={(e) => setNewStage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addStage()}
                placeholder="Yeni konaklama noktası ekle"
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={addStage}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Teknik Detaylar */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Teknik Detaylar</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Yükseklik
                </label>
                <input
                  type="text"
                  value={content.technicalDetails.minAltitude}
                  onChange={(e) => setContent({
                    ...content,
                    technicalDetails: { ...content.technicalDetails, minAltitude: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maksimum Yükseklik
                </label>
                <input
                  type="text"
                  value={content.technicalDetails.maxAltitude}
                  onChange={(e) => setContent({
                    ...content,
                    technicalDetails: { ...content.technicalDetails, maxAltitude: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Toplam Tırmanış
                </label>
                <input
                  type="text"
                  value={content.technicalDetails.totalAscent}
                  onChange={(e) => setContent({
                    ...content,
                    technicalDetails: { ...content.technicalDetails, totalAscent: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Toplam İniş
                </label>
                <input
                  type="text"
                  value={content.technicalDetails.totalDescent}
                  onChange={(e) => setContent({
                    ...content,
                    technicalDetails: { ...content.technicalDetails, totalDescent: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}