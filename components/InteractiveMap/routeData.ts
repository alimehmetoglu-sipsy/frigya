export interface RouteMarker {
  name: string;
  lat: number;
  lng: number;
  elevation?: number;
  description?: string;
}

export interface RouteInfo {
  name: string;
  distance: string;
  difficulty: string;
  description: string;
  color: string;
  coordinates: number[][];
  markers: RouteMarker[];
}

export const routeData: Record<string, RouteInfo> = {
  gordion: {
    name: 'Gordion Rotası',
    distance: '219 km',
    difficulty: 'Zor',
    description: 'Seydiler\'den başlayıp Gordion\'da biten ana Frig Yolu rotası. Antik Frig Krallığı\'nın başkentine uzanan tarihi yolculuk.',
    color: '#FF6B6B',
    coordinates: [
      [30.4556, 39.0233], // Seydiler
      [30.4567, 39.0456], // Döğer
      [30.4890, 39.0678], // İhsaniye
      [30.5444, 39.0233], // Ayazini
      [30.5976, 39.0297], // Yazılıkaya (Midas)
      [30.8789, 39.4547], // Seyitgazi
      [30.1506, 39.8164], // İnönü
      [29.9833, 39.4169], // Kütahya
      [29.6275, 39.1958], // Çavdarhisar (Aizanoi)
      [29.8947, 38.8647], // Dumlupınar
      [31.9889, 39.6544]  // Gordion
    ],
    markers: [
      { name: 'Seydiler Başlangıç Noktası', lat: 39.0233, lng: 30.4556, elevation: 950, description: 'Frig Yolu\'nun başlangıç köyü' },
      { name: 'Döğer Kaya Anıtları', lat: 39.0456, lng: 30.4567, elevation: 1050, description: 'Frig dönemine ait kaya mezarları ve anıtlar' },
      { name: 'İhsaniye Termal', lat: 39.0678, lng: 30.4890, elevation: 920, description: 'Termal kaynakları ile ünlü dinlenme noktası' },
      { name: 'Ayazini Köyü', lat: 39.0233, lng: 30.5444, elevation: 1100, description: 'Frig Vadisi\'nin merkezi, kaya kiliseleri' },
      { name: 'Yazılıkaya (Midas Kenti)', lat: 39.0297, lng: 30.5976, elevation: 1200, description: 'Kral Midas\'ın anıtsal kaya mezarı' },
      { name: 'Seyitgazi', lat: 39.4547, lng: 30.8789, elevation: 980, description: 'Seyit Battal Gazi Külliyesi' },
      { name: 'İnönü', lat: 39.8164, lng: 30.1506, elevation: 850, description: 'Kurtuluş Savaşı\'nın önemli noktası' },
      { name: 'Kütahya', lat: 39.4169, lng: 29.9833, elevation: 970, description: 'Çini sanatının başkenti' },
      { name: 'Aizanoi Antik Kenti', lat: 39.1958, lng: 29.6275, elevation: 1000, description: 'Zeus Tapınağı ile ünlü antik kent' },
      { name: 'Dumlupınar Zafer Anıtı', lat: 38.8647, lng: 29.8947, elevation: 1100, description: '30 Ağustos Zafer Anıtı' },
      { name: 'Gordion (Yassıhöyük)', lat: 39.6544, lng: 31.9889, elevation: 690, description: 'Frig Krallığı\'nın başkenti, Kral Midas\'ın mezarı' }
    ]
  },
  seydiler: {
    name: 'Seydiler-Ayazini Rotası',
    distance: '65 km',
    difficulty: 'Orta',
    description: 'Seydiler\'den başlayıp Ayazini\'de biten, Frig Vadisi\'ni kapsayan orta zorlukta rota.',
    color: '#4ECDC4',
    coordinates: [
      [30.4556, 39.0233], // Seydiler
      [30.4567, 39.0456], // Döğer
      [30.4890, 39.0678], // İhsaniye
      [30.5444, 39.0233], // Ayazini
      [30.5976, 39.0297]  // Yazılıkaya
    ],
    markers: [
      { name: 'Seydiler', lat: 39.0233, lng: 30.4556, elevation: 950 },
      { name: 'Döğer', lat: 39.0456, lng: 30.4567, elevation: 1050 },
      { name: 'İhsaniye', lat: 39.0678, lng: 30.4890, elevation: 920 },
      { name: 'Ayazini', lat: 39.0233, lng: 30.5444, elevation: 1100 },
      { name: 'Yazılıkaya', lat: 39.0297, lng: 30.5976, elevation: 1200 }
    ]
  },
  yenice: {
    name: 'Yenice Ormanları Rotası',
    distance: '147 km',
    difficulty: 'Kolay',
    description: 'Kütahya çevresindeki yenice ormanlarını kapsayan doğa rotası.',
    color: '#95E77E',
    coordinates: [
      [29.9833, 39.4169], // Kütahya merkez
      [29.8500, 39.4500], // Yenice ormanları girişi
      [29.7200, 39.5200], // Orman içi rota
      [29.6275, 39.1958], // Çavdarhisar
      [29.8947, 38.8647]  // Dumlupınar
    ],
    markers: [
      { name: 'Kütahya Merkez', lat: 39.4169, lng: 29.9833, elevation: 970 },
      { name: 'Yenice Ormanları Girişi', lat: 39.4500, lng: 29.8500, elevation: 1100 },
      { name: 'Orman İçi Kamp Alanı', lat: 39.5200, lng: 29.7200, elevation: 1250 },
      { name: 'Çavdarhisar', lat: 39.1958, lng: 29.6275, elevation: 1000 },
      { name: 'Dumlupınar', lat: 38.8647, lng: 29.8947, elevation: 1100 }
    ]
  },
  frigValley: {
    name: 'Frig Vadisi Turu',
    distance: '15 km',
    difficulty: 'Kolay',
    description: 'Ayazini merkezli günübirlik Frig Vadisi doğa yürüyüşü.',
    color: '#FFD93D',
    coordinates: [
      [30.5444, 39.0233], // Ayazini başlangıç
      [30.5500, 39.0350], // Vadi içi 1
      [30.5600, 39.0450], // Vadi içi 2
      [30.5550, 39.0500], // Tabiat parkı merkezi
      [30.5450, 39.0400], // Dönüş rotası
      [30.5444, 39.0233]  // Ayazini bitiş
    ],
    markers: [
      { name: 'Ayazini Başlangıç', lat: 39.0233, lng: 30.5444, elevation: 1100 },
      { name: 'Kaya Kiliseleri', lat: 39.0350, lng: 30.5500, elevation: 1150 },
      { name: 'Frig Vadisi Tabiat Parkı', lat: 39.0500, lng: 30.5550, elevation: 1200 },
      { name: 'Panorama Noktası', lat: 39.0450, lng: 30.5600, elevation: 1250 }
    ]
  },
  midasShort: {
    name: 'Midas Kenti Kısa Turu',
    distance: '8 km',
    difficulty: 'Kolay',
    description: 'Yazılıkaya (Midas Kenti) çevresindeki kaya anıtlarını kapsayan kültür turu.',
    color: '#A8E6CF',
    coordinates: [
      [30.5976, 39.0297], // Midas Anıtı
      [30.6020, 39.0350], // Kaya mezarları
      [30.6050, 39.0380], // Akropol
      [30.6000, 39.0320], // Dönüş
      [30.5976, 39.0297]  // Midas Anıtı
    ],
    markers: [
      { name: 'Midas Anıtı', lat: 39.0297, lng: 30.5976, elevation: 1200, description: 'Kral Midas\'ın anıtsal kaya mezarı' },
      { name: 'Kaya Mezarları', lat: 39.0350, lng: 30.6020, elevation: 1220, description: 'Frig dönemine ait kaya mezarları' },
      { name: 'Akropol', lat: 39.0380, lng: 30.6050, elevation: 1250, description: 'Antik kentin akropolü' }
    ]
  }
};