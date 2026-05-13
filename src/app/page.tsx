import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-[#1a0b1a]">
        <div className="absolute inset-0 z-0 bg-[#1a0b1a]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0b1a] via-[#1a0b1a]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              Realçando a <span className="text-primary">Beleza</span> que existe em você.
            </h1>
            <p className="text-xl text-fuchsia-100/70 mb-12 max-w-xl leading-relaxed font-medium">
              Especialista em cílios, sobrancelhas e estética avançada. Transforme seu olhar com quem entende de perfeição.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                href="/contato" 
                className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-lg font-black rounded-2xl text-white bg-primary hover:bg-fuchsia-600 transition-all shadow-2xl hover:shadow-fuchsia-500/40 uppercase tracking-widest"
              >
                Agendar Horário
              </Link>
              <Link 
                href="/servicos" 
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/20 backdrop-blur-md text-lg font-black rounded-2xl text-white hover:bg-white hover:text-[#1a0b1a] transition-all uppercase tracking-widest"
              >
                Ver Serviços
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-fuchsia-50 rounded-full blur-3xl opacity-60"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="/images/manicure.jpg" alt="Manicure" className="w-full h-[500px] object-cover" />
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                Por que escolher a <br/><span className="text-primary italic">Gabi Estética?</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-5 items-start">
                   <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 flex items-center justify-center text-primary shrink-0"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                   <div>
                     <h3 className="text-xl font-bold text-gray-900 mb-1">Atendimento com Hora Marcada</h3>
                     <p className="text-gray-500">Sem filas e sem espera. Seu tempo é precioso e nós respeitamos cada minuto.</p>
                   </div>
                </div>
              </div>
              <div className="pt-6">
                 <Link href="/galeria" className="text-primary font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                    Conheça nosso trabalho
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
