"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/galeria', label: 'Galeria' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <img src="/logo.png" alt="Gabi Estética Logo" className="h-10 w-10 object-cover rounded-full" />
              <span className="hidden sm:inline">Gabi Estética</span>
            </Link>
          </div>
          <nav className="flex space-x-6 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`text-sm font-bold transition-all relative py-1 ${
                    isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in slide-in-from-left-1 duration-300"></span>
                  )}
                </Link>
              );
            })}
            <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest ml-4">
              Acesso
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
