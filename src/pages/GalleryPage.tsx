import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(' ');
}

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800', category: 'wedding' },
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', category: 'wedding' },
  { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800', category: 'corporate' },
  { url: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800', category: 'private' },
  { url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800', category: 'wedding' },
  { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', category: 'corporate' },
  { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800', category: 'private' },
  { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800', category: 'wedding' },
];

export const GalleryPage: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="flex flex-col">
      <section className="section-viewport">
        <div className="section-viewport-scroll mx-auto w-full max-w-7xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-5xl">{t('nav.gallery')}</h1>
            <p className="mx-auto max-w-2xl text-brand-600">
              Take a look at some of the beautiful events we have hosted at Rønningen.
            </p>
          </div>

          <div className="mb-12 flex justify-center space-x-4">
            {['all', 'wedding', 'corporate', 'private'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "rounded-full px-6 py-2 text-sm uppercase tracking-widest transition-all",
                  filter === cat ? "bg-brand-800 text-white" : "bg-brand-100 text-brand-600 hover:bg-brand-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

      <motion.div 
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4"
      >
        <AnimatePresence>
          {filteredImages.map((img, i) => (
            <motion.div
              key={img.url}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm"
              onClick={() => setSelectedImage(img.url)}
            >
              <img 
                src={img.url} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs uppercase tracking-widest font-bold">View Image</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-900/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <button 
              className="absolute top-8 right-8 text-white hover:text-brand-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
