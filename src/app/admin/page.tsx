"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig } from '@/lib/content';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export default function AdminLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('gerais');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initIdentity = () => {
      const netlifyIdentity = window.netlifyIdentity;
      if (netlifyIdentity) {
        netlifyIdentity.init({ logo: false });

        const currentUser = netlifyIdentity.currentUser();
        if (currentUser) {
          setIsLoggedIn(true);
          setUser(currentUser);
        }

        netlifyIdentity.on('login', (loggedInUser: any) => {
          setIsLoggedIn(true);
          setUser(loggedInUser);
          netlifyIdentity.close();
        });

        netlifyIdentity.on('logout', () => {
          setIsLoggedIn(false);
          setUser(null);
        });
      }
    };

    // Tentar inicializar. Se não estiver pronto, esperar o evento do script
    if (window.netlifyIdentity) {
      initIdentity();
    } else {
      document.addEventListener('netlifyIdentityInit', initIdentity);
    }

    return () => {
      document.removeEventListener('netlifyIdentityInit', initIdentity);
    };
  }, []);

  const openNetlifyLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open();
    } else {
      alert("O sistema de login está carregando. Por favor, aguarde um segundo...");
    }
  };

  // DATA STATE
  const [servicosData, setServicosData] = useState<any>(null);
  const [galeriaData, setGaleriaData] = useState<any>(null);
  const [configData, setConfigData] = useState<SiteConfig | null>(null);

  // FETCH DATA
  const fetchData = async () => {
    try {
      const resServicos = await fetch('/api/admin/content?type=servicos');
      const dataServicos = await resServicos.json();
      setServicosData(dataServicos);

      const resGaleria = await fetch('/api/admin/content?type=galeria');
      const dataGaleria = await resGaleria.json();
      setGaleriaData(dataGaleria);

      const resConfig = await fetch('/api/admin/content?type=config');
      const dataConfig = await resConfig.json();
      setConfigData(dataConfig);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert("Usuário ou senha incorretos.");
    }
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSave = async (type: string, data: any) => {
    if (type === 'config') {
      if (!validateEmail(data.email)) {
        alert("E-mail inválido.");
        return;
      }
      const phoneDigits = data.whatsapp.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        alert("WhatsApp incompleto.");
        return;
      }
    }

    const token = window.netlifyIdentity?.currentUser()?.token?.access_token;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ type, data })
      });
      if (res.ok) {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} salvo com sucesso! O site foi atualizado.`);
      } else {
        alert("Erro ao salvar.");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = () => {
    const title = prompt("Nome da Nova Categoria (ex: Massagens):");
    if (!title) return;
    const newData = { ...servicosData };
    newData.categories.push({
      title: title,
      image: "",
      services: []
    });
    setServicosData(newData);
  };

  const removeCategory = (idx: number) => {
    if (!confirm(`Deseja remover TODA a categoria "${servicosData.categories[idx].title}"?`)) return;
    const newData = { ...servicosData };
    newData.categories.splice(idx, 1);
    setServicosData(newData);
  };

  const updateServiceField = (catIdx: number, sIdx: number, field: string, value: string) => {
    const newData = { ...servicosData };
    newData.categories[catIdx].services[sIdx][field] = value;
    setServicosData(newData);
  };

  const removeService = (catIdx: number, sIdx: number) => {
    if (!confirm("Remover este serviço?")) return;
    const newData = { ...servicosData };
    newData.categories[catIdx].services.splice(sIdx, 1);
    setServicosData(newData);
  };

  const addService = (catIdx: number, name: string, price: string) => {
    if (!name || !price) return alert("Preencha nome e preço.");
    const newData = { ...servicosData };
    newData.categories[catIdx].services.push({ name, price });
    setServicosData(newData);
  };

  const removePhoto = (idx: number) => {
    if (!confirm("Remover esta foto?")) return;
    const newData = { ...galeriaData };
    newData.images.splice(idx, 1);
    setGaleriaData(newData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, catIdx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const token = window.netlifyIdentity?.currentUser()?.token?.access_token;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        const newData = { ...servicosData };
        newData.categories[catIdx].image = result.url;
        setServicosData(newData);
        alert("Imagem enviada e otimizada com sucesso!");
      } else {
        alert("Erro no upload: " + result.error);
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar imagem.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn && servicosData && galeriaData && configData) {
    return (
      <div className="min-h-screen bg-[#faf9fa] flex flex-col md:flex-row font-sans text-gray-900">
        <aside className="w-full md:w-72 bg-[#1a0b1a] text-white flex flex-col shadow-xl z-20">
          <div className="p-8 text-center border-b border-white/5">
            <div className="w-12 h-12 bg-primary mx-auto rounded-lg flex items-center justify-center text-xl font-black mb-4">G</div>
            <h1 className="font-bold text-base uppercase tracking-widest">Gabi Estética</h1>
            {user && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] font-black text-fuchsia-200/50 uppercase tracking-tighter truncate max-w-[120px]">{user.email}</span>
              </div>
            )}
          </div>
          <nav className="flex-1 p-4 space-y-1 mt-4">
             <button onClick={() => setActiveTab('gerais')} className={`w-full flex items-center gap-4 px-5 py-3 rounded-lg transition-all font-bold text-xs uppercase tracking-widest cursor-pointer ${activeTab === 'gerais' ? 'bg-primary text-white shadow-md' : 'text-fuchsia-100/40 hover:bg-white/5'}`}>Configurações</button>
             <button onClick={() => setActiveTab('servicos')} className={`w-full flex items-center gap-4 px-5 py-3 rounded-lg transition-all font-bold text-xs uppercase tracking-widest cursor-pointer ${activeTab === 'servicos' ? 'bg-primary text-white shadow-md' : 'text-fuchsia-100/40 hover:bg-white/5'}`}>Serviços</button>
             <button onClick={() => setActiveTab('galeria')} className={`w-full flex items-center gap-4 px-5 py-3 rounded-lg transition-all font-bold text-xs uppercase tracking-widest cursor-pointer ${activeTab === 'galeria' ? 'bg-primary text-white shadow-md' : 'text-fuchsia-100/40 hover:bg-white/5'}`}>Galeria</button>
          </nav>
          <div className="p-4 mt-auto">
            <button 
              onClick={() => {
                if (window.netlifyIdentity) window.netlifyIdentity.logout();
                setIsLoggedIn(false);
              }} 
              className="w-full py-3 text-red-400 font-bold hover:bg-red-500/10 rounded-lg transition-all text-xs uppercase tracking-widest cursor-pointer"
            >
              Sair do Painel
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
               <div>
                  <h2 className="text-3xl font-black tracking-tight uppercase">{activeTab === 'gerais' ? 'Site Geral' : activeTab === 'servicos' ? 'Nossos Serviços' : 'Galeria Real'}</h2>
                  <p className="text-gray-400 text-sm font-medium">Gerencie o conteúdo público do seu site.</p>
               </div>
               <div className="flex gap-3">
                 {activeTab === 'servicos' && (
                    <button onClick={addCategory} className="px-5 py-3 bg-white border border-primary text-primary font-black rounded-lg hover:bg-primary/5 transition-all text-[10px] uppercase tracking-widest cursor-pointer">+ Nova Categoria</button>
                 )}
                 <button onClick={() => handleSave(activeTab === 'gerais' ? 'config' : activeTab, activeTab === 'servicos' ? servicosData : activeTab === 'galeria' ? galeriaData : configData)} className="px-8 py-3 bg-[#1a0b1a] text-white font-black rounded-lg shadow-lg hover:bg-primary transition-all text-[10px] uppercase tracking-widest disabled:opacity-50 cursor-pointer">
                   {loading ? 'Salvando...' : 'Salvar Tudo'}
                 </button>
               </div>
            </div>

            {activeTab === 'servicos' && servicosData && (
              <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {servicosData.categories.map((cat: any, cIdx: number) => (
                  <div key={cIdx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                    <div className="bg-gray-900 p-6 flex justify-between items-center">
                       <div className="flex items-center gap-6">
                          <div className="relative group/img w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-black">
                             <img src={cat.image || "/images/placeholder.jpg"} className="w-full h-full object-cover opacity-80" />
                             <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, cIdx)} />
                             </label>
                          </div>
                          <input type="text" className="bg-transparent border-none outline-none text-xl font-black text-white w-auto focus:text-primary transition-colors cursor-text" value={cat.title} onChange={(e) => { const newData = {...servicosData}; newData.categories[cIdx].title = e.target.value; setServicosData(newData); }} />
                       </div>
                       <button onClick={() => removeCategory(cIdx)} className="text-white/40 hover:text-red-400 transition-colors cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                    <div className="p-6">
                       <div className="grid grid-cols-1 gap-2">
                          {cat.services.map((s: any, sIdx: number) => (
                            <div key={sIdx} className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-lg hover:bg-fuchsia-50 transition-all border border-transparent">
                               <div className="flex-1"><input type="text" className="w-full bg-transparent border-none outline-none font-bold text-gray-700 text-sm cursor-text" value={s.name} onChange={(e) => updateServiceField(cIdx, sIdx, 'name', e.target.value)} /></div>
                               <div className="flex items-center gap-3"><span className="text-[10px] font-black text-primary">R$</span><input type="text" className="w-20 bg-white p-2 rounded-md border border-gray-100 font-black text-primary text-center text-sm cursor-text" value={s.price.replace('R$', '').trim()} onChange={(e) => updateServiceField(cIdx, sIdx, 'price', `R$ ${e.target.value}`)} /><button onClick={() => removeService(cIdx, sIdx)} className="text-gray-300 hover:text-red-500 transition-colors p-1 cursor-pointer"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button></div>
                            </div>
                          ))}
                       </div>
                       <div className="mt-4 flex gap-3 p-3 bg-primary/5 rounded-lg border border-dashed border-primary/20">
                          <input id={`new-name-${cIdx}`} type="text" placeholder="Novo serviço..." className="flex-1 bg-transparent outline-none text-xs font-bold cursor-text" />
                          <input id={`new-price-${cIdx}`} type="text" placeholder="0,00" className="w-16 bg-transparent outline-none text-xs font-black text-primary text-center cursor-text" />
                          <button onClick={() => { const nInput = document.getElementById(`new-name-${cIdx}`) as HTMLInputElement; const pInput = document.getElementById(`new-price-${cIdx}`) as HTMLInputElement; if(nInput.value && pInput.value) { addService(cIdx, nInput.value, `R$ ${pInput.value}`); nInput.value = ''; pInput.value = ''; } }} className="bg-primary text-white font-black px-4 py-2 rounded-md text-[10px] uppercase tracking-widest cursor-pointer">OK</button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gerais' && configData && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">Contatos</h3>
                    <div className="space-y-3">
                       <div><label className="text-[10px] font-bold text-gray-400 block mb-1">WhatsApp</label><input type="text" className="w-full p-3 bg-gray-50 border rounded-lg font-bold text-sm cursor-text" value={configData.whatsapp} onChange={(e) => setConfigData({...configData, whatsapp: formatWhatsApp(e.target.value)})} placeholder="(00) 00000-0000" /></div>
                       <div><label className="text-[10px] font-bold text-gray-400 block mb-1">E-mail</label><input type="text" className="w-full p-3 bg-gray-50 border rounded-lg font-bold text-sm cursor-text" value={configData.email} onChange={(e) => setConfigData({...configData, email: e.target.value})} placeholder="contato@exemplo.com" /></div>
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">Redes Sociais</h3>
                    <div className="space-y-3">
                       <div><label className="text-[10px] font-bold text-gray-400 block mb-1">Instagram (@usuario)</label><input type="text" className="w-full p-3 bg-gray-50 border rounded-lg font-bold text-sm cursor-text" value={configData.instagram} onChange={(e) => setConfigData({...configData, instagram: e.target.value})} /></div>
                       <div><label className="text-[10px] font-bold text-gray-400 block mb-1">Facebook (link completo)</label><input type="text" className="w-full p-3 bg-gray-50 border rounded-lg font-bold text-sm cursor-text" value={configData.facebook} onChange={(e) => setConfigData({...configData, facebook: e.target.value})} /></div>
                       <div><label className="text-[10px] font-bold text-gray-400 block mb-1">TikTok (@usuario)</label><input type="text" className="w-full p-3 bg-gray-50 border rounded-lg font-bold text-sm cursor-text" value={configData.tiktok} onChange={(e) => setConfigData({...configData, tiktok: e.target.value})} /></div>
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary">Endereço</h3>
                    <textarea className="w-full p-3 bg-gray-50 border rounded-lg font-bold text-sm resize-none cursor-text" rows={7} value={configData.address} onChange={(e) => setConfigData({...configData, address: e.target.value})} />
                 </div>
              </div>
            )}

            {activeTab === 'galeria' && galeriaData && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-in fade-in duration-500">
                {galeriaData.images.map((img: any, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm border border-gray-100">
                    <img src={img.url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all p-3 flex flex-col justify-end">
                       <button onClick={() => removePhoto(idx)} className="w-full py-2 bg-red-500 text-white rounded-lg text-[8px] font-black uppercase cursor-pointer">Excluir</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#1a0b1a]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 text-center">
        <div className="w-16 h-16 bg-primary mx-auto rounded-xl mb-6 flex items-center justify-center text-2xl font-black text-white">G</div>
        <h1 className="text-2xl font-black text-gray-900 mb-1 uppercase tracking-tight">Admin</h1>
        <p className="text-gray-400 mb-8 text-[10px] font-bold uppercase tracking-widest">Escolha o método de acesso</p>
        <div className="space-y-4">
          <button onClick={openNetlifyLogin} className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-lg hover:bg-fuchsia-600 transition-all uppercase tracking-widest text-xs cursor-pointer flex items-center justify-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/></svg>
            Entrar com Netlify
          </button>
          {process.env.NODE_ENV === 'development' && (
            <>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-100"></div>
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">acesso local (dev)</span>
                <div className="flex-1 h-px bg-gray-100"></div>
              </div>
              <form onSubmit={handleLogin} className="space-y-3">
                <input type="text" className="w-full p-4 bg-gray-50 border rounded-xl font-bold outline-none focus:ring-1 focus:ring-primary text-sm cursor-text" placeholder="usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="w-full p-4 bg-gray-50 border rounded-xl font-bold outline-none focus:ring-1 focus:ring-primary text-sm cursor-text" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="w-full py-4 bg-gray-900 text-white font-black rounded-xl shadow-lg hover:bg-black transition-all uppercase tracking-widest text-xs cursor-pointer">Acesso Admin Local</button>
              </form>
            </>
          )}
        </div>
        <Link href="/" className="inline-block mt-8 text-[10px] font-black text-gray-300 hover:text-primary uppercase tracking-widest transition-colors cursor-pointer">← Voltar ao site</Link>
      </div>
    </div>
  );
}
