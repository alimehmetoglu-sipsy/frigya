'use client';

import { useState } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Key, User, Bell, Shield } from 'lucide-react';

export default function SettingsAdmin() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [settings, setSettings] = useState({
    general: {
      siteName: 'Balkanların Zirveleri',
      tagline: 'Arnavutluk, Kosova ve Karadağ\'da Unutulmaz Trekking Deneyimi',
      email: 'info@peaksofthebalkans.com',
      phone: '+383 49 123 456',
      address: 'Pejë, Kosova',
      language: 'tr'
    },
    social: {
      facebook: 'https://facebook.com/peaksofthebalkan',
      instagram: 'https://instagram.com/peaksofthebalkans',
      twitter: 'https://twitter.com/peaksofthebalka',
      youtube: 'https://youtube.com/@peaksofthebalkans'
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    notifications: {
      emailNotifications: true,
      newMessages: true,
      systemUpdates: false,
      weeklyReport: true
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    
    // Simüle edilmiş kaydetme
    setTimeout(() => {
      setMessage('Ayarlar başarıyla kaydedildi!');
      setIsSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'Genel Ayarlar', icon: Globe },
    { id: 'social', label: 'Sosyal Medya', icon: Facebook },
    { id: 'security', label: 'Güvenlik', icon: Shield },
    { id: 'notifications', label: 'Bildirimler', icon: Bell }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600 mt-2">Site ayarlarını ve tercihlerinizi yönetin.</p>
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

      <div className="bg-white rounded-lg shadow">
        {/* Tab Navigation */}
        <div className="border-b">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Adı
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteName: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Sloganı
                  </label>
                  <input
                    type="text"
                    value={settings.general.tagline}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, tagline: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={settings.general.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, email: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={settings.general.phone}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, phone: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Adres
                  </label>
                  <input
                    type="text"
                    value={settings.general.address}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, address: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Dil
                  </label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, language: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Facebook className="w-4 h-4 inline mr-1" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={settings.social.facebook}
                    onChange={(e) => setSettings({
                      ...settings,
                      social: { ...settings.social, facebook: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Instagram className="w-4 h-4 inline mr-1" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={settings.social.instagram}
                    onChange={(e) => setSettings({
                      ...settings,
                      social: { ...settings.social, instagram: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Twitter className="w-4 h-4 inline mr-1" />
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={settings.social.twitter}
                    onChange={(e) => setSettings({
                      ...settings,
                      social: { ...settings.social, twitter: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Youtube className="w-4 h-4 inline mr-1" />
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={settings.social.youtube}
                    onChange={(e) => setSettings({
                      ...settings,
                      social: { ...settings.social, youtube: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 max-w-md">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Not:</strong> Şifrenizi değiştirmek için mevcut şifrenizi girmeniz gerekmektedir.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Key className="w-4 h-4 inline mr-1" />
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  value={settings.security.currentPassword}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, currentPassword: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Key className="w-4 h-4 inline mr-1" />
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  value={settings.security.newPassword}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, newPassword: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">En az 8 karakter, büyük/küçük harf ve rakam içermelidir.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Key className="w-4 h-4 inline mr-1" />
                  Yeni Şifre (Tekrar)
                </label>
                <input
                  type="password"
                  value={settings.security.confirmPassword}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, confirmPassword: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">E-posta Bildirimleri</p>
                      <p className="text-sm text-gray-500">Tüm e-posta bildirimlerini etkinleştir</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                    })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
                
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Yeni Mesajlar</p>
                      <p className="text-sm text-gray-500">Yeni mesaj geldiğinde bildirim al</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.newMessages}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, newMessages: e.target.checked }
                    })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
                
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Sistem Güncellemeleri</p>
                      <p className="text-sm text-gray-500">Önemli sistem güncellemelerinden haberdar ol</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.systemUpdates}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, systemUpdates: e.target.checked }
                    })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
                
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Haftalık Rapor</p>
                      <p className="text-sm text-gray-500">Her hafta site istatistiklerini e-posta ile al</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.weeklyReport}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, weeklyReport: e.target.checked }
                    })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}