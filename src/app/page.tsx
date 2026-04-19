"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Smartphone, MapPin, BarChart3, MessageSquare, Bell, Star,
  FileText, Building2, Lock, ArrowRight, ChevronDown, Phone,
  Mail, Menu, X, Camera, Navigation, CheckCircle2, TrendingUp,
  Users, Zap,
} from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// ─── Brand palette ─────────────────────────────────────────────────────────────
const C = {
  yellow: "#F5A623",
  green: "#8DC63F",
  dark: "#2D2D2D",
  hero: "#1A1A2E",
  bg: "#FAFAFA",
  white: "#FFFFFF",
  muted: "#6B7280",
} as const;

// ─── Glassmorphism spotlight card ─────────────────────────────────────────────
function GlassCard({
  children,
  className = "",
  dark = false,
  accentColor = C.yellow,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  accentColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.removeProperty("--spot-x");
    el.style.removeProperty("--spot-y");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 ${className}`}
      style={{
        background: dark
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: dark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(255,255,255,0.8)",
        boxShadow: dark
          ? "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = dark
          ? `0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px ${accentColor}30, inset 0 1px 0 rgba(255,255,255,0.08)`
          : `0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px ${accentColor}40, inset 0 1px 0 rgba(255,255,255,0.9)`;
      }}
    >
      {/* Spotlight radial */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${accentColor}18, transparent 70%)`,
        }}
      />
      {/* Top gloss line */}
      <span
        className="pointer-events-none absolute top-0 left-4 right-4 h-px"
        style={{
          background: dark
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  children,
  className = "",
  style,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

// ─── Stagger child ─────────────────────────────────────────────────────────────
function Stagger({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <div className="h-px w-8" style={{ background: C.yellow }} />
      <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: light ? C.yellow : C.yellow }}>
        {children}
      </span>
      <div className="h-px w-8" style={{ background: C.yellow }} />
    </div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ target, prefix = "", suffix = "", duration = 2000 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <div ref={ref} className="tabular-nums">{prefix}{val}{suffix}</div>
  );
}

// ─── Dashboard Mockup (inside ContainerScroll) ────────────────────────────────
function DashboardMockup() {
  return (
    <div className="w-full h-full flex gap-3 p-4 overflow-hidden" style={{ background: "#0F0F1E" }}>
      {/* Sidebar */}
      <div className="w-14 flex-shrink-0 flex flex-col gap-3 items-center py-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${C.yellow}22` }}>
          <div className="w-4 h-4 rounded-sm" style={{ background: C.yellow }} />
        </div>
        {[C.yellow, C.green, C.yellow, C.green, C.yellow].map((c, i) => (
          <div key={i} className="w-8 h-8 rounded-lg" style={{ background: `${c}14`, border: `1px solid ${c}22` }} />
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex gap-2 items-center">
            <div className="w-20 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
            <div className="w-14 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
          <div className="w-7 h-7 rounded-full" style={{ background: `${C.yellow}30` }} />
        </div>
        {/* KPI row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Total", val: "1.247", c: C.yellow },
            { label: "Em andamento", val: "318", c: C.green },
            { label: "Resolvidas", val: "891", c: C.green },
            { label: "Taxa", val: "87%", c: C.yellow },
          ].map((k, i) => (
            <div key={i} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${k.c}20` }}>
              <div className="text-[9px] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{k.label}</div>
              <div className="text-sm font-bold" style={{ color: k.c }}>{k.val}</div>
            </div>
          ))}
        </div>
        {/* Chart area */}
        <div className="flex-1 grid grid-cols-5 gap-2">
          {/* Bar chart */}
          <div className="col-span-3 rounded-xl p-3 flex flex-col gap-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-24 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div className="flex-1 flex items-end gap-1.5 pt-2">
              {[60, 80, 45, 90, 70, 55, 85, 75, 95, 65, 88, 72].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{
                  height: `${h}%`,
                  background: i % 3 === 0
                    ? `linear-gradient(180deg, ${C.yellow}cc, ${C.yellow}44)`
                    : `linear-gradient(180deg, ${C.green}cc, ${C.green}44)`,
                }} />
              ))}
            </div>
          </div>
          {/* Map placeholder */}
          <div className="col-span-2 rounded-xl p-3 flex flex-col gap-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-16 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div className="flex-1 relative rounded-lg overflow-hidden" style={{ background: "rgba(141,198,63,0.06)" }}>
              {[[35, 40], [55, 55], [45, 70], [65, 35], [30, 65], [70, 60]].map(([x, y], i) => (
                <div key={i} className="absolute w-2.5 h-2.5 rounded-full"
                  style={{ left: `${x}%`, top: `${y}%`, background: i % 2 === 0 ? `${C.yellow}cc` : `${C.green}cc`, boxShadow: `0 0 8px ${i % 2 === 0 ? C.yellow : C.green}80` }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-2">
          {["Infra", "Saúde", "Edu"].map((s, i) => (
            <div key={i} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-[8px] mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>{s}</div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full" style={{ width: `${60 + i * 15}%`, background: `linear-gradient(90deg, ${C.yellow}, ${C.green})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#como-funciona", label: "Como Funciona" },
    { href: "#gestores", label: "Para Gestores" },
    { href: "#cidadaos", label: "Para Cidadãos" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? `${C.dark}F0` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 1px 32px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex-shrink-0">
            <Image src="/logoparticipa2.png" alt="Participa Cidade" width={160} height={48}
              className="h-10 w-auto object-contain" priority />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                className="text-sm font-medium transition-colors duration-200 cursor-pointer"
                style={{ color: scrolled ? "rgba(255,255,255,0.75)" : C.dark }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.yellow)}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "rgba(255,255,255,0.75)" : C.dark)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href="https://participa-cidade-production.up.railway.app"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer hover:opacity-90 hover:-translate-y-px transition-all duration-200"
              style={{ background: C.yellow, color: C.dark }}>
              Acesso ao Sistema <ArrowRight size={14} />
            </a>
          </div>

          <button className="lg:hidden p-2 cursor-pointer"
            style={{ color: scrolled ? "white" : C.dark }}
            onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: `${C.dark}FA`, borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.href} href={l.href}
                  className="text-base font-medium cursor-pointer"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                  onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a href="https://participa-cidade-production.up.railway.app"
                target="_blank" rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold cursor-pointer"
                style={{ background: C.yellow, color: C.dark }}>
                Acesso ao Sistema <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero Section — light bg + BackgroundPaths ────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: C.bg }}
    >
      {/* Animated SVG background paths */}
      <BackgroundPaths />

      {/* Subtle radial glow in brand colors */}
      <div className="absolute pointer-events-none"
        style={{ top: "15%", left: "5%", width: 600, height: 600,
          background: `radial-gradient(circle, ${C.yellow}0A 0%, transparent 65%)`, borderRadius: "50%" }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: "10%", right: "5%", width: 500, height: 500,
          background: `radial-gradient(circle, ${C.green}0A 0%, transparent 65%)`, borderRadius: "50%" }} />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, ${C.dark}18 0.7px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center py-32 pt-36">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 mx-auto"
          style={{ borderColor: `${C.yellow}50`, background: `${C.yellow}0E` }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.yellow }} />
          <span className="text-sm font-semibold" style={{ color: C.dark }}>
            Canal oficial entre cidadão e prefeitura
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-[1.05] mb-6"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: C.dark }}
        >
          <span className="block">Sua cidade ouve você.</span>
          <span className="block mt-1" style={{ color: C.dark }}>
            Sua gestão age com dados.
          </span>
        </motion.h1>

        {/* Accent underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-1.5 mx-auto mb-8 rounded-full origin-left"
          style={{ background: `linear-gradient(90deg, ${C.yellow}, ${C.green})` }}
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: C.muted }}
        >
          O Participa Cidade conecta cidadãos e gestores públicos em um canal direto,
          transparente e rastreável. Do relato ao resultado, tudo em tempo real.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contato"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold cursor-pointer hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: C.yellow, color: C.dark, boxShadow: `0 8px 32px ${C.yellow}40` }}>
            Quero para minha cidade
            <ArrowRight size={18} />
          </a>
          <a href="#cidadaos"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold border cursor-pointer hover:bg-black/5 transition-all duration-200"
            style={{ borderColor: `${C.dark}30`, color: C.dark }}>
            Sou cidadão, quero participar
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2"
          style={{ color: `${C.dark}50` }}
        >
          <span className="text-xs tracking-widest uppercase">Role para baixo</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Impact Numbers ───────────────────────────────────────────────────────────
function ImpactSection() {
  const stats = [
    { prefix: "-", target: 60, suffix: "%", label: "Redução de demandas sem resposta" },
    { prefix: "+", target: 87, suffix: "%", label: "Satisfação cidadã esperada" },
    { prefix: "<", target: 24, suffix: "h", label: "Tempo médio de resposta" },
    { prefix: "", target: 100, suffix: "%", label: "Ocorrências rastreadas" },
  ];

  return (
    <Section style={{ background: C.dark }} className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((s, i) => (
            <Stagger key={i} delay={i * 0.08}>
              <GlassCard dark accentColor={i % 2 === 0 ? C.yellow : C.green}
                className="rounded-2xl p-6 sm:p-8 text-center h-full">
                <div className="text-4xl sm:text-5xl font-black mb-2 leading-none"
                  style={{ color: i % 2 === 0 ? C.yellow : C.green }}>
                  <Counter prefix={s.prefix} target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-sm leading-snug font-medium"
                  style={{ color: "rgba(255,255,255,0.55)" }}>
                  {s.label}
                </div>
              </GlassCard>
            </Stagger>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Dashboard Preview (ContainerScroll) ─────────────────────────────────────
function DashboardPreviewSection() {
  return (
    <div style={{ background: C.dark }}>
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: C.yellow }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.yellow }}>
                Painel de Gestão
              </span>
              <div className="h-px w-8" style={{ background: C.yellow }} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Gestão eficiente começa com
              <br />
              <span style={{ color: C.yellow }}>informação real</span>
            </h2>
            <p className="text-base sm:text-lg mt-4 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              Dashboard analítico com dados em tempo real, mapa de calor geográfico e índice de satisfação cidadã.
            </p>
          </div>
        }
      >
        <DashboardMockup />
      </ContainerScroll>
    </div>
  );
}

// ─── Citizen Section ─────────────────────────────────────────────────────────
function CitizenSection() {
  const cards = [
    {
      icon: Camera, color: C.yellow,
      title: "Registre em segundos",
      desc: "Fotografe o problema, marque a localização no mapa e descreva em poucas palavras. O app faz o resto.",
    },
    {
      icon: Navigation, color: C.green,
      title: "Acompanhe cada etapa",
      desc: "Receba notificações em tempo real sobre o andamento da sua solicitação — do registro à resolução.",
    },
    {
      icon: Star, color: C.yellow,
      title: "Avalie e contribua",
      desc: "Após a resolução, avalie o atendimento. Seu feedback melhora continuamente o serviço público da sua cidade.",
    },
  ];

  return (
    <Section id="cidadaos" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <Stagger className="text-center mb-14">
          <SectionLabel>Para o Cidadão</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: C.dark }}>
            Você tem voz. <span style={{ color: C.green }}>Use.</span>
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: C.muted }}>
            Um canal direto e oficial para você registrar, acompanhar e avaliar cada demanda da sua cidade.
          </p>
        </Stagger>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Stagger key={i} delay={i * 0.12}>
              <GlassCard className="rounded-2xl p-7 sm:p-8 h-full" accentColor={c.color}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${c.color}18` }}>
                  <c.icon size={26} style={{ color: c.color }} strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: C.dark }}>{c.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: C.muted }}>{c.desc}</p>
              </GlassCard>
            </Stagger>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Manager Section ──────────────────────────────────────────────────────────
function ManagerSection() {
  const cards = [
    {
      icon: BarChart3, color: C.yellow,
      title: "Dashboard em tempo real",
      desc: "Acompanhe o desempenho de cada secretaria, volume de demandas, prazos e taxa de resolução em um único painel.",
    },
    {
      icon: MapPin, color: C.green,
      title: "Mapa de calor geográfico",
      desc: "Visualize onde estão as demandas na cidade. Identifique regiões críticas e direcione recursos com precisão.",
    },
    {
      icon: TrendingUp, color: C.yellow,
      title: "Índice de satisfação mensurável",
      desc: "Meça continuamente a percepção dos cidadãos por secretaria, região e período. Dados para decisões estratégicas.",
    },
  ];

  return (
    <Section id="gestores" className="py-20 sm:py-28" style={{ background: C.hero }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <Stagger className="text-center mb-14">
          <SectionLabel light>Para o Gestor</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
            Gestão eficiente começa com informação real
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Ferramentas analíticas que transformam demandas cidadãs em inteligência de gestão.
          </p>
        </Stagger>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Stagger key={i} delay={i * 0.12}>
              <GlassCard dark className="rounded-2xl p-7 sm:p-8 h-full" accentColor={c.color}>
                {/* Color glow top-right */}
                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-15 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${c.color}, transparent 70%)` }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${c.color}20` }}>
                  <c.icon size={26} style={{ color: c.color }} strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{c.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{c.desc}</p>
              </GlassCard>
            </Stagger>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── How it Works ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      n: "01", icon: Smartphone, color: C.yellow,
      title: "Cidadão registra pelo app",
      desc: "Foto, localização GPS e descrição em menos de 2 minutos. Disponível para iOS e Android.",
    },
    {
      n: "02", icon: CheckCircle2, color: C.green,
      title: "Equipe valida e encaminha",
      desc: "Cada solicitação é validada e direcionada com prazo para a secretaria responsável.",
    },
    {
      n: "03", icon: Star, color: C.yellow,
      title: "Resolução e avaliação",
      desc: "A secretaria resolve, o cidadão confirma e avalia. Tudo registrado e auditável.",
    },
  ];

  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-80px" });

  return (
    <Section id="como-funciona" className="py-20 sm:py-28" style={{ background: C.white }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <Stagger className="text-center mb-16">
          <SectionLabel>Como Funciona</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: C.dark }}>
            Do problema à solução em 3 passos
          </h2>
        </Stagger>

        <div className="relative">
          {/* Animated connector line */}
          <div ref={lineRef}
            className="hidden md:block absolute top-[3.5rem] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 overflow-hidden rounded-full"
            style={{ background: "rgba(45,45,45,0.08)" }}>
            <motion.div
              className="h-full origin-left"
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: `linear-gradient(90deg, ${C.yellow}, ${C.green})` }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 relative z-10">
            {steps.map((s, i) => (
              <Stagger key={i} delay={0.2 + i * 0.18}>
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${C.dark}, #4A4A5A)`,
                        boxShadow: `0 8px 32px rgba(0,0,0,0.15), 0 0 0 4px ${s.color}18`,
                      }}>
                      <s.icon size={28} style={{ color: s.color }} strokeWidth={1.8} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                      style={{ background: s.color, color: C.dark }}>
                      {parseInt(s.n)}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: C.dark }}>{s.title}</h3>
                  <p className="text-base leading-relaxed max-w-xs" style={{ color: C.muted }}>{s.desc}</p>
                </div>
              </Stagger>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    { icon: Smartphone, color: C.yellow, title: "App iOS e Android", desc: "Experiência nativa para o cidadão" },
    { icon: MapPin, color: C.green, title: "Mapa de calor", desc: "Georreferenciamento de todas as demandas" },
    { icon: BarChart3, color: C.yellow, title: "Dashboard analítico", desc: "Dados em tempo real por secretaria" },
    { icon: MessageSquare, color: C.green, title: "Chat integrado", desc: "Comunicação direta cidadão-secretaria" },
    { icon: Bell, color: C.yellow, title: "Notificações push", desc: "Cidadão informado em cada etapa" },
    { icon: Star, color: C.green, title: "Índice de satisfação", desc: "Avaliação após cada resolução" },
    { icon: FileText, color: C.yellow, title: "Relatórios automáticos", desc: "Exportação e auditoria completa" },
    { icon: Building2, color: C.green, title: "Câmaras municipais", desc: "Suporte ao poder legislativo" },
    { icon: Lock, color: C.yellow, title: "Dados auditáveis", desc: "Transparência e rastreabilidade total" },
  ];

  return (
    <Section id="funcionalidades" className="py-20 sm:py-28" style={{ background: C.hero }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <Stagger className="text-center mb-14">
          <SectionLabel light>Funcionalidades</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Tudo que sua cidade precisa
          </h2>
          <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Uma plataforma completa para prefeituras modernas e cidadãos ativos.
          </p>
        </Stagger>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <Stagger key={i} delay={Math.floor(i / 3) * 0.08 + (i % 3) * 0.04}>
              <GlassCard dark className="rounded-2xl h-full" accentColor={f.color}>
                <div className="flex items-start gap-4 p-5 sm:p-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${f.color}18` }}>
                    <f.icon size={18} style={{ color: f.color }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base mb-1">{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{f.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </Stagger>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <Section id="contato" className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${C.yellow} 0%, #E8941A 40%, ${C.green} 100%)` }}>
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "rgba(255,255,255,0.4)" }} />
      <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full opacity-15 pointer-events-none"
        style={{ background: "rgba(45,45,45,0.3)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Stagger>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6" style={{ color: C.dark }}>
            Conecte sua cidade.
            <br />Comece agora.
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(45,45,45,0.75)" }}>
            Agende uma demonstração gratuita e veja o Participa Cidade em funcionamento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a href="tel:+5514996114720"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold cursor-pointer hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
              style={{ background: C.dark, color: C.white, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
              <Phone size={18} />
              Agendar Demonstração
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
            <a href="tel:+5514996114720"
              className="flex items-center gap-2 text-sm font-semibold hover:opacity-70 cursor-pointer transition-opacity"
              style={{ color: "rgba(45,45,45,0.7)" }}>
              <Phone size={15} /> (14) 99611-4720
            </a>
            <a href="mailto:contato@vetechsystems.com.br"
              className="flex items-center gap-2 text-sm font-semibold hover:opacity-70 cursor-pointer transition-opacity"
              style={{ color: "rgba(45,45,45,0.7)" }}>
              <Mail size={15} /> contato@vetechsystems.com.br
            </a>
          </div>
        </Stagger>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 border-t"
      style={{ background: C.hero, borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <Image src="/logoparticipa2.png" alt="Participa Cidade" width={140} height={42}
            className="h-9 w-auto object-contain" />

          <p className="text-sm text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
            Desenvolvido por{" "}
            <a href="https://www.vetechsystems.com.br" target="_blank" rel="noopener noreferrer"
              className="transition-colors cursor-pointer"
              style={{ color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.yellow)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
              VETech Systems
            </a>{" "}
            · © 2026 Todos os direitos reservados
          </p>

          <div className="flex gap-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer">Política de Privacidade</a>
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactSection />
        <DashboardPreviewSection />
        <CitizenSection />
        <ManagerSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
