"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteConfig } from '@/lib/content';

export default function Footer() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?type=config', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Erro ao carregar footer:", err));
  }, []);

  // Fallback se ainda estiver carregando
  const currentConfig = config || {
    whatsapp: "(19) 99251-9060",
    email: "contato.gabiestetica@gmail.com",
    address: "Rua República Dominicana, 100\nPq. Res. Belinha Ometto\nLimeira - SP | 13483-514",
    instagram: "_gabihh_silva_"
  };

  return (
    <footer className="bg-[#1a0b1a] text-slate-300 pt-16 pb-8 mt-auto border-t border-fuchsia-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Sobre */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <img src="/logo.png" alt="Gabi Estética Logo" className="h-12 w-12 rounded-full border-2 border-primary/20 group-hover:border-primary transition-all" />
              <span className="text-2xl font-bold text-white tracking-tight">Gabi Estética</span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm mb-6">
              Transformando olhares e elevando a autoestima com técnicas exclusivas e atendimento personalizado em Limeira.
            </p>
            <div className="flex space-x-4">
               {/* Instagram */}
               {currentConfig.instagram && (
                 <a href={`https://www.instagram.com/${currentConfig.instagram}/`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-fuchsia-900/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-slate-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                 </a>
               )}
               {/* Facebook */}
               {currentConfig.facebook && (
                 <a href={currentConfig.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-fuchsia-900/20 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all text-slate-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                 </a>
               )}
               {/* TikTok */}
               {currentConfig.tiktok && (
                 <a href={`https://www.tiktok.com/@${currentConfig.tiktok}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-fuchsia-900/20 flex items-center justify-center hover:bg-black hover:text-white transition-all text-slate-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31.036 2.512.335 3.6.895.037.019.074.037.112.056V5.41c-1.3-.435-2.656-.636-3.953-.385.01-.137.02-.274.03-.41V12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3c.27 0 .53.036.78.102V4.116c-.26-.013-.52-.02-.78-.02-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6V0h-3.692zM24 4.5V9.5c-1.35-1.1-3.042-1.742-4.88-1.742V4.5c0 .248.016.492.046.733C20.404 4.8 21.6 4.5 22.846 4.5H24z"/></svg>
                 </a>
               )}
               {/* WhatsApp */}
               <a href={`https://wa.me/55${currentConfig.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-fuchsia-900/20 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all text-slate-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.481 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.912-.001-3.793-.457-5.489-1.325l-6.505 1.533zm5.272-4.595l.307.182c1.41.838 3.039 1.281 4.707 1.282 5.044 0 9.145-4.102 9.148-9.146.002-2.446-.949-4.746-2.679-6.478s-4.032-2.682-6.48-2.684c-5.044 0-9.145 4.102-9.148 9.146-.001 1.763.506 3.487 1.464 4.985l.2.311-.84 3.067 3.129-.735zm11.391-6.105c-.272-.136-1.613-.797-1.862-.888-.249-.091-.43-.136-.612.136-.182.272-.703.888-.862 1.069-.158.182-.317.204-.589.068-.272-.136-1.15-.425-2.19-1.353-.809-.721-1.355-1.611-1.513-1.883-.158-.272-.017-.419.119-.554.122-.122.272-.318.408-.477.136-.159.182-.272.272-.454.091-.181.045-.34-.023-.477-.068-.136-.612-1.474-.839-2.019-.221-.53-.444-.458-.612-.467-.158-.008-.34-.008-.521-.008s-.476.068-.725.34c-.249.272-.952.931-.952 2.269s.975 2.631 1.111 2.813c.136.182 1.919 2.93 4.648 4.114.649.282 1.155.451 1.549.577.652.208 1.246.179 1.714.11.522-.077 1.613-.659 1.84-1.293.227-.635.227-1.18.158-1.293-.068-.113-.249-.181-.521-.317z"/></svg>
               </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Mapa do Site</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Início</Link></li>
              <li><Link href="/servicos" className="hover:text-primary transition-colors">Serviços</Link></li>
              <li><Link href="/galeria" className="hover:text-primary transition-colors">Galeria</Link></li>
              <li><Link href="/contato" className="hover:text-primary transition-colors">Agendamento</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold mb-6">Atendimento</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="whitespace-pre-line">{currentConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>{currentConfig.email}</span>
              </li>
              <li className="flex items-center gap-3 text-primary font-semibold">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>{currentConfig.whatsapp}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-fuchsia-900/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Gabi Estética. Todos os direitos reservados.</p>
          <Link href="/admin" className="hover:text-primary transition-colors opacity-50 hover:opacity-100 italic">Login Admin</Link>
        </div>
      </div>
    </footer>
  );
}
