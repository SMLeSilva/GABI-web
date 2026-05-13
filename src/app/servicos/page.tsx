import React from 'react';
import { getServices } from '@/lib/content.server';

export const dynamic = 'force-dynamic';

export default function Servicos() {
  const categories = getServices();

  return (
    <div className="flex-1 bg-fuchsia-50/20 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Menu de <span className="text-primary">Beleza</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Técnicas exclusivas e produtos de alta performance para resultados surpreendentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category, idx: number) => (
            <div key={idx} className="bg-white rounded-xl shadow-xl shadow-fuchsia-900/5 overflow-hidden hover:shadow-2xl hover:shadow-fuchsia-900/10 transition-all duration-500 group border border-gray-100 flex flex-col">
               <div className="h-72 overflow-hidden relative">
                 <img 
                   src={category.image} 
                   alt={category.title} 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b1a]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                 <h2 className="absolute bottom-6 left-8 text-3xl font-black text-white tracking-tight">{category.title}</h2>
               </div>
               
               <div className="p-10 flex-1 flex flex-col">
                  <ul className="space-y-5 flex-1">
                    {category.services.map((service, sIdx: number) => (
                      <li key={sIdx} className="flex justify-between items-center group/item pb-1">
                        <span className="text-gray-600 font-semibold group-hover/item:text-primary transition-colors">{service.name}</span>
                        <div className="flex-1 border-b border-dotted border-gray-200 mx-4 h-3"></div>
                        <span className="font-black text-primary text-sm whitespace-nowrap">{service.price}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
