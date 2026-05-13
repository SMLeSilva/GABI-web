import React from 'react';
import { getConfig, getServices } from '@/lib/content.server';

export const dynamic = 'force-dynamic';

export default function Contato() {
  const config = getConfig();
  const categories = getServices();
  const allServices = categories.flatMap(cat => cat.services);

  return (
    <div className="flex-1 bg-fuchsia-50/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Vamos conversar?
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Estamos prontos para tirar suas dúvidas e agendar o seu momento de beleza.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          {/* Informações de Contato */}
          <div className="lg:w-1/3 bg-[#1a0b1a] p-8 lg:p-12 text-white">
            <h2 className="text-3xl font-bold mb-10">Informações</h2>
            
            <div className="space-y-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.481 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.912-.001-3.793-.457-5.489-1.325l-6.505 1.533zm5.272-4.595l.307.182c1.41.838 3.039 1.281 4.707 1.282 5.044 0 9.145-4.102 9.148-9.146.002-2.446-.949-4.746-2.679-6.478s-4.032-2.682-6.48-2.684c-5.044 0-9.145 4.102-9.148 9.146-.001 1.763.506 3.487 1.464 4.985l.2.311-.84 3.067 3.129-.735zm11.391-6.105c-.272-.136-1.613-.797-1.862-.888-.249-.091-.43-.136-.612.136-.182.272-.703.888-.862 1.069-.158.182-.317.204-.589.068-.272-.136-1.15-.425-2.19-1.353-.809-.721-1.355-1.611-1.513-1.883-.158-.272-.017-.419.119-.554.122-.122.272-.318.408-.477.136-.159.182-.272.272-.454.091-.181.045-.34-.023-.477-.068-.136-.612-1.474-.839-2.019-.221-.53-.444-.458-.612-.467-.158-.008-.34-.008-.521-.008s-.476.068-.725.34c-.249.272-.952.931-.952 2.269s.975 2.631 1.111 2.813c.136.182 1.919 2.93 4.648 4.114.649.282 1.155.451 1.549.577.652.208 1.246.179 1.714.11.522-.077 1.613-.659 1.84-1.293.227-.635.227-1.18.158-1.293-.068-.113-.249-.181-.521-.317z"/></svg>
                </div>
                <div>
                  <p className="text-fuchsia-300/60 text-sm font-medium uppercase tracking-wider mb-1">WhatsApp</p>
                  <p className="text-xl font-bold">{config.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-fuchsia-300/60 text-sm font-medium uppercase tracking-wider mb-1">Email</p>
                  <p className="text-xl font-bold break-all">{config.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="text-fuchsia-300/60 text-sm font-medium uppercase tracking-wider mb-1">Endereço</p>
                  <p className="text-lg font-medium leading-tight whitespace-pre-line">
                    {config.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-fuchsia-900/20">
               <p className="text-slate-500 text-sm">Siga-nos nas redes sociais:</p>
               <div className="flex gap-4 mt-4">
                  {config.instagram && (
                    <a href={`https://www.instagram.com/${config.instagram}/`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  )}
                  {config.facebook && (
                    <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  )}
                  {config.tiktok && (
                    <a href={`https://www.tiktok.com/@${config.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31.036 2.512.335 3.6.895.037.019.074.037.112.056V5.41c-1.3-.435-2.656-.636-3.953-.385.01-.137.02-.274.03-.41V12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3c.27 0 .53.036.78.102V4.116c-.26-.013-.52-.02-.78-.02-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6V0h-3.692zM24 4.5V9.5c-1.35-1.1-3.042-1.742-4.88-1.742V4.5c0 .248.016.492.046.733C20.404 4.8 21.6 4.5 22.846 4.5H24z"/></svg>
                    </a>
                  )}
               </div>
            </div>
          </div>

          {/* Formulário de Mensagem */}
          <div className="lg:w-2/3 p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Mande uma Mensagem</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1">
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-gray-50 focus:bg-white" 
                  placeholder="Seu nome" 
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">WhatsApp</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-gray-50 focus:bg-white" 
                  placeholder="(19) 99999-9999" 
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">Assunto</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-gray-50 focus:bg-white" 
                  placeholder="Sobre o que você quer falar?" 
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Mensagem</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-gray-50 focus:bg-white" 
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>
              <div className="col-span-1 md:col-span-2">
                <button 
                  type="button" 
                  className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-fuchsia-600 transition-all shadow-lg hover:shadow-fuchsia-200 text-lg"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
