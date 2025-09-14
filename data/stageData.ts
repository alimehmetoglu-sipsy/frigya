export interface StageData {
  id: string;
  stageNumber: number;
  from: string;
  to: string;
  distance: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  elevationGain: number;
  elevationLoss: number;
  gpxFile: string;
  mapBounds: [[number, number], [number, number]];

  description: {
    overview: string;
    terrain: string;
    navigation: string;
    waterSources: string[];
    warnings: string[];
  };

  highlights: Array<{
    name: string;
    description: string;
    coordinates: [number, number];
    images: string[];
  }>;

  accommodation: Array<{
    type: 'guesthouse' | 'camping' | 'hotel';
    name: string;
    contact: string;
    price: string;
    amenities: string[];
  }>;

  waypoints: Array<{
    km: number;
    elevation: number;
    name: string;
    type: 'village' | 'monument' | 'viewpoint' | 'water';
  }>;

  photos: Array<{
    url: string;
    caption: string;
    photographer: string;
  }>;

  tips: string[];
  nextStage: string | null;
  previousStage: string | null;
}

export const stagesData: StageData[] = [
  {
    id: "gordion-beylikopru",
    stageNumber: 1,
    from: "Gordion",
    to: "Beylikköprü",
    distance: 18,
    duration: "5-6 hours",
    difficulty: "Easy",
    elevationGain: 150,
    elevationLoss: 50,
    gpxFile: "/gpx/stage1-gordion-beylikopru.gpx",
    mapBounds: [[39.5832, 31.8456], [39.6505, 31.9931]],
    description: {
      overview: "Begin your Phrygian Way journey at the ancient capital of Gordion, a UNESCO World Heritage Site. This opening stage offers a gentle introduction to the trail, following the Sakarya River valley through agricultural lands with well-marked, mostly flat paths.",
      terrain: "Well-defined paths through farmland, dirt tracks, and some ancient road sections. Mostly flat with minor undulations.",
      navigation: "Well-marked with red and white blazes. Follow the Sakarya River valley heading southwest.",
      waterSources: [
        "Gordion Museum (start)",
        "Limited sources along trail - carry sufficient water",
        "Beylikköprü village (end)"
      ],
      warnings: [
        "No shops or facilities between start and end points",
        "Can be muddy after rain",
        "Village dogs may be present - usually friendly"
      ]
    },
    highlights: [
      {
        name: "Gordion Archaeological Site",
        description: "Ancient capital of Phrygia with museum and King Midas's father's tumulus",
        coordinates: [39.6505, 31.9931],
        images: ["/images/stages/gordion-site.jpg"]
      },
      {
        name: "Sakarya River Valley",
        description: "Peaceful river valley through farmland with wheat and sunflower fields",
        coordinates: [39.6200, 31.9500],
        images: ["/images/stages/sakarya-valley.jpg"]
      },
      {
        name: "Ancient Phrygian Roads",
        description: "3000-year-old road sections carved into bedrock with visible wheel ruts",
        coordinates: [39.6000, 31.9000],
        images: ["/images/stages/ancient-roads.jpg"]
      },
      {
        name: "Beylik Ottoman Bridge",
        description: "Historic Ottoman-era bridge at the entrance to Beylikköprü village",
        coordinates: [39.5832, 31.8456],
        images: ["/images/stages/beylik-bridge.jpg"]
      }
    ],
    accommodation: [
      {
        type: "guesthouse",
        name: "Beylikköprü Village Guesthouse",
        contact: "+90 312 XXX XXXX",
        price: "150-200 TL per person",
        amenities: ["Breakfast included", "Shared bathroom", "Hot water", "Local meals available"]
      }
    ],
    waypoints: [
      { km: 0, elevation: 695, name: "Gordion Museum", type: "monument" },
      { km: 5, elevation: 690, name: "Sakarya River Crossing", type: "water" },
      { km: 10, elevation: 720, name: "Ancient Road Section", type: "monument" },
      { km: 15, elevation: 800, name: "Hill Viewpoint", type: "viewpoint" },
      { km: 18, elevation: 845, name: "Beylikköprü", type: "village" }
    ],
    photos: [
      {
        url: "/images/stages/stage1-hero.jpg",
        caption: "Morning light over Gordion tumulus",
        photographer: "Phrygian Way Team"
      },
      {
        url: "/images/stages/stage1-path.jpg",
        caption: "Trail through wheat fields",
        photographer: "Phrygian Way Team"
      }
    ],
    tips: [
      "Start early to avoid afternoon heat, especially in summer",
      "Visit Gordion Museum before starting (opens at 8:30 AM)",
      "Pack lunch as there are no shops along the route",
      "Consider arranging transport back to Gordion if not continuing",
      "Carry at least 2-3 liters of water"
    ],
    nextStage: "beylikopru-mulk",
    previousStage: null
  },
  {
    id: "beylikopru-mulk",
    stageNumber: 2,
    from: "Beylikköprü",
    to: "Mülk",
    distance: 34,
    duration: "8-9 hours",
    difficulty: "Moderate",
    elevationGain: 450,
    elevationLoss: 350,
    gpxFile: "/gpx/stage2-beylikopru-mulk.gpx",
    mapBounds: [[39.4500, 31.6000], [39.5832, 31.8456]],
    description: {
      overview: "One of the longest stages of the Phrygian Way, traversing rolling hills and valleys with spectacular views. Pass through several small villages and ancient Phrygian settlements.",
      terrain: "Mixed terrain with dirt roads, rocky paths, and some road walking. Several ascents and descents throughout the day.",
      navigation: "Well-marked but long distance requires careful pacing. Some sections follow rural roads.",
      waterSources: [
        "Beylikköprü village (start)",
        "Çukurca village fountain (12 km)",
        "Karacaören village (22 km)",
        "Mülk village (end)"
      ],
      warnings: [
        "Long distance - start very early",
        "Limited shade in summer",
        "Some road walking sections - be aware of traffic",
        "Ensure accommodation is booked in advance"
      ]
    },
    highlights: [
      {
        name: "Çukurca Village",
        description: "Traditional Turkish village with fountain and rest area",
        coordinates: [39.5200, 31.7500],
        images: ["/images/stages/cukurca-village.jpg"]
      },
      {
        name: "Phrygian Rock Formations",
        description: "Impressive volcanic tuff formations with ancient carvings",
        coordinates: [39.4900, 31.7000],
        images: ["/images/stages/rock-formations.jpg"]
      },
      {
        name: "Panoramic Viewpoint",
        description: "360-degree views of the Phrygian highlands",
        coordinates: [39.4700, 31.6500],
        images: ["/images/stages/panoramic-view.jpg"]
      }
    ],
    accommodation: [
      {
        type: "guesthouse",
        name: "Mülk Village House",
        contact: "+90 312 XXX XXXX",
        price: "150-200 TL per person",
        amenities: ["Breakfast included", "Evening meal available", "Hot shower", "WiFi"]
      }
    ],
    waypoints: [
      { km: 0, elevation: 845, name: "Beylikköprü", type: "village" },
      { km: 12, elevation: 920, name: "Çukurca Village", type: "village" },
      { km: 22, elevation: 980, name: "Karacaören", type: "village" },
      { km: 34, elevation: 945, name: "Mülk", type: "village" }
    ],
    photos: [
      {
        url: "/images/stages/stage2-landscape.jpg",
        caption: "Rolling hills of the Phrygian highlands",
        photographer: "Phrygian Way Team"
      }
    ],
    tips: [
      "Start before sunrise to complete the long distance",
      "Carry extra water - 4 liters minimum in summer",
      "Pack energy snacks for the long day",
      "Consider splitting this stage if needed",
      "Book accommodation in advance as options are limited"
    ],
    nextStage: "mulk-sivrihisar",
    previousStage: "gordion-beylikopru"
  },
  {
    id: "mulk-sivrihisar",
    stageNumber: 3,
    from: "Mülk",
    to: "Sivrihisar",
    distance: 26,
    duration: "6-7 hours",
    difficulty: "Moderate",
    elevationGain: 350,
    elevationLoss: 400,
    gpxFile: "/gpx/stage3-mulk-sivrihisar.gpx",
    mapBounds: [[39.4000, 31.4000], [39.4500, 31.6000]],
    description: {
      overview: "A scenic stage leading to the historic town of Sivrihisar with its famous Ulu Camii (Great Mosque). The route passes through typical Anatolian steppe landscape.",
      terrain: "Varied terrain with gentle hills, some rocky sections, and agricultural areas.",
      navigation: "Clear trail markings with some sections on rural roads near Sivrihisar.",
      waterSources: [
        "Mülk village (start)",
        "Seasonal stream crossings",
        "Günyüzü road fountain (18 km)",
        "Sivrihisar (end)"
      ],
      warnings: [
        "Hot and exposed in summer months",
        "Final approach to Sivrihisar involves road walking",
        "Stream crossings may be dry in late summer"
      ]
    },
    highlights: [
      {
        name: "Byzantine Church Ruins",
        description: "Remains of an ancient Byzantine church with visible foundations",
        coordinates: [39.4300, 31.5500],
        images: ["/images/stages/byzantine-ruins.jpg"]
      },
      {
        name: "Sivrihisar Ulu Camii",
        description: "Magnificent 13th-century Seljuk mosque with 67 wooden pillars",
        coordinates: [39.4500, 31.5333],
        images: ["/images/stages/ulu-camii.jpg"]
      }
    ],
    accommodation: [
      {
        type: "hotel",
        name: "Sivrihisar Hotel",
        contact: "+90 222 XXX XXXX",
        price: "200-300 TL per room",
        amenities: ["Private bathroom", "Breakfast included", "Restaurant", "WiFi", "Air conditioning"]
      },
      {
        type: "guesthouse",
        name: "City Center Pension",
        contact: "+90 222 XXX XXXX",
        price: "150 TL per person",
        amenities: ["Breakfast", "Shared facilities", "Central location"]
      }
    ],
    waypoints: [
      { km: 0, elevation: 945, name: "Mülk", type: "village" },
      { km: 10, elevation: 1020, name: "Hill Pass", type: "viewpoint" },
      { km: 18, elevation: 950, name: "Günyüzü Road", type: "water" },
      { km: 26, elevation: 895, name: "Sivrihisar", type: "village" }
    ],
    photos: [
      {
        url: "/images/stages/stage3-steppe.jpg",
        caption: "Anatolian steppe landscape",
        photographer: "Phrygian Way Team"
      }
    ],
    tips: [
      "Stock up on supplies in Sivrihisar for next stages",
      "Visit Ulu Camii - one of Anatolia's most important Seljuk monuments",
      "Town has ATMs, shops, and restaurants",
      "Good place for a rest day if needed",
      "Try local specialty dishes in town restaurants"
    ],
    nextStage: "sivrihisar-pessinus",
    previousStage: "beylikopru-mulk"
  },
  {
    id: "sivrihisar-pessinus",
    stageNumber: 4,
    from: "Sivrihisar",
    to: "Pessinus (Ballıhisar)",
    distance: 32,
    duration: "7-8 hours",
    difficulty: "Moderate",
    elevationGain: 400,
    elevationLoss: 450,
    gpxFile: "/gpx/stage4-sivrihisar-pessinus.gpx",
    mapBounds: [[39.3000, 31.3500], [39.4500, 31.5333]],
    description: {
      overview: "Journey to ancient Pessinus, the sacred city of Cybele, mother goddess of Anatolia. This historically rich stage combines natural beauty with significant archaeological sites.",
      terrain: "Rolling hills, agricultural areas, and some rocky paths approaching Pessinus.",
      navigation: "Well-marked trail with clear signage. Some road sections near villages.",
      waterSources: [
        "Sivrihisar (start)",
        "Karacaşehir village (15 km)",
        "Stream crossing (seasonal)",
        "Ballıhisar/Pessinus (end)"
      ],
      warnings: [
        "Long stage - start early",
        "Limited shade along the route",
        "Archaeological site may require entry fee"
      ]
    },
    highlights: [
      {
        name: "Pessinus Ancient City",
        description: "Sacred city of Cybele with Roman theater and temple foundations",
        coordinates: [39.3000, 31.3500],
        images: ["/images/stages/pessinus-ruins.jpg"]
      },
      {
        name: "Roman Theater",
        description: "Well-preserved Roman theater with seating for 5000",
        coordinates: [39.2980, 31.3520],
        images: ["/images/stages/roman-theater.jpg"]
      }
    ],
    accommodation: [
      {
        type: "guesthouse",
        name: "Ballıhisar Pension",
        contact: "+90 312 XXX XXXX",
        price: "150-200 TL per person",
        amenities: ["Breakfast", "Local meals", "Basic rooms", "Hot water"]
      }
    ],
    waypoints: [
      { km: 0, elevation: 895, name: "Sivrihisar", type: "village" },
      { km: 15, elevation: 950, name: "Karacaşehir", type: "village" },
      { km: 25, elevation: 920, name: "Valley Crossing", type: "water" },
      { km: 32, elevation: 850, name: "Pessinus/Ballıhisar", type: "monument" }
    ],
    photos: [
      {
        url: "/images/stages/stage4-fields.jpg",
        caption: "Golden wheat fields near Pessinus",
        photographer: "Phrygian Way Team"
      }
    ],
    tips: [
      "Allow time to explore Pessinus archaeological site",
      "Bring guidebook or download info about the ancient city",
      "Local museum has important artifacts if open",
      "Stock up on supplies - limited options ahead",
      "Consider camping near the ancient site if permitted"
    ],
    nextStage: "ballihisar-yazilikaya",
    previousStage: "mulk-sivrihisar"
  },
  {
    id: "ballihisar-yazilikaya",
    stageNumber: 5,
    from: "Ballıhisar",
    to: "Yazılıkaya (Midas City)",
    distance: 35,
    duration: "8-9 hours",
    difficulty: "Challenging",
    elevationGain: 650,
    elevationLoss: 450,
    gpxFile: "/gpx/stage5-ballihisar-yazilikaya.gpx",
    mapBounds: [[39.0334, 30.5231], [39.3000, 31.3500]],
    description: {
      overview: "The most challenging stage leading to the spectacular Yazılıkaya (Midas City), featuring the famous Midas Monument. Stunning rock formations and ancient Phrygian remains throughout.",
      terrain: "Rocky paths, steep ascents, volcanic tuff formations. Technical sections near Yazılıkaya.",
      navigation: "Trail can be faint in places. GPS recommended. Rock cairns mark the way.",
      waterSources: [
        "Ballıhisar (start)",
        "Kümbet village (12 km)",
        "Seasonal springs (unreliable)",
        "Yazılıkaya village (end)"
      ],
      warnings: [
        "Most challenging stage - good fitness required",
        "Carry extra water - sources unreliable",
        "Rocky terrain requires good boots",
        "Can be very hot and exposed in summer"
      ]
    },
    highlights: [
      {
        name: "Midas Monument",
        description: "17-meter high rock facade with Phrygian inscriptions, dated to 8th century BCE",
        coordinates: [39.0334, 30.5231],
        images: ["/images/stages/midas-monument.jpg"]
      },
      {
        name: "Yazılıkaya Rock City",
        description: "Extensive Phrygian settlement carved into volcanic rock",
        coordinates: [39.0350, 30.5250],
        images: ["/images/stages/yazilikaya-city.jpg"]
      },
      {
        name: "Phrygian Tombs",
        description: "Rock-cut tombs with elaborate facades",
        coordinates: [39.0340, 30.5240],
        images: ["/images/stages/phrygian-tombs.jpg"]
      }
    ],
    accommodation: [
      {
        type: "guesthouse",
        name: "Yazılıkaya Village House",
        contact: "+90 222 XXX XXXX",
        price: "150-200 TL per person",
        amenities: ["Traditional breakfast", "Evening meal", "Basic facilities", "Local hospitality"]
      },
      {
        type: "camping",
        name: "Yazılıkaya Camping Area",
        contact: "Municipality",
        price: "50 TL per tent",
        amenities: ["Water", "Toilets", "Designated camping area"]
      }
    ],
    waypoints: [
      { km: 0, elevation: 850, name: "Ballıhisar", type: "village" },
      { km: 12, elevation: 1050, name: "Kümbet Village", type: "village" },
      { km: 25, elevation: 1350, name: "Mountain Pass", type: "viewpoint" },
      { km: 35, elevation: 1150, name: "Yazılıkaya", type: "monument" }
    ],
    photos: [
      {
        url: "/images/stages/stage5-rocks.jpg",
        caption: "Dramatic volcanic rock formations",
        photographer: "Phrygian Way Team"
      }
    ],
    tips: [
      "Start very early - long and challenging day",
      "Carry 4-5 liters of water in summer",
      "Take time to explore Yazılıkaya - it's spectacular",
      "Consider splitting stage if too challenging",
      "Bring headlamp if arriving late"
    ],
    nextStage: "yazilikaya-doger",
    previousStage: "sivrihisar-pessinus"
  },
  {
    id: "yazilikaya-doger",
    stageNumber: 6,
    from: "Yazılıkaya",
    to: "Döğer",
    distance: 35,
    duration: "7-8 hours",
    difficulty: "Moderate",
    elevationGain: 400,
    elevationLoss: 500,
    gpxFile: "/gpx/stage6-yazilikaya-doger.gpx",
    mapBounds: [[38.9000, 30.4000], [39.0334, 30.5231]],
    description: {
      overview: "Descend from the Phrygian highlands through pine forests and valleys to reach Döğer, passing numerous Phrygian settlements and rock monuments.",
      terrain: "Forest paths, rocky sections, some road walking. Generally descending.",
      navigation: "Well-marked through forests. Some navigation challenges in open areas.",
      waterSources: [
        "Yazılıkaya village (start)",
        "Forest springs (seasonal)",
        "Gökgöz village (20 km)",
        "Döğer (end)"
      ],
      warnings: [
        "Long stage despite easier terrain",
        "Forest sections can be muddy after rain",
        "Some unmarked sections - follow GPS"
      ]
    },
    highlights: [
      {
        name: "Phrygian Valley",
        description: "Valley with numerous rock-cut monuments and settlements",
        coordinates: [38.9500, 30.4800],
        images: ["/images/stages/phrygian-valley.jpg"]
      },
      {
        name: "Pine Forests",
        description: "Beautiful pine forest sections with shade and cooler temperatures",
        coordinates: [38.9300, 30.4500],
        images: ["/images/stages/pine-forest.jpg"]
      }
    ],
    accommodation: [
      {
        type: "guesthouse",
        name: "Döğer Village Accommodation",
        contact: "+90 274 XXX XXXX",
        price: "150 TL per person",
        amenities: ["Simple rooms", "Breakfast", "Local meals on request"]
      }
    ],
    waypoints: [
      { km: 0, elevation: 1150, name: "Yazılıkaya", type: "monument" },
      { km: 10, elevation: 1100, name: "Forest Entry", type: "viewpoint" },
      { km: 20, elevation: 950, name: "Gökgöz Village", type: "village" },
      { km: 35, elevation: 850, name: "Döğer", type: "village" }
    ],
    photos: [
      {
        url: "/images/stages/stage6-forest.jpg",
        caption: "Trail through pine forests",
        photographer: "Phrygian Way Team"
      }
    ],
    tips: [
      "Enjoy the shade of the forest sections",
      "Look for hidden Phrygian remains off the main trail",
      "Good opportunities for wildlife spotting",
      "Döğer has limited facilities - stock up in advance",
      "Pleasant stage after the challenging previous day"
    ],
    nextStage: "doger-ayazini",
    previousStage: "ballihisar-yazilikaya"
  },
  {
    id: "doger-ayazini",
    stageNumber: 7,
    from: "Döğer",
    to: "Ayazini",
    distance: 30,
    duration: "7 hours",
    difficulty: "Moderate",
    elevationGain: 450,
    elevationLoss: 400,
    gpxFile: "/gpx/stage7-doger-ayazini.gpx",
    mapBounds: [[38.7500, 30.3000], [38.9000, 30.4000]],
    description: {
      overview: "Traverse the heart of Phrygia to reach Ayazini with its impressive rock churches and Byzantine frescoes. A journey through history and stunning landscapes.",
      terrain: "Mixed terrain with valley walks, gentle climbs, and rocky sections near Ayazini.",
      navigation: "Generally well-marked. Some road sections between villages.",
      waterSources: [
        "Döğer (start)",
        "Başören village (12 km)",
        "Valley streams (seasonal)",
        "Ayazini (end)"
      ],
      warnings: [
        "Sun exposure in open sections",
        "Rock churches may require climbing",
        "Village dogs along the route"
      ]
    },
    highlights: [
      {
        name: "Ayazini Rock Churches",
        description: "Byzantine rock churches with preserved frescoes from 11th-13th centuries",
        coordinates: [38.7500, 30.3000],
        images: ["/images/stages/ayazini-churches.jpg"]
      },
      {
        name: "Phrygian Fortress",
        description: "Ancient fortress remains on hilltop with panoramic views",
        coordinates: [38.7600, 30.3100],
        images: ["/images/stages/fortress-ruins.jpg"]
      }
    ],
    accommodation: [
      {
        type: "guesthouse",
        name: "Ayazini Pension",
        contact: "+90 274 XXX XXXX",
        price: "150-200 TL per person",
        amenities: ["Traditional rooms", "Home-cooked meals", "Garden", "Local guides available"]
      }
    ],
    waypoints: [
      { km: 0, elevation: 850, name: "Döğer", type: "village" },
      { km: 12, elevation: 950, name: "Başören", type: "village" },
      { km: 22, elevation: 1000, name: "Valley Viewpoint", type: "viewpoint" },
      { km: 30, elevation: 900, name: "Ayazini", type: "monument" }
    ],
    photos: [
      {
        url: "/images/stages/stage7-landscape.jpg",
        caption: "Approaching Ayazini through the valley",
        photographer: "Phrygian Way Team"
      }
    ],
    tips: [
      "Allow time to explore Ayazini rock churches",
      "Bring flashlight for dark church interiors",
      "Local guide recommended for historical context",
      "Photography may be restricted in some churches",
      "Last accommodation before final stage"
    ],
    nextStage: "ayazini-seydiler",
    previousStage: "yazilikaya-doger"
  },
  {
    id: "ayazini-seydiler",
    stageNumber: 8,
    from: "Ayazini",
    to: "Seydiler",
    distance: 35,
    duration: "8 hours",
    difficulty: "Moderate",
    elevationGain: 500,
    elevationLoss: 600,
    gpxFile: "/gpx/stage8-ayazini-seydiler.gpx",
    mapBounds: [[38.5765, 30.5459], [38.7500, 30.3000]],
    description: {
      overview: "The final stage of the eastern route, ending at Seydiler with views of Akdağ. A fitting conclusion passing through diverse landscapes and historical sites.",
      terrain: "Varied terrain with valleys, gentle hills, and some road sections approaching Seydiler.",
      navigation: "Marked trail with some road walking in the final section.",
      waterSources: [
        "Ayazini (start)",
        "Gazlıgöl village (15 km)",
        "Valley springs",
        "Seydiler (end)"
      ],
      warnings: [
        "Long final stage - pace yourself",
        "Final sections on rural roads",
        "Celebrate your achievement in Seydiler!"
      ]
    },
    highlights: [
      {
        name: "Akdağ Views",
        description: "Spectacular views of Akdağ (White Mountain) marking journey's end",
        coordinates: [38.5765, 30.5459],
        images: ["/images/stages/akdag-view.jpg"]
      },
      {
        name: "Final Descent",
        description: "Scenic descent into Seydiler with panoramic views",
        coordinates: [38.5900, 30.5300],
        images: ["/images/stages/final-descent.jpg"]
      }
    ],
    accommodation: [
      {
        type: "hotel",
        name: "Seydiler Hotel",
        contact: "+90 274 XXX XXXX",
        price: "200-250 TL per room",
        amenities: ["Private rooms", "Restaurant", "Celebration dinner available", "Transport connections"]
      },
      {
        type: "guesthouse",
        name: "Town Pension",
        contact: "+90 274 XXX XXXX",
        price: "150 TL per person",
        amenities: ["Simple rooms", "Breakfast", "Central location"]
      }
    ],
    waypoints: [
      { km: 0, elevation: 900, name: "Ayazini", type: "monument" },
      { km: 15, elevation: 1050, name: "Gazlıgöl", type: "village" },
      { km: 25, elevation: 950, name: "Final Pass", type: "viewpoint" },
      { km: 35, elevation: 800, name: "Seydiler", type: "village" }
    ],
    photos: [
      {
        url: "/images/stages/stage8-finish.jpg",
        caption: "Arrival at Seydiler - journey complete!",
        photographer: "Phrygian Way Team"
      }
    ],
    tips: [
      "Take photos at the trail end marker in Seydiler",
      "Certificate of completion available from local tourism office",
      "Regular bus connections to major cities",
      "Celebrate with fellow hikers at local restaurant",
      "Consider continuing on western or southern routes"
    ],
    nextStage: null,
    previousStage: "doger-ayazini"
  }
];

export function getStageBySlug(slug: string): StageData | undefined {
  return stagesData.find(stage => stage.id === slug);
}

export function getStageById(id: number): StageData | undefined {
  return stagesData.find(stage => stage.stageNumber === id);
}