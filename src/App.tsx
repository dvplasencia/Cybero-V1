/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  ShieldCheck, 
  Users, 
  Eye, 
  Lock, 
  Mail, 
  Tablet, 
  Network, 
  Settings, 
  Search, 
  Activity, 
  RefreshCw, 
  Headphones, 
  Building2,
  CheckCircle,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

type Tab = 'home' | 'about' | 'personal' | 'business' | 'contact';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const tabs = [
    { id: 'about', label: 'Quien somos' },
    { id: 'personal', label: 'Personas y Familias' },
    { id: 'business', label: 'Empresas' },
    { id: 'contact', label: 'Contactanos' }
  ] as const;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div 
            className="text-2xl font-extrabold text-primary cursor-pointer tracking-tight"
            onClick={() => setCurrentTab('home')}
          >
            Cybero
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as Tab)}
                className={`text-sm font-bold transition-all hover:text-primary ${
                  currentTab === tab.id 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-on-surface-variant'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-stone-200 p-6 flex flex-col gap-4 shadow-xl"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentTab(tab.id as Tab);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-lg font-bold ${
                    currentTab === tab.id ? 'text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentTab === 'home' && <LandingView onNavigate={setCurrentTab} />}
            {currentTab === 'about' && <AboutView />}
            {currentTab === 'personal' && <PersonalView />}
            {currentTab === 'business' && <BusinessView />}
            {currentTab === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="text-2xl font-black text-primary mb-6">Cybero</div>
            <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">
              Protegiendo a las personas detrás de las pantallas. Cyberseguridad con alma humana.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">Compañía</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant font-medium">
              <li><button onClick={() => setCurrentTab('about')} className="hover:text-primary">Sobre nosotros</button></li>
              <li><button onClick={() => setCurrentTab('contact')} className="hover:text-primary">Contacto</button></li>
              <li>Soporte</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">Soluciones</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant font-medium">
              <li><button onClick={() => setCurrentTab('personal')} className="hover:text-primary">Planes Personales</button></li>
              <li><button onClick={() => setCurrentTab('personal')} className="hover:text-primary">Planes Familiares</button></li>
              <li><button onClick={() => setCurrentTab('business')} className="hover:text-primary">Para Empresas</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">Newsletter</h4>
            <p className="text-xs text-on-surface-variant mb-4 font-medium italic">Consejos humanos de seguridad en tu inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="email" className="bg-surface-container-low px-4 py-2 rounded-lg text-sm flex-grow outline-none border border-transparent focus:border-secondary transition-all" />
              <button className="bg-primary text-white p-2 rounded-lg"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-stone-400">
          <p>© 2026, CYBERO, S.A. de C.V.</p>
          <div className="flex gap-8">
            <span>Aviso de Privacidad</span>
            <span>Términos y Condiciones</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LandingView({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <>
      {/* Hero */}
      <header className="relative min-h-[85vh] flex items-center bg-surface-bright overflow-hidden border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10 py-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-secondary font-bold text-[10px] uppercase tracking-widest">
              Human-Centric Protection
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-[1.05] tracking-tight">
              Protegiendo a las personas <span className="text-secondary opacity-90 italic">detrás</span> de las pantallas.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-lg font-medium opacity-80">
              Cyberseguridad con alma humana. Dejamos atrás la complejidad técnica para enfocarnos en lo que realmente importa: tu tranquilidad digital.
            </p>
            <div className="space-y-4 pt-4">
              <p className="text-xs font-black uppercase tracking-widest text-secondary ml-1 opacity-70">Explora membresías:</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onNavigate('personal')}
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-bold soft-shadow hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider"
                >
                  PARA PERSONAS Y FAMILIAS
                </button>
                <button 
                  onClick={() => onNavigate('business')}
                  className="border-2 border-secondary/20 text-secondary px-10 py-5 rounded-2xl font-bold hover:bg-secondary/5 transition-all text-sm uppercase tracking-wider"
                >
                  Para Empresas
                </button>
              </div>
            </div>
          </motion.div>
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="aspect-[4/5] rounded-[4rem] overflow-hidden soft-shadow border-[12px] border-white bg-stone-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                alt="Protección humana detrás de la pantalla" 
                className="w-full h-full object-cover grayscale-[0.1]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-[2.5rem] soft-shadow max-w-[280px]">
              <div className="flex items-center gap-3 mb-3 text-secondary">
                <div className="bg-secondary/10 p-2 rounded-xl"><ShieldCheck size={28} /></div>
                <span className="font-bold text-primary">Estado: Protegido</span>
              </div>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">Tu identidad digital está siendo monitoreada con cuidado humano.</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />
      </header>

      {/* Highlights */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <HighlightCard 
            icon={<Users size={40} className="text-secondary" />}
            title="Empatía Digital"
            desc="Entendemos tus miedos y frustraciones para ofrecerte soluciones que se adaptan a tu vida cotidiana."
          />
          <HighlightCard 
            icon={<Eye size={40} className="text-secondary" />}
            title="Claridad Radical"
            desc="Sin jerga técnica. Reportes simples y acciones claras para que siempre sepas qué está pasando."
          />
          <HighlightCard 
            icon={<ShieldCheck size={40} className="text-secondary" />}
            title="Protección Invisible"
            desc="Trabajamos en segundo plano. Nuestro acompañamiento es constante pero silencioso, permitiéndote navegar sin contratiempos."
          />
        </div>
      </section>

      {/* 7 Layers Section (Shared visual) */}
      <section className="py-32 bg-surface-bright">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-primary mb-4 tracking-tight">Las 7 Capas de Protección</h2>
            <p className="text-on-surface-variant font-medium max-w-xl mx-auto">Un ecosistema integral diseñado para blindar cada aspecto de tu presencia en la red.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">
            <div className="md:col-span-2 md:row-span-2 bg-primary-container text-white p-12 rounded-[3.5rem] flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-10 right-10 text-8xl opacity-10 font-black group-hover:scale-110 transition-transform">01</div>
              <h3 className="text-3xl font-bold mb-4">Identidad digital</h3>
              <p className="opacity-70 leading-relaxed text-lg max-w-xs font-medium">Monitoreo de datos personales en la red.</p>
            </div>
            <div className="bg-secondary-container p-10 rounded-[3.5rem] flex flex-col justify-between group soft-shadow transition-all hover:-translate-y-2">
              <div className="bg-white/50 w-12 h-12 rounded-2xl flex items-center justify-center text-secondary"><Tablet size={24} /></div>
              <h4 className="font-bold text-primary text-xl">02. Dispositivos</h4>
              <p className="text-xs text-on-surface-variant opacity-70">Antivirus, antimalware y control de amenazas.</p>
            </div>
            <div className="bg-white border border-stone-100 p-10 rounded-[3.5rem] flex flex-col justify-between group soft-shadow transition-all hover:-translate-y-2">
              <div className="bg-secondary-container w-12 h-12 rounded-2xl flex items-center justify-center text-primary"><Network size={24} /></div>
              <h4 className="font-bold text-primary text-xl">03. Red doméstica</h4>
              <p className="text-xs text-on-surface-variant opacity-70">Protección de router y WiFi familiar.</p>
            </div>
            <div className="bg-stone-50 p-10 rounded-[3.5rem] flex flex-col justify-between group soft-shadow transition-all hover:-translate-y-2">
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-primary"><ShieldCheck size={24} /></div>
              <h4 className="font-bold text-primary text-xl">04. Navegación segura</h4>
              <p className="text-xs text-on-surface-variant opacity-70">VPN y bloqueo de sitios maliciosos.</p>
            </div>
            <div className="bg-secondary-container/30 p-10 rounded-[3.5rem] flex flex-col justify-between group soft-shadow transition-all hover:-translate-y-2">
              <div className="bg-white/80 w-12 h-12 rounded-2xl flex items-center justify-center text-secondary"><Lock size={24} /></div>
              <h4 className="font-bold text-primary text-xl">05. Contraseñas</h4>
              <p className="text-xs text-on-surface-variant opacity-70">Gestor cifrado y alertas de filtraciones.</p>
            </div>
            <div className="md:col-span-2 bg-white p-12 rounded-[3.5rem] flex flex-col justify-center border border-stone-100 soft-shadow group overflow-hidden relative">
               <div className="flex items-center gap-8 relative z-10">
                <div className="text-5xl font-black text-secondary group-hover:scale-110 transition-transform">06/07</div>
                <div className="flex gap-8">
                  <div>
                    <h4 className="font-bold text-primary text-xl">Dark Web</h4>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">Alerta si tus datos aparecen en foros ilegales.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-xl">Respuesta a incidentes</h4>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">Equipo de expertos disponible 24/7.</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-stone-50 rounded-full blur-2xl -mb-16 -mr-16" />
            </div>
          </div>
        </div>
      </section>

      {/* Threats Managed */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-primary mb-8 tracking-tight">Amenazas Monitoreadas</h2>
          <p className="text-lg text-on-surface-variant font-medium mb-12 opacity-80 leading-relaxed max-w-2xl mx-auto">
            Nuestro radar humano-tecnológico detecta y neutraliza los riesgos más sofisticados del panorama digital hoy.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <ThreatItem label="Robo de Identidad" />
            <ThreatItem label="Fraude Bancario" />
            <ThreatItem label="Ransomware" />
            <ThreatItem label="SIM Swapping" />
            <ThreatItem label="Vishing (Llamadas)" />
            <ThreatItem label="Malware Móvil" />
            <ThreatItem label="Spyware" />
            <ThreatItem label="Fugas en Dark Web" />
          </div>
        </div>
      </section>
    </>
  );
}

function AboutView() {
  return (
    <div className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-6 block">Nuestra Misión</span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-primary mb-12 tracking-tighter">Humano <span className="opacity-40">+</span> Digital</h2>
          <p className="text-2xl text-on-surface-variant leading-relaxed mb-8 font-medium">
            Nacimos de la necesidad de humanizar la seguridad digital. En un mundo saturado de términos técnicos y miedo, Cybero surge como un guardián silencioso.
          </p>
          <p className="text-xl text-on-surface-variant leading-relaxed opacity-80 font-medium italic border-l-4 border-secondary pl-8 py-2">
            "Creemos que detrás de cada cuenta hay un sueño, una familia o una empresa. Protegemos el corazón de la digitalización: el ser humano."
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-surface-container-low p-12 rounded-[4rem] border border-stone-100 flex flex-col gap-10">
            <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">Nuestros Pilares</h3>
            <ul className="space-y-8">
              <AboutPillar 
                title="Empatía Real" 
                desc="Entendemos que la tecnología es un medio, no el fin. Diseñamos para personas con sentimientos, no usuarios con datos." 
              />
              <AboutPillar 
                title="Sencillez Extrema" 
                desc="Eliminamos la fricción técnica para que estar seguro sea tan fácil como dar un paso al frente." 
              />
              <AboutPillar 
                title="Respuesta Ética" 
                desc="Actuamos con integridad absoluta, priorizando tu privacidad por encima de cualquier otro indicador." 
              />
            </ul>
          </div>
          <div className="space-y-8">
            <div className="rounded-[4rem] overflow-hidden aspect-[16/10] soft-shadow">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Our values in action" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-secondary text-white p-12 rounded-[4rem] soft-shadow">
              <h4 className="text-3xl font-black mb-4 tracking-tighter">12+ Millones</h4>
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest leading-loose">Amenazas neutralizadas este año a través de nuestro acompañamiento humano.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalView() {
  return (
    <div className="py-32 bg-surface-bright">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-6 block">Membresías Familiares</span>
          <h2 className="text-5xl font-extrabold text-primary mb-8 tracking-tighter">Tu tranquilidad, <span className="text-secondary">asegurada</span>.</h2>
          <p className="text-xl text-on-surface-variant font-medium max-w-xl mx-auto opacity-80 leading-relaxed">
            Escoge el nivel de blindaje que mejor se adapte a tu vida digital y la de los tuyos.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 items-stretch pt-10">
          <PriceCard
            title="CORE"
            price="$199"
            features={["Monitoreo de identidad", "VPN incluido", "Alertas en tiempo real", "1 dispositivo"]}
          />
          <PriceCard
            title="HOME"
            price="$349"
            popular
            features={["Todo Core +", "Protección red WiFi", "Hasta 5 dispositivos", "Reportes mensuales"]}
          />
          <PriceCard
            title="SHIELD"
            price="$549"
            features={["Todo Home +", "Respuesta a incidentes", "Asesoría legal cyber", "Dispositivos ilimitados"]}
          />
          <PriceCard
            title="CARE"
            price="$849"
            features={["Todo Shield +", "Monitor Dark Web", "Seguro de robo ID", "Soporte prioritario 24/7"]}
          />
        </div>

        {/* Feature Comparison */}
        <div className="mt-40 max-w-4xl mx-auto">
          <div className="bg-white p-12 rounded-[4rem] soft-shadow border border-stone-100 overflow-hidden">
            <h3 className="text-2xl font-bold text-primary mb-12 text-center">El Impacto Cybero</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="py-6 font-bold text-stone-400 uppercase text-[10px] tracking-widest">Característica</th>
                  <th className="py-6 font-bold text-error uppercase text-[10px] tracking-widest">Sin Cybero</th>
                  <th className="py-6 font-bold text-secondary uppercase text-[10px] tracking-widest">Con Cybero</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50 select-none">
                <CompareRow label="Tiempo de detección" bad="Meses (promedio)" good="Segundos / Real-time" />
                <CompareRow label="Respuesta incidente" bad="Reactiva e incierta" good="Proactiva y asistida" />
                <CompareRow label="Cuidado de datos" bad="Vulnerable a fugas" good="Blindaje perimetral" />
                <CompareRow label="Nivel de Estrés" bad="Alto y angustiante" good="Tranquilidad absoluta" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessView() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero / Crisis Section */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#B91C1C] text-white p-6 rounded-2xl flex items-center gap-6 mb-12 shadow-2xl">
            <div className="bg-white/20 p-4 rounded-full">
              <Activity className="text-white" size={32} />
            </div>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight">
              Cuando ocurre un ciberataque, hay personas que quedan expuestas.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BusinessCrisisCard 
              icon={<Users size={24} />}
              title="Empleados y clientes expuestos"
              desc="RFC, CURP, cuentas bancarias, correos y datos de contacto circulan en bases comprometidas. No son solo trabajadores — cualquier persona en tu base de datos es vulnerable."
            />
            <BusinessCrisisCard 
              icon={<Mail size={24} />}
              title="Obligación legal inmediata"
              desc="La LFPDPPP exige notificar y proteger a los afectados. El incumplimiento acarrea multas severas. El reloj corre desde el primer minuto."
            />
            <BusinessCrisisCard 
              icon={<Activity size={24} />}
              title="Riesgo reputacional"
              desc="Sin respuesta visible y rápida, la confianza se fractura: clientes se van, empleados buscan alternativas, y la prensa amplifica el daño."
            />
            <BusinessCrisisCard 
              icon={<RefreshCw size={24} />}
              title="Ventana crítica de 72 horas"
              desc="Las primeras horas son decisivas. Cada minuto sin respuesta aumenta el daño financiero, legal y la exposición de las personas afectadas."
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 bg-surface-bright">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-5xl font-extrabold text-primary tracking-tighter">La solución: Cybero Business</h2>
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-secondary">¿Qué hace?</h3>
              <p className="text-lg text-on-surface-variant leading-relaxed font-medium opacity-80">
                Cybero Business despliega monitoreo de identidad digital y financiera para todas las personas afectadas: empleados, clientes o cualquier titular de datos que haya sido comprometido en el ataque.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed font-medium opacity-80">
                Usamos el mismo motor robusto de nuestro producto B2C, adaptado para empresas: activación masiva por lote, facturación única a la empresa y un dashboard ejecutivo para el equipo de RR.HH. o Seguridad.
              </p>
              <div className="bg-secondary/5 border-l-4 border-secondary p-6 mt-8 rounded-r-2xl">
                <p className="text-sm font-bold text-primary italic leading-relaxed">
                  "El responsable deberá adoptar medidas de seguridad para los titulares afectados tras una vulneración."
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary mt-3">LFPDPPP Art. 20</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            <SolutionFeature 
              icon={<RefreshCw className="text-white" />}
              title="Activación en 48h"
              desc="Onboarding masivo por lote. Enviamos invitaciones a todos los afectados en un solo paso, sin fricción técnica."
            />
            <SolutionFeature 
              icon={<Lock className="text-white" />}
              title="Mismo motor B2C"
              desc="Tecnología probada. Solo añadimos vista corporativa, facturación unificada y dashboard de gestión."
            />
            <SolutionFeature 
              icon={<ShieldCheck className="text-white" />}
              title="Documentación legal"
              desc="Te entregamos el reporte de respuesta para presentar ante autoridades y cumplir con LFPDPPP."
            />
          </div>
        </div>
      </section>

      {/* Who protected Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-primary mb-4 tracking-tight">¿Quiénes pueden ser protegidos?</h2>
            <p className="text-on-surface-variant font-medium opacity-70">Cybero Business cubre a cualquier persona cuyos datos hayan sido comprometidos</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ProtectionColumn 
              icon={<Users size={24} />}
              title="Empleados"
              items={["RFC, CURP y datos de nómina expuestos", "Cuentas de correo corporativo comprometidas", "Accesos y contraseñas filtradas"]}
            />
            <ProtectionColumn 
              icon={<Building2 size={24} />}
              title="Clientes"
              items={["Datos personales en tu base de clientes", "Historial de compras y métodos de pago", "Correos, teléfonos y domicilios filtrados"]}
            />
            <ProtectionColumn 
              icon={<Network size={24} />}
              title="Terceros y proveedores"
              items={["Contactos de proveedores expuestos", "Información de contratos comprometida", "Datos de personas en tu cadena de valor"]}
            />
          </div>
          <div className="mt-12 bg-secondary text-white py-4 px-8 rounded-full text-center text-xs font-bold uppercase tracking-widest">
            Si sus datos están en tu empresa, tú eres el responsable de protegerlos.
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-surface-bright">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl font-extrabold text-primary tracking-tight">Precios — Cybero Business</h2>
            <p className="text-on-surface-variant font-medium mt-2 opacity-70 italic">Contratos 12 meses · Pago anual preferido · Sin costo de activación</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <PriceCardBusiness
              title="SME"
              price="$8,000 – $12,000"
              sub="Hasta 50 personas"
              features={["Activación por lote", "Monitor identidad financiera", "Alertas email + WhatsApp", "Dashboard ejecutivo"]}
            />
            <PriceCardBusiness
              title="Mediana empresa"
              price="$20,000 – $35,000"
              sub="51 – 200 personas"
              popular
              features={["Todo SME +", "Soporte prioritario 24/7", "Reportes de cumplimiento LFPDPPP", "Gestor de cuenta dedicado"]}
            />
            <PriceCardBusiness
              title="Corporativo"
              price="A cotizar"
              sub="200+ personas"
              features={["Todo Mediana +", "SLA garantizado", "Integración SIEM / SOC", "Auditoría trimestral"]}
            />
          </div>
          <p className="mt-8 text-center text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">
            El precio se calcula por número de personas afectadas protegidas, no por número de empleados de la empresa.
          </p>
        </div>
      </section>
    </div>
  );
}

// Business Sub-components
function BusinessCrisisCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all flex flex-col group h-full">
      <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 tracking-tight leading-tight">{title}</h3>
      <p className="text-sm opacity-60 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function SolutionFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] flex items-center gap-8 soft-shadow border border-stone-100 group transition-all hover:-translate-y-1">
      <div className="bg-secondary w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-primary text-xl mb-1">{title}</h4>
        <p className="text-sm text-on-surface-variant font-medium opacity-70">{desc}</p>
      </div>
    </div>
  );
}

function ProtectionColumn({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
  return (
    <div className="bg-white border border-stone-100 rounded-[3rem] overflow-hidden flex flex-col soft-shadow">
      <div className="bg-primary text-white p-8 flex items-center gap-4">
        <div className="bg-white/10 p-3 rounded-2xl">{icon}</div>
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
      <div className="p-10 space-y-8 flex-grow">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 group">
            <div className="shrink-0 text-secondary mt-1"><CheckCircle size={20} /></div>
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed group-hover:text-primary transition-colors">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceCardBusiness({ title, price, sub, features, popular }: { title: string, price: string, sub: string, features: string[], popular?: boolean }) {
  return (
    <div className={`p-12 rounded-[4rem] border-4 flex flex-col transition-all hover:-translate-y-2 relative ${popular ? 'bg-primary text-white border-secondary scale-105 z-10' : 'bg-white text-primary border-stone-100'}`}>
      <h3 className="text-3xl font-black mb-1 uppercase tracking-tighter text-center">{title}</h3>
      <p className={`text-center text-[10px] font-black uppercase tracking-[0.2em] mb-10 ${popular ? 'opacity-50' : 'text-stone-300'}`}>{sub}</p>
      
      <div className="text-center mb-12">
        <span className={`text-4xl font-black ${popular ? 'text-secondary' : 'text-primary'}`}>{price}</span>
        <div className={`text-[10px] font-black uppercase tracking-widest mt-2 ${popular ? 'opacity-50' : 'text-stone-300'}`}>/mes MXN</div>
      </div>

      <ul className="space-y-6 mb-16 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex gap-4 text-xs items-center font-bold tracking-tight">
            <CheckCircle size={18} className="text-secondary shrink-0" /> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-6 rounded-[2rem] font-black transition-all text-xs uppercase tracking-widest shadow-xl ${popular ? 'bg-white text-primary hover:bg-stone-50' : 'bg-primary text-white hover:bg-primary/95'}`}>
        Solicitar Propuesta
      </button>
    </div>
  );
}

function ContactView() {
  return (
    <div className="py-32 bg-surface-bright">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[5rem] p-16 lg:p-24 grid lg:grid-cols-5 gap-24 soft-shadow items-center border border-stone-100">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-5xl font-black text-primary mb-8 tracking-tighter">Hablemos.</h2>
              <p className="text-xl text-on-surface-variant font-medium opacity-80 leading-relaxed pr-10">
                ¿Prefieres un trato más humano? Nuestro equipo está disponible para resolver tus dudas técnicas o comerciales.
              </p>
            </div>
            <div className="space-y-12">
              <ContactChannel icon={<Headphones />} title="Soporte" detail="ayuda@cybero.com" />
              <ContactChannel icon={<Building2 />} title="Alianzas Business" detail="hola@cybero.com" />
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-surface-container-low p-12 rounded-[4rem] space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <Input label="Tu Nombre" placeholder="Nombre completo" />
              <Input label="Tu Email" placeholder="email@ejemplo.com" />
            </div>
            <Input label="Compañía (Opcional)" placeholder="Nombre de empresa" />
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 opacity-60">Tu Consulta</label>
              <textarea placeholder="¿Cómo podemos ayudarte?" rows={5} className="w-full bg-white border-2 border-stone-50 rounded-3xl p-6 focus:border-secondary outline-none text-primary font-medium transition-all" />
            </div>
            <button className="w-full py-6 bg-primary text-white rounded-3xl font-bold shadow-2xl hover:bg-primary/95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3">
              Enviar solicitud <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Low-level UI Components
function HighlightCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-12 rounded-[4rem] bg-stone-50/50 border border-stone-100/30 hover:border-secondary transition-all group cursor-default">
      <div className="mb-8 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <h3 className="text-2xl font-extrabold text-primary mb-5 tracking-tight">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed font-medium opacity-80">{desc}</p>
    </div>
  );
}

function ThreatItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container group transition-colors">
      <div className="w-6 h-6 rounded-full border-4 border-error/20 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-error group-hover:scale-150 transition-transform" />
      </div>
      <span className="font-bold text-primary text-sm opacity-90">{label}</span>
    </div>
  );
}

function LiveEvent({ label, status, time }: { label: string, status: string, time: string }) {
  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-stone-50 soft-shadow group">
      <div>
        <p className="font-bold text-primary text-sm">{label}</p>
        <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mt-1">{status}</p>
      </div>
      <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-lg group-hover:bg-secondary group-hover:text-white transition-all">{time} ago</span>
    </div>
  );
}

function AboutPillar({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="flex gap-6 group">
      <div className="bg-white p-3 h-fit rounded-[1.5rem] text-secondary soft-shadow group-hover:scale-110 transition-transform"><CheckCircle size={24} /></div>
      <div>
        <h4 className="font-black text-primary text-lg uppercase tracking-tight mb-2 underline decoration-secondary/30">{title}</h4>
        <p className="text-on-surface-variant font-medium opacity-80 text-sm leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function CompareRow({ label, bad, good }: { label: string, bad: string, good: string }) {
  return (
    <tr className="group hover:bg-stone-50/50 transition-colors">
      <td className="py-6 font-bold text-primary text-sm">{label}</td>
      <td className="py-6 text-sm text-stone-400 font-medium">{bad}</td>
      <td className="py-6 text-sm text-secondary font-black">{good}</td>
    </tr>
  );
}

function PriceCard({ title, price, features, popular }: { title: string, price: string, features: string[], popular?: boolean }) {
  return (
    <div className={`p-10 rounded-[3.5rem] border-4 ${popular ? 'bg-primary text-white border-secondary scale-105 z-10' : 'bg-white text-primary border-stone-50'} flex flex-col transition-all hover:-translate-y-2 relative`}>
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Más Popular</span>
      )}
      <h3 className="text-2xl font-black mb-1 uppercase tracking-tighter">{title}</h3>
      <div className="flex items-baseline gap-1 mb-10">
        <span className="text-4xl font-black">{price}</span>
        <span className={`text-[10px] font-black uppercase tracking-widest ${popular ? 'opacity-50' : 'text-stone-300'}`}>/mes</span>
      </div>
      <ul className="space-y-5 mb-12 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex gap-3 text-xs items-center font-bold tracking-tight">
            <CheckCircle size={16} className="text-secondary shrink-0" /> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-5 rounded-[2rem] font-black transition-all text-xs uppercase tracking-widest ${popular ? 'bg-secondary text-white hover:opacity-90' : 'bg-primary text-white hover:bg-primary/90'}`}>
        Comenzar
      </button>
    </div>
  );
}

function ContactChannel({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="bg-white p-5 rounded-[2rem] soft-shadow text-secondary group-hover:scale-110 group-hover:rotate-6 transition-all">{icon}</div>
      <div>
        <h5 className="font-black text-primary text-[10px] uppercase tracking-[0.2em] opacity-40">{title}</h5>
        <p className="text-2xl font-black text-secondary leading-none">{detail}</p>
      </div>
    </div>
  );
}

function Input({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 opacity-60">{label}</label>
      <input type="text" placeholder={placeholder} className="w-full bg-white border-2 border-stone-50 rounded-2xl p-5 focus:border-secondary outline-none text-primary font-medium transition-all" />
    </div>
  );
}
