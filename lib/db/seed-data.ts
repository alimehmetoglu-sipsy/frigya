import db from './sqlite';

export function seedDatabase() {
  // Check if routes already exist
  const routeCount = db.prepare('SELECT COUNT(*) as count FROM routes').get() as { count: number };

  if (routeCount.count > 0) {
    console.log('Database already seeded');
    return;
  }

  console.log('Seeding database with initial data...');

  // Insert Frig Yolu routes
  const routes = [
    {
      name: 'Seydiler - Döğer',
      description: 'Frig Yolu\'nun başlangıç etabı. Seydiler köyünden başlayarak antik Frig kaya mezarlarının bulunduğu Döğer\'e uzanan 18 km\'lik rota.',
      distance_km: 18,
      difficulty: 'moderate',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.0233, lng: 30.4556, name: 'Seydiler Başlangıç' },
        { lat: 39.0456, lng: 30.4567, name: 'Döğer Kaya Anıtları' }
      ])
    },
    {
      name: 'Döğer - İhsaniye',
      description: 'Döğer kaya anıtlarından İhsaniye\'ye uzanan, doğal güzellikleri ve termal kaynakları ile ünlü 22 km\'lik etap.',
      distance_km: 22,
      difficulty: 'moderate',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.0456, lng: 30.4567, name: 'Döğer' },
        { lat: 39.0678, lng: 30.4890, name: 'İhsaniye' }
      ])
    },
    {
      name: 'İhsaniye - Ayazini',
      description: 'İhsaniye\'den Ayazini\'ye uzanan, Frig dönemine ait kaya yerleşimlerini ve kiliseleri kapsayan 25 km\'lik zorlu etap.',
      distance_km: 25,
      difficulty: 'hard',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.0678, lng: 30.4890, name: 'İhsaniye' },
        { lat: 39.0233, lng: 30.5444, name: 'Ayazini Köyü' }
      ])
    },
    {
      name: 'Ayazini - Yazılıkaya (Midas Kenti)',
      description: 'Ayazini\'den Kral Midas\'ın anıtsal kaya mezarının bulunduğu Yazılıkaya\'ya (Midas Kenti) uzanan 28 km\'lik tarihi rota.',
      distance_km: 28,
      difficulty: 'hard',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.0233, lng: 30.5444, name: 'Ayazini' },
        { lat: 39.0297, lng: 30.5976, name: 'Yazılıkaya (Midas Kenti)' }
      ])
    },
    {
      name: 'Yazılıkaya - Seyitgazi',
      description: 'Midas Kenti\'nden Seyit Battal Gazi Külliyesi\'nin bulunduğu Seyitgazi\'ye uzanan 32 km\'lik kültürel miras rotası.',
      distance_km: 32,
      difficulty: 'moderate',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.0297, lng: 30.5976, name: 'Yazılıkaya' },
        { lat: 39.4547, lng: 30.8789, name: 'Seyitgazi' }
      ])
    },
    {
      name: 'Seyitgazi - İnönü',
      description: 'Seyitgazi\'den Kurtuluş Savaşı\'nda önemli rol oynayan İnönü\'ye uzanan 35 km\'lik tarihi etap.',
      distance_km: 35,
      difficulty: 'moderate',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.4547, lng: 30.8789, name: 'Seyitgazi' },
        { lat: 39.8164, lng: 30.1506, name: 'İnönü' }
      ])
    },
    {
      name: 'İnönü - Kütahya',
      description: 'İnönü\'den çini sanatı ile ünlü Kütahya şehir merkezine uzanan 28 km\'lik rota.',
      distance_km: 28,
      difficulty: 'easy',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.8164, lng: 30.1506, name: 'İnönü' },
        { lat: 39.4169, lng: 29.9833, name: 'Kütahya' }
      ])
    },
    {
      name: 'Kütahya - Çavdarhisar (Aizanoi)',
      description: 'Kütahya\'dan Zeus Tapınağı ile ünlü Aizanoi Antik Kenti\'ne uzanan 30 km\'lik arkeolojik rota.',
      distance_km: 30,
      difficulty: 'moderate',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.4169, lng: 29.9833, name: 'Kütahya' },
        { lat: 39.1958, lng: 29.6275, name: 'Aizanoi Antik Kenti' }
      ])
    },
    {
      name: 'Çavdarhisar - Dumlupınar',
      description: 'Aizanoi\'den Kurtuluş Savaşı\'nın dönüm noktası Dumlupınar\'a uzanan 45 km\'lik anıtsal rota.',
      distance_km: 45,
      difficulty: 'hard',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.1958, lng: 29.6275, name: 'Çavdarhisar' },
        { lat: 38.8647, lng: 29.8947, name: 'Dumlupınar Zafer Anıtı' }
      ])
    },
    {
      name: 'Dumlupınar - Gordion',
      description: 'Dumlupınar\'dan Frig Krallığı\'nın başkenti Gordion\'a uzanan, Frig Yolu\'nun final etabı. 85 km\'lik bu uzun rota genellikle 2 günde tamamlanır.',
      distance_km: 85,
      difficulty: 'expert',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 38.8647, lng: 29.8947, name: 'Dumlupınar' },
        { lat: 39.6544, lng: 31.9889, name: 'Gordion (Yassıhöyük)' }
      ])
    },
    {
      name: 'Frig Vadisi Turu',
      description: 'Ayazini merkezli, Frig Vadisi Tabiat Parkı\'nı kapsayan günübirlik 15 km\'lik doğa yürüyüşü rotası.',
      distance_km: 15,
      difficulty: 'easy',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.0233, lng: 30.5444, name: 'Ayazini Başlangıç' },
        { lat: 39.0500, lng: 30.5500, name: 'Frig Vadisi Tabiat Parkı' }
      ])
    },
    {
      name: 'Midas Kenti Kısa Turu',
      description: 'Yazılıkaya (Midas Kenti) çevresindeki kaya anıtlarını ve antik yerleşimi kapsayan 8 km\'lik kültür turu.',
      distance_km: 8,
      difficulty: 'easy',
      gpx_data: null,
      markers: JSON.stringify([
        { lat: 39.0297, lng: 30.5976, name: 'Midas Anıtı' },
        { lat: 39.0350, lng: 30.6020, name: 'Kaya Mezarları' }
      ])
    }
  ];

  const insertRoute = db.prepare(`
    INSERT INTO routes (name, description, distance_km, difficulty, gpx_data, markers)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const route of routes) {
    insertRoute.run(
      route.name,
      route.description,
      route.distance_km,
      route.difficulty,
      route.gpx_data,
      route.markers
    );
  }

  console.log(`Seeded ${routes.length} routes`);

  // Insert sample users
  const users = [
    { email: 'ali@example.com', first_name: 'Ali', last_name: 'Yılmaz', phone: '+905551234567' },
    { email: 'ayse@example.com', first_name: 'Ayşe', last_name: 'Demir', phone: '+905559876543' },
    { email: 'mehmet@example.com', first_name: 'Mehmet', last_name: 'Kaya', phone: '+905555551234' }
  ];

  const insertUser = db.prepare(`
    INSERT INTO users (email, first_name, last_name, phone)
    VALUES (?, ?, ?, ?)
  `);

  for (const user of users) {
    try {
      insertUser.run(user.email, user.first_name, user.last_name, user.phone);
    } catch (error: any) {
      if (!error.message.includes('UNIQUE constraint')) {
        throw error;
      }
    }
  }

  console.log(`Seeded ${users.length} users`);

  // Insert sample registrations
  const registrations = [
    {
      user_id: 1,
      experience_level: 'intermediate',
      preferred_dates: JSON.stringify(['2025-10-15', '2025-10-22']),
      group_size: 4,
      motivation: 'Frig uygarlığının izlerini keşfetmek ve doğa yürüyüşü yapmak istiyorum.'
    },
    {
      user_id: 2,
      experience_level: 'beginner',
      preferred_dates: JSON.stringify(['2025-11-01']),
      group_size: 2,
      motivation: 'Tarihi ve kültürel mirası yerinde görmek istiyorum.'
    }
  ];

  const insertRegistration = db.prepare(`
    INSERT INTO registrations (user_id, experience_level, preferred_dates, group_size, motivation)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const reg of registrations) {
    try {
      insertRegistration.run(
        reg.user_id,
        reg.experience_level,
        reg.preferred_dates,
        reg.group_size,
        reg.motivation
      );
    } catch (error) {
      console.error('Error inserting registration:', error);
    }
  }

  console.log(`Seeded ${registrations.length} registrations`);
  console.log('Database seeding completed!');
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}