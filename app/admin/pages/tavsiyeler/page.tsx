'use client';

import { useState } from 'react';
import { Save, Cloud, Shirt, Plane, Shield, Plus, Trash2, Edit2 } from 'lucide-react';

export default function TavsiyelerAdmin() {
  const [content, setContent] = useState({
    categories: [
      {
        icon: 'Cloud',
        title: 'Hava Koşulları ve Gün Işığı',
        content: 'Yürüyüş gezinizi ne zaman gerçekleştirirseniz gerçekleştirin, her gün beklenen hava koşullarının farkında olmak çok önemlidir.',
        tips: [
          'Günlük yürüyüş rotanızı yeterli gün ışığı ile planlayın',
          'Hava durumunu düzenli olarak kontrol edin',
          'Kış aylarında ekstra dikkatli olun'
        ]
      },
      {
        icon: 'Shirt',
        title: 'Giyim ve Ekipman',
        content: 'Sıcak ve kuru bir yürüyüşçü mutlu bir yürüyüşçüdür! Bu nedenle rahat yürüyüş botları ve çoraplar şart.',
        tips: [
          'Katmanlı giyinin',
          'Su geçirmez ekipman şart',
          'Yedek çorap ve eldiven bulundurun',
          'GPS, pusula, ilk yardım kiti taşıyın'
        ]
      },
      {
        icon: 'Plane',
        title: 'Ulaşım',
        content: 'Her üç ülkeye de uçakla kolayca ulaşılabilir.',
        tips: [
          'Havaalanından transferi önceden ayarlayın',
          'Minibüs ve otobüs seçeneklerini araştırın',
          'Yerel turizm ofislerinden bilgi alın'
        ]
      }
    ],
    essentialItems: [
      'Yürüyüş botları ve yedek çoraplar',
      'Su geçirmez ceket ve pantolon',
      'Polar veya yün kazak',
      'Şapka, eldiven ve güneş gözlüğü',
      'GPS cihazı veya akıllı telefon',
      'İlk yardım kiti',
      'Kafa lambası veya el feneri',
      'Yeterli su ve atıştırmalık',
      'Güneş kremi ve dudak koruyucu',
      'Harita ve pusula'
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

  const addCategory = () => {
    setContent({
      ...content,
      categories: [...content.categories, {
        icon: 'Shield',
        title: 'Yeni Kategori',
        content: 'Kategori açıklaması',
        tips: ['İpucu 1']
      }]
    });
  };

  const removeCategory = (index: number) => {
    setContent({
      ...content,
      categories: content.categories.filter((_, i) => i !== index)
    });
  };

  const addTip = (categoryIndex: number) => {
    const newTip = prompt('Yeni ipucu girin:');
    if (newTip) {
      const newCategories = [...content.categories];
      newCategories[categoryIndex].tips.push(newTip);
      setContent({ ...content, categories: newCategories });
    }
  };

  const removeTip = (categoryIndex: number, tipIndex: number) => {
    const newCategories = [...content.categories];
    newCategories[categoryIndex].tips = newCategories[categoryIndex].tips.filter((_, i) => i !== tipIndex);
    setContent({ ...content, categories: newCategories });
  };

  const addEssentialItem = () => {
    const newItem = prompt('Yeni temel ekipman girin:');
    if (newItem) {
      setContent({
        ...content,
        essentialItems: [...content.essentialItems, newItem]
      });
    }
  };

  const removeEssentialItem = (index: number) => {
    setContent({
      ...content,
      essentialItems: content.essentialItems.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Seyahat Tavsiyeleri Yönetimi</h1>
          <p className="text-gray-600 mt-2">Seyahat tavsiyeleri ve önerilerini düzenleyin.</p>
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
        {/* Tavsiye Kategorileri */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tavsiye Kategorileri</h2>
            <button
              onClick={addCategory}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Kategori Ekle</span>
            </button>
          </div>

          <div className="space-y-6">
            {content.categories.map((category, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          İkon (Cloud, Shirt, Plane, Shield)
                        </label>
                        <input
                          type="text"
                          value={category.icon}
                          onChange={(e) => {
                            const newCategories = [...content.categories];
                            newCategories[index].icon = e.target.value;
                            setContent({ ...content, categories: newCategories });
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
                          value={category.title}
                          onChange={(e) => {
                            const newCategories = [...content.categories];
                            newCategories[index].title = e.target.value;
                            setContent({ ...content, categories: newCategories });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Açıklama
                      </label>
                      <textarea
                        value={category.content}
                        onChange={(e) => {
                          const newCategories = [...content.categories];
                          newCategories[index].content = e.target.value;
                          setContent({ ...content, categories: newCategories });
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          İpuçları
                        </label>
                        <button
                          onClick={() => addTip(index)}
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          + İpucu Ekle
                        </button>
                      </div>
                      <div className="space-y-1">
                        {category.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <input
                              type="text"
                              value={tip}
                              onChange={(e) => {
                                const newCategories = [...content.categories];
                                newCategories[index].tips[tipIndex] = e.target.value;
                                setContent({ ...content, categories: newCategories });
                              }}
                              className="flex-1 bg-transparent border-0 focus:ring-0 text-sm"
                            />
                            <button
                              onClick={() => removeTip(index, tipIndex)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCategory(index)}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Temel Ekipman Listesi */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Temel Ekipman Listesi</h2>
            <button
              onClick={addEssentialItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Ekipman Ekle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {content.essentialItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...content.essentialItems];
                    newItems[index] = e.target.value;
                    setContent({ ...content, essentialItems: newItems });
                  }}
                  className="flex-1 bg-transparent border-0 focus:ring-0"
                />
                <button
                  onClick={() => removeEssentialItem(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
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