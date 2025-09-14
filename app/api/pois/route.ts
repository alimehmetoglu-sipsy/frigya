import { NextResponse } from 'next/server';

interface PointOfInterest {
  id: string;
  name: string;
  type: 'historical' | 'natural' | 'cultural' | 'archaeological';
  province: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  description: string;
  significance: string;
  period?: string;
}

const pointsOfInterest: PointOfInterest[] = [
  {
    id: 'poi-1',
    name: 'Yazılıkaya (Midas Kenti)',
    type: 'archaeological',
    province: 'Eskişehir',
    coordinates: { lat: 39.0297, lng: 30.5976 },
    description: 'Frig Krallığı\'nın en önemli kült merkezi ve Kral Midas\'ın anıtsal kaya mezarı.',
    significance: 'UNESCO Dünya Mirası Geçici Listesi\'nde yer alan, M.Ö. 8. yüzyıla tarihlenen anıtsal yapı.',
    period: 'M.Ö. 8. yüzyıl'
  },
  {
    id: 'poi-2',
    name: 'Gordion (Yassıhöyük)',
    type: 'archaeological',
    province: 'Ankara',
    coordinates: { lat: 39.6544, lng: 31.9889 },
    description: 'Frig Krallığı\'nın başkenti ve Kral Midas\'ın mezarının bulunduğu antik kent.',
    significance: 'Anadolu\'nun en önemli arkeolojik alanlarından biri, Gordion Düğümü efsanesinin merkezi.',
    period: 'M.Ö. 12. yüzyıl - M.S. 7. yüzyıl'
  },
  {
    id: 'poi-3',
    name: 'Aizanoi Antik Kenti',
    type: 'archaeological',
    province: 'Kütahya',
    coordinates: { lat: 39.1958, lng: 29.6275 },
    description: 'Anadolu\'nun en iyi korunmuş Zeus Tapınağı ve antik tiyatrosu ile ünlü Roma kenti.',
    significance: 'UNESCO Dünya Mirası Listesi\'nde, Roma dönemi mimarisinin en güzel örneklerinden.',
    period: 'M.Ö. 3. yüzyıl - M.S. 7. yüzyıl'
  },
  {
    id: 'poi-4',
    name: 'Ayazini Köyü',
    type: 'historical',
    province: 'Afyonkarahisar',
    coordinates: { lat: 39.0233, lng: 30.5444 },
    description: 'Frig dönemine ait kaya yerleşimleri, kiliseler ve mezar odaları.',
    significance: 'Frig, Roma ve Bizans dönemlerinden kalma çok katmanlı tarihi yerleşim.',
    period: 'M.Ö. 8. yüzyıl - M.S. 11. yüzyıl'
  },
  {
    id: 'poi-5',
    name: 'Seyit Battal Gazi Külliyesi',
    type: 'cultural',
    province: 'Eskişehir',
    coordinates: { lat: 39.4547, lng: 30.8789 },
    description: 'Anadolu\'nun önemli ziyaret yerlerinden biri olan tarihi külliye.',
    significance: 'Selçuklu ve Osmanlı mimarisinin güzel örnekleri, halk inançlarında önemli yer.',
    period: '13. yüzyıl'
  },
  {
    id: 'poi-6',
    name: 'Döğer Kaya Anıtları',
    type: 'archaeological',
    province: 'Afyonkarahisar',
    coordinates: { lat: 39.0456, lng: 30.4567 },
    description: 'Frig dönemine ait kaya mezarları, anıt mezarlar ve kült alanları.',
    significance: 'Frig kaya sanatının en güzel örnekleri, aslan kabartmaları ile ünlü.',
    period: 'M.Ö. 7-6. yüzyıl'
  },
  {
    id: 'poi-7',
    name: 'Dumlupınar Zafer Anıtı',
    type: 'historical',
    province: 'Kütahya',
    coordinates: { lat: 38.8647, lng: 29.8947 },
    description: 'Kurtuluş Savaşı\'nın dönüm noktası olan Büyük Taarruz\'un anıtı.',
    significance: 'Türkiye Cumhuriyeti\'nin kuruluşunda kritik öneme sahip zafer alanı.',
    period: '1924 (anıt), 1922 (savaş)'
  },
  {
    id: 'poi-8',
    name: 'Bayat Kalesi',
    type: 'historical',
    province: 'Afyonkarahisar',
    coordinates: { lat: 39.1234, lng: 30.3456 },
    description: 'Orta Çağ\'dan kalma, stratejik konumu ile önemli kale yapısı.',
    significance: 'Selçuklu ve Osmanlı dönemlerinde önemli savunma noktası.',
    period: '11-15. yüzyıl'
  },
  {
    id: 'poi-9',
    name: 'İnönü Savaşları Anıtı',
    type: 'historical',
    province: 'Eskişehir',
    coordinates: { lat: 39.8164, lng: 30.1506 },
    description: 'Kurtuluş Savaşı\'nda kazanılan İnönü Zaferlerinin anıt alanı.',
    significance: 'Türk İstiklal Savaşı\'nın ilk önemli zaferleri.',
    period: '1921'
  },
  {
    id: 'poi-10',
    name: 'Frig Vadisi Tabiat Parkı',
    type: 'natural',
    province: 'Afyonkarahisar-Eskişehir',
    coordinates: { lat: 39.0500, lng: 30.5500 },
    description: 'Peribacaları, kanyonlar ve endemik bitki örtüsü ile doğa harikası.',
    significance: 'Jeolojik oluşumları ve biyolojik çeşitliliği ile korunan doğal alan.',
    period: 'Jeolojik'
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const province = searchParams.get('province');

    let filteredPOIs = [...pointsOfInterest];

    if (type && ['historical', 'natural', 'cultural', 'archaeological'].includes(type)) {
      filteredPOIs = filteredPOIs.filter(poi => poi.type === type);
    }

    if (province) {
      filteredPOIs = filteredPOIs.filter(poi =>
        poi.province.toLowerCase().includes(province.toLowerCase())
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: filteredPOIs,
        total: filteredPOIs.length,
        filters: {
          type: type || 'all',
          province: province || 'all'
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('POIs fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch points of interest'
      },
      { status: 500 }
    );
  }
}