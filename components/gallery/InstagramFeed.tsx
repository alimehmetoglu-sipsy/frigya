'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  link: string;
  username: string;
  timestamp: Date;
}

const mockInstagramPosts: InstagramPost[] = [
  {
    id: '1',
    imageUrl: '/images/instagram-1.jpg',
    caption: 'Amazing sunrise on the Phrygian Way! #phrygianway #hiking #turkey',
    likes: 342,
    comments: 28,
    link: 'https://instagram.com/p/1',
    username: 'hikingturkey',
    timestamp: new Date('2024-03-15')
  },
  {
    id: '2',
    imageUrl: '/images/instagram-2.jpg',
    caption: 'Ancient rock formations along the trail #phrygianway #ancienthistory',
    likes: 567,
    comments: 45,
    link: 'https://instagram.com/p/2',
    username: 'trailexplorer',
    timestamp: new Date('2024-03-14')
  },
  {
    id: '3',
    imageUrl: '/images/instagram-3.jpg',
    caption: 'Village life in Ayazini #phrygianway #villagelife #culture',
    likes: 234,
    comments: 19,
    link: 'https://instagram.com/p/3',
    username: 'culturaltrails',
    timestamp: new Date('2024-03-13')
  },
  {
    id: '4',
    imageUrl: '/images/instagram-4.jpg',
    caption: 'Spring flowers blooming everywhere! #phrygianway #springhiking',
    likes: 892,
    comments: 67,
    link: 'https://instagram.com/p/4',
    username: 'naturelovers',
    timestamp: new Date('2024-03-12')
  },
  {
    id: '5',
    imageUrl: '/images/instagram-5.jpg',
    caption: 'Group hiking adventure on the Phrygian Way #phrygianway #grouphike',
    likes: 423,
    comments: 31,
    link: 'https://instagram.com/p/5',
    username: 'adventuregroup',
    timestamp: new Date('2024-03-11')
  },
  {
    id: '6',
    imageUrl: '/images/instagram-6.jpg',
    caption: 'Sunset views from the trail #phrygianway #sunset #goldenhour',
    likes: 756,
    comments: 52,
    link: 'https://instagram.com/p/6',
    username: 'sunsettrails',
    timestamp: new Date('2024-03-10')
  }
];

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>(mockInstagramPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPosts(mockInstagramPosts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl font-bold">Instagram Feed</h2>
          </div>
          <p className="text-gray-600 text-lg">
            Follow <span className="font-semibold text-pink-600">#phrygianway</span> for more amazing photos
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.previousElementSibling?.remove();
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <div className="text-xs font-semibold mb-1">@{post.username}</div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com/explore/tags/phrygianway"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Instagram className="w-5 h-5" />
            View More on Instagram
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}