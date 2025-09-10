'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  Users, 
  Settings,
  ArrowLeft,
  Mountain,
  LogOut,
  Map,
  Info,
  AlertTriangle,
  BookOpen
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = sessionStorage.getItem('adminUser');
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const menuItems = [
    { href: '/admin', label: 'Ana Panel', icon: LayoutDashboard },
    { href: '/admin/pages', label: 'Sayfa Yönetimi', icon: FileText },
    { href: '/admin/gallery', label: 'Galeri Yönetimi', icon: Image },
    { href: '/admin/content', label: 'Ana Sayfa İçeriği', icon: FileText },
    { href: '/admin/pages/rota', label: 'Rota Açıklaması', icon: Map },
    { href: '/admin/pages/rotada', label: 'Rotada Sayfası', icon: Info },
    { href: '/admin/pages/tavsiyeler', label: 'Seyahat Tavsiyeleri', icon: AlertTriangle },
    { href: '/admin/pages/kaynaklar', label: 'Kaynaklar', icon: BookOpen },
    { href: '/admin/messages', label: 'Mesajlar', icon: Users },
    { href: '/admin/settings', label: 'Ayarlar', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Mountain className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-xs text-gray-400">Balkanların Zirveleri</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-600 text-white' 
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-700">
          {username && (
            <div className="px-4 py-2 mb-3">
              <p className="text-xs text-gray-400">Hoş geldin,</p>
              <p className="font-medium">{username}</p>
            </div>
          )}
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Siteye Dön</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-900 text-gray-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>
    </div>
  );
}