'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Save } from 'lucide-react';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    category: 'landscape'
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error('Galeri yüklenemedi:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        await fetchGallery();
        setIsAddModalOpen(false);
        setFormData({ src: '', alt: '', category: 'landscape' });
      }
    } catch (error) {
      console.error('Görsel eklenemedi:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return;
    
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        await fetchGallery();
      }
    } catch (error) {
      console.error('Görsel silinemedi:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    const image = images.find(img => img.id === id);
    if (!image) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
      });
      
      if (res.ok) {
        await fetchGallery();
        setEditingId(null);
      }
    } catch (error) {
      console.error('Görsel güncellenemedi:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Galeri Yönetimi</h1>
          <p className="text-gray-600 mt-2">Galeri görsellerini buradan yönetebilirsiniz.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Yeni Görsel Ekle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-48">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => setEditingId(image.id)}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {editingId === image.id ? (
              <div className="p-4 space-y-2">
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => {
                    const updated = images.map(img => 
                      img.id === image.id ? { ...img, alt: e.target.value } : img
                    );
                    setImages(updated);
                  }}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Açıklama"
                />
                <select
                  value={image.category}
                  onChange={(e) => {
                    const updated = images.map(img => 
                      img.id === image.id ? { ...img, category: e.target.value } : img
                    );
                    setImages(updated);
                  }}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="landscape">Manzara</option>
                  <option value="culture">Kültür</option>
                  <option value="trail">Rota</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(image.id)}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <p className="font-medium text-gray-900">{image.alt}</p>
                <p className="text-sm text-gray-500 capitalize">{image.category}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Yeni Görsel Ekle</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Görsel URL
                </label>
                <input
                  type="text"
                  value={formData.src}
                  onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Görsel açıklaması"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="landscape">Manzara</option>
                  <option value="culture">Kültür</option>
                  <option value="trail">Rota</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Ekle
                </button>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}