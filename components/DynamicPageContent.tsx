'use client';

import { motion } from 'framer-motion';

interface Component {
  id: string;
  type: string;
  content: any;
  settings: any;
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  template: string;
  components: Component[];
  published: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

interface DynamicPageContentProps {
  page: PageData;
}

export default function DynamicPageContent({ page }: DynamicPageContentProps) {
  const renderComponent = (component: Component, index: number) => {
    const animationProps = {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: index * 0.1 },
      viewport: { once: true }
    };

    switch (component.type) {
      case 'heading':
        const HeadingTag = component.content.level as keyof JSX.IntrinsicElements;
        return (
          <motion.div key={component.id} {...animationProps}>
            <HeadingTag className={`font-bold ${
              component.content.level === 'h1' ? 'text-4xl md:text-5xl' :
              component.content.level === 'h2' ? 'text-3xl md:text-4xl' :
              component.content.level === 'h3' ? 'text-2xl md:text-3xl' :
              'text-xl md:text-2xl'
            } mb-6`}>
              {component.content.text}
            </HeadingTag>
          </motion.div>
        );
      
      case 'paragraph':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="container mx-auto px-4 max-w-4xl">
              <p className="text-gray-700 leading-relaxed mb-6">{component.content.text}</p>
            </div>
          </motion.div>
        );
      
      case 'image':
        return (
          <motion.div key={component.id} {...animationProps}>
            <img 
              src={component.content.src} 
              alt={component.content.alt} 
              className="w-full rounded-lg shadow-lg mb-6" 
            />
          </motion.div>
        );
      
      case 'button':
        return (
          <motion.div key={component.id} {...animationProps} className="mb-6">
            <a 
              href={component.content.link}
              className={`inline-block px-8 py-3 rounded-lg font-medium transition-colors ${
                component.content.style === 'primary' 
                  ? 'bg-primary-500 text-white hover:bg-primary-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {component.content.text}
            </a>
          </motion.div>
        );
      
      case 'list':
        const ListTag = component.content.style === 'bullet' ? 'ul' : 'ol';
        return (
          <motion.div key={component.id} {...animationProps}>
            <ListTag className={`mb-6 ${
              component.content.style === 'bullet' ? 'list-disc' : 'list-decimal'
            } pl-6 space-y-2`}>
              {component.content.items.map((item: string, i: number) => (
                <li key={i} className="text-gray-700">{item}</li>
              ))}
            </ListTag>
          </motion.div>
        );
      
      case 'quote':
        return (
          <motion.div key={component.id} {...animationProps}>
            <blockquote className="border-l-4 border-primary-500 pl-6 italic mb-6">
              <p className="text-lg text-gray-700 mb-2">"{component.content.text}"</p>
              {component.content.author && (
                <cite className="text-sm text-gray-600 not-italic">— {component.content.author}</cite>
              )}
            </blockquote>
          </motion.div>
        );
      
      case 'divider':
        return (
          <motion.div key={component.id} {...animationProps}>
            <hr className="my-8 border-gray-300" />
          </motion.div>
        );
      
      case 'spacer':
        return <div key={component.id} style={{ height: component.content.height }} />;
      
      case 'hero':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden mb-12">
              <img 
                src={component.content.image} 
                alt={component.content.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">{component.content.title}</h1>
                  <p className="text-lg md:text-xl mb-6">{component.content.subtitle}</p>
                  {component.content.button && (
                    <a 
                      href={component.content.button.link}
                      className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      {component.content.button.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 'features':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="container mx-auto px-4 max-w-6xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {component.content.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      
      case 'gallery':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {component.content.images?.map((image: any, i: number) => (
                <img 
                  key={i}
                  src={image.src} 
                  alt={image.alt || `Gallery image ${i + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
              ))}
            </div>
          </motion.div>
        );
      
      case 'contact':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="bg-gray-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6">İletişime Geçin</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adınız</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                  <input type="email" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
                  <textarea className="w-full px-4 py-2 border rounded-lg" rows={4}></textarea>
                </div>
                <button type="submit" className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600">
                  Gönder
                </button>
              </form>
            </div>
          </motion.div>
        );
      
      case 'team':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {component.content.members?.map((member: any, i: number) => (
                <div key={i} className="text-center">
                  <img 
                    src={member.photo || 'https://via.placeholder.com/200'} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case 'services':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {component.content.items?.map((service: any, i: number) => (
                <div key={i} className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case 'testimonials':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {component.content.items?.map((testimonial: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.photo || 'https://via.placeholder.com/50'} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case 'faq':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="space-y-4 mb-12">
              {component.content.items?.map((faq: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case 'cta':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="bg-primary-500 text-white p-12 rounded-xl text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{component.content.title}</h2>
              <p className="text-xl mb-6">{component.content.description}</p>
              <a 
                href={component.content.button?.link || '#'}
                className="inline-block bg-white text-primary-500 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                {component.content.button?.text || 'Başla'}
              </a>
            </div>
          </motion.div>
        );
      
      case 'stats':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {component.content.items?.map((stat: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case 'map':
        return (
          <motion.div key={component.id} {...animationProps}>
            <div className="bg-gray-200 h-96 rounded-lg mb-12 flex items-center justify-center">
              <p className="text-gray-600">Harita Alanı</p>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {page.components.length === 0 ? (
        <div className="text-center py-24 container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{page.title}</h1>
          <p className="text-gray-600">Bu sayfa henüz içerik içermiyor.</p>
        </div>
      ) : (
        page.components.map((component, index) => renderComponent(component, index))
      )}
    </div>
  );
}