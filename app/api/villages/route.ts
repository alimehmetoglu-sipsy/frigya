import { NextResponse } from 'next/server';
import siteData from '@/data/site-data.json';

export async function GET() {
  try {
    const villages = siteData.route.stages.map((stage, index) => {
      const [name, province] = stage.split(', ');
      return {
        id: `village-${index + 1}`,
        name: name.trim(),
        province: province ? province.trim() : 'Türkiye',
        stage_number: index + 1,
        description: getVillageDescription(name)
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: villages,
        total: villages.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Villages fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch villages'
      },
      { status: 500 }
    );
  }
}

function getVillageDescription(villageName: string): string {
  const descriptions: { [key: string]: string } = {
    'Seydiler': 'Frig Yolu\'nun başlangıç noktası, zengin tarihi dokusu ile tanınır.',
    'Döğer': 'Antik Frig kaya mezarları ve anıtları ile ünlü tarihi yerleşim.',
    'İhsaniye': 'Doğal güzellikleri ve termal kaynakları ile bilinen sakin köy.',
    'Bayat': 'Tarihi Bayat Kalesi ve geleneksel mimarisi ile dikkat çeker.',
    'Kümbet': 'Osmanlı dönemi kümbet yapıları ve tarihi camileri ile tanınır.',
    'Ayazini': 'Frig dönemine ait kaya yerleşimleri ve kiliselerle ünlü.',
    'Yazılıkaya (Midas Kenti)': 'Kral Midas\'ın anıtsal kaya mezarı ve antik kent kalıntıları.',
    'Seyitgazi': 'Seyit Battal Gazi Külliyesi ve türbesi ile ünlü tarihi ilçe.',
    'Han': 'Tarihi kervansaray kalıntıları ve geleneksel köy yaşamı.',
    'İnönü': 'Kurtuluş Savaşı\'nda önemli rol oynayan tarihi yerleşim.',
    'Kütahya Merkez': 'Çini sanatı ve tarihi yapıları ile ünlü şehir merkezi.',
    'Çavdarhisar (Aizanoi)': 'Zeus Tapınağı ve antik tiyatro ile bilinen antik kent.',
    'Tavşanlı': 'Madencilik tarihi ve doğal güzellikleri ile tanınan ilçe.',
    'Altıntaş': 'Termal kaynakları ve tarihi eserleri ile bilinen yerleşim.',
    'Aslanapa': 'Geleneksel el sanatları ve doğal güzellikleri ile ünlü.',
    'Dumlupınar': 'Kurtuluş Savaşı\'nın dönüm noktası, Zafer Anıtı\'nın bulunduğu yer.',
    'Yenice Çiftliği': 'Tarımsal üretimi ve doğal yaşamı ile tanınan köy.',
    'Gordion (Yassıhöyük)': 'Frig Krallığı\'nın başkenti, Kral Midas\'ın tümülüsü.'
  };

  return descriptions[villageName] || 'Frig Yolu üzerinde önemli bir durak noktası.';
}