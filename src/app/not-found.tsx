import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center bg-fuchsia-50/30">
      <div className="relative">
        <h1 className="text-9xl font-black text-fuchsia-100 select-none">404</h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Ops! Página não encontrada</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Parece que a página que você está procurando não existe ou foi movida. 
            Que tal voltar para o início e cuidar da sua beleza?
          </p>
        </div>
      </div>
      
      <div className="mt-12 space-x-4">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-fuchsia-600 transition-all shadow-md hover:shadow-lg"
        >
          Voltar ao Início
        </Link>
        <Link 
          href="/servicos" 
          className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all"
        >
          Ver Serviços
        </Link>
      </div>
      
      <div className="mt-16">
        <img 
          src="/logo.png" 
          alt="Gabi Estética Logo" 
          className="h-16 w-16 mx-auto opacity-30 grayscale hover:grayscale-0 transition-all duration-500 rounded-full" 
        />
      </div>
    </div>
  );
}
