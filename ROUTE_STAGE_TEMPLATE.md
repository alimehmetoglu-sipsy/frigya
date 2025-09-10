# Rota Etap Sayfası Şablonu

## Sayfa Yapısı ve Formatı

Bu döküman, Balkanların Zirveleri rotasındaki her etap için kullanılacak standart sayfa yapısını tanımlar.

---

## 1. HEADER BÖLÜMü (pt-32 pb-8 bg-gradient-to-b from-primary-50 to-white)

### Navigasyon Öğeleri:
- **Geri Dön Linki**: `/rotada` sayfasına (ArrowLeft ikonu ile)
- **Etap Badge**: Etap numarası (Örn: "Etap 1") - primary-600 arka plan
- **Ülke İsmi**: Hangi ülkede (Arnavutluk/Kosova/Karadağ)

### Başlık:
- **Etap Adı**: Büyük başlık (Örn: "Theth - Valbonë")

### İstatistik Kartları (4'lü grid):
1. **Mesafe**: MapPin ikonu, X km
2. **Süre**: Clock ikonu, X saat
3. **Tırmanış**: TrendingUp ikonu, Xm
4. **İniş**: TrendingUp ikonu (rotate-180), Xm

---

## 2. ANA İÇERİK BÖLÜMü (bg-white)

### 2.1 Hero Görsel
```
- Tam genişlik, 384px yükseklik (h-96)
- rounded-2xl köşeler
- Üzerine hafif koyu overlay (bg-black/20)
```

### 2.2 Hızlı Bilgiler Kutusu (bg-blue-50)
```
İçerik (2 sütunlu grid):
- Minimum Yükseklik: X metre
- Maksimum Yükseklik: X metre
- Zorluk Seviyesi: Kolay/Orta/Zor
- İşaretleme: Renk bilgisi
```

### 2.3 Rota Açıklaması (bg-gradient-to-r from-green-50 to-blue-50)
#### Numaralı kartlar ile:
1. **Genel Güzergah** (yeşil numara)
   - Rotanın genel tanımı
   - Başlangıç ve bitiş noktaları
   - Tarihi/kültürel bilgi

2. **Konaklama Seçenekleri** (mavi numara)
   - Konaklama alternatifleri
   - Kamp yerleri
   - Özel notlar (mavi arka planlı)

### 2.4 Detaylı Güzergah (bg-gray-50)
#### Alfabetik işaretli adımlar (A, B, C...):
Her adım için:
- **Başlık**: Lokasyon/Bölüm adı
- **Açıklama**: Detaylı yön tarifi

#### Özel Manzara Kutusu (gradient mavi-yeşil):
- MapPin ikonu ile
- Önemli manzara noktaları

### 2.5 Zorluk Seviyesi (bg-orange-50)
- TrendingUp ikonu
- Zorluk açıklaması
- Dikkat edilecek hususlar listesi

### 2.6 Pratik Bilgiler (bg-blue-50 border)
```
Liste formatında:
- En iyi ziyaret zamanı
- Su kaynakları
- Konaklama seçenekleri
- Yeme-içme olanakları
```

### 2.7 Uyarılar ve Tavsiyeler (bg-amber-50 border)
- AlertCircle ikonu ile
- Güvenlik uyarıları
- Ekipman tavsiyeleri
- Acil durum numaraları

### 2.8 GPS Waypoint'leri (bg-gray-50)
```
Grid yapısında (2 sütun):
- WP numarası
- UTM koordinatları (tıklanabilir Google Maps linki)
- Rakım
- Lokasyon açıklaması
```

### 2.9 Ek Bilgi Kutusu (bg-green-50 border)
Rotaya özel ek bilgiler (örn: İniş detayları)

---

## 3. FOOTER NAVİGASYON

İki buton:
1. **Sol**: "Tüm Etaplara Dön" (btn-secondary)
2. **Sağ**: "Sonraki Etap: [İsim]" (btn-primary)

---

## Renk Kodları ve Stiller

### Arka Plan Renkleri:
- **Header**: bg-gradient-to-b from-primary-50 to-white
- **Hızlı Bilgiler**: bg-blue-50
- **Rota Açıklaması**: bg-gradient-to-r from-green-50 to-blue-50
- **Detaylı Güzergah**: bg-gray-50
- **Zorluk**: bg-orange-50
- **Pratik Bilgiler**: bg-blue-50 + border-blue-200
- **Uyarılar**: bg-amber-50 + border-amber-200
- **GPS**: bg-gray-50
- **Ek Bilgi**: bg-green-50 + border-green-200

### İkon Renkleri:
- Primary ikonlar: text-primary-600
- Zorluk ikonu: text-orange-600
- Uyarı ikonu: text-amber-600

### Text Renkleri:
- Ana başlıklar: text-gray-900
- Alt başlıklar: font-semibold
- Normal metin: text-gray-700
- Özel kutulardaki metinler: Arka plan rengine uyumlu (örn: text-blue-800, text-amber-800)

### Spacing:
- Section padding: pt-32 pb-8 (header), section-padding (içerik)
- Container: max-w-4xl
- Kartlar arası: mb-8
- İç padding: p-6 veya p-8

### Border Radius:
- Büyük kartlar: rounded-2xl
- Orta kartlar: rounded-xl
- Küçük kartlar: rounded-lg
- Badge'ler: rounded-full

---

## Veri Yapısı Örneği

```typescript
interface StageData {
  stageNumber: number;
  country: string;
  title: string;
  stats: {
    distance: string;
    duration: string;
    ascent: string;
    descent: string;
  };
  quickInfo: {
    minAltitude: string;
    maxAltitude: string;
    difficulty: 'Kolay' | 'Orta' | 'Zor';
    marking: string;
  };
  generalRoute: string;
  accommodation: {
    main: string;
    alternative?: string;
  };
  detailedRoute: Array<{
    letter: string;
    title: string;
    description: string;
  }>;
  viewpoint?: {
    title: string;
    description: string;
  };
  difficulty: {
    level: string;
    description: string;
    points: string[];
  };
  practicalInfo: string[];
  warnings: string[];
  waypoints: Array<{
    number: number;
    utm: string;
    lat: number;
    lng: number;
    altitude: string;
    description: string;
  }>;
  additionalInfo?: {
    title: string;
    content: string;
  };
  nextStage: {
    href: string;
    title: string;
  };
}
```

---

## Notlar

1. **Responsive Tasarım**: Tüm grid yapıları md: breakpoint'i kullanır
2. **İkonlar**: Lucide React kütüphanesi kullanılır
3. **Linkler**: Next.js Link komponenti kullanılır
4. **Harita Linkleri**: Google Maps search API'si kullanılır
5. **Görsel**: Unsplash veya özel görseller kullanılabilir

Bu şablon, tüm rota etapları için tutarlı bir kullanıcı deneyimi sağlar.