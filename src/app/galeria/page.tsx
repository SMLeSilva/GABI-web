import React from 'react';
import { getGallery } from '@/lib/content.server';

export const dynamic = 'force-dynamic';

export default function Galeria() {
  const { images } = getGallery();

  return (
    <div className="flex-1 bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Nosso <span className="text-primary">Portfólio</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Resultados reais que elevam a autoestima e transformam o olhar.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((image, index: number) => (
            <div key={index} className="break-inside-avoid relative rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-700 bg-gray-50 border border-gray-100">
              <img 
                src={image.url} 
                alt={image.caption} 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b1a]/90 via-[#1a0b1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <p className="text-white text-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{image.caption}</p>
                <div className="w-12 h-1 bg-primary mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          ))}
        </div>
        

      </div>
    </div>
  );
}
