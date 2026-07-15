import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// ─── Brand palette (mesma paleta usada em src/app/page.tsx) ──────────────────
const C = {
  yellow: "#F5A623",
  green: "#8DC63F",
  dark: "#2D2D2D",
  hero: "#1A1A2E",
  bg: "#FAFAFA",
  white: "#FFFFFF",
  muted: "#6B7280",
} as const;

export const metadata: Metadata = {
  title: "Política de Privacidade — Participa Cidade",
  description:
    "Como o Participa Cidade coleta, usa e protege os dados pessoais de cidadãos e gestores públicos, em conformidade com a LGPD.",
};

function SimpleHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: `${C.white}F5`, backdropFilter: "blur(12px)", borderColor: "rgba(45,45,45,0.08)" }}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logoparticipa2.png"
            alt="Participa Cidade"
            width={160}
            height={48}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors"
          style={{ color: C.dark }}
        >
          <ArrowLeft size={15} />
          Voltar ao site
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t" style={{ background: C.hero, borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <Image
            src="/logoparticipa2.png"
            alt="Participa Cidade"
            width={140}
            height={42}
            className="h-9 w-auto object-contain"
          />
          <p className="text-sm text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
            Desenvolvido por{" "}
            <a
              href="https://www.vetechsystems.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors cursor-pointer"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              VETech Systems
            </a>{" "}
            · © 2026 Todos os direitos reservados
          </p>
          <div className="flex gap-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <Link href="/politica-de-privacidade" className="hover:text-white/60 transition-colors cursor-pointer">
              Política de Privacidade
            </Link>
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Blocos de conteúdo reutilizáveis ─────────────────────────────────────────
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl sm:text-3xl font-black mt-14 mb-5 pb-3 border-b"
      style={{ color: C.dark, borderColor: "rgba(45,45,45,0.08)" }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg sm:text-xl font-bold mt-8 mb-3" style={{ color: C.dark }}>
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-relaxed mb-4" style={{ color: C.muted }}>
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2.5 mb-6">
      {children}
    </ul>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-base leading-relaxed" style={{ color: C.muted }}>
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.yellow }} />
      <span>{children}</span>
    </li>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: C.dark, fontWeight: 700 }}>{children}</strong>;
}

export default function PoliticaDePrivacidade() {
  return (
    <>
      <SimpleHeader />

      <main style={{ background: C.bg }} className="min-h-screen">
        {/* Título */}
        <div className="py-16 sm:py-20" style={{ background: C.white }}>
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="h-px w-8" style={{ background: C.yellow }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.yellow }}>
                LGPD · Lei nº 13.709/2018
              </span>
              <div className="h-px w-8" style={{ background: C.yellow }} />
            </div>
            <h1 className="font-black leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.dark }}>
              Política de Privacidade
            </h1>
            <p className="text-base mt-4" style={{ color: C.muted }}>
              Última atualização: <Strong>14 de julho de 2026</Strong>
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <article className="max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <div
            className="rounded-3xl p-7 sm:p-12"
            style={{ background: C.white, boxShadow: "0 4px 32px rgba(0,0,0,0.05)", border: "1px solid rgba(45,45,45,0.06)" }}
          >
            <H2>1. Quem somos</H2>
            <P>
              O Participa Cidade é uma plataforma de gestão participativa municipal desenvolvida e operada pela{" "}
              <Strong>Vetech Systems</Strong> (&ldquo;nós&rdquo;, &ldquo;nossa empresa&rdquo;), que atua como
              controladora dos dados pessoais tratados nesta política, nos termos da Lei Geral de Proteção de Dados
              (Lei nº 13.709/2018 — LGPD).
            </P>
            <P>
              Esta política se aplica ao aplicativo móvel Participa Cidade (Android e iOS), ao painel administrativo
              web e ao site institucional.
            </P>

            <H2>2. Quais dados coletamos</H2>

            <H3>2.1 Dados fornecidos no cadastro</H3>
            <UL>
              <LI>Nome completo</LI>
              <LI>Número de telefone (verificado por código enviado via SMS)</LI>
              <LI>E-mail (quando aplicável ao perfil de uso)</LI>
              <LI>Cidade de residência</LI>
            </UL>

            <H3>2.2 Dados coletados no uso do aplicativo</H3>
            <UL>
              <LI><Strong>Fotos</Strong> anexadas ao registrar uma reclamação ou ocorrência</LI>
              <LI>
                <Strong>Localização geográfica</Strong> (latitude/longitude) do local da reclamação, fornecida com a
                permissão do usuário
              </LI>
              <LI>
                <Strong>Conteúdo de mensagens</Strong> trocadas no chat entre cidadão e secretaria responsável
              </LI>
              <LI>
                <Strong>Token de notificação push</Strong>, usado exclusivamente para enviar alertas sobre o
                andamento das suas reclamações
              </LI>
            </UL>

            <H3>2.3 Dados coletados automaticamente</H3>
            <UL>
              <LI>Data e hora de acesso</LI>
              <LI>Informações técnicas do dispositivo, necessárias ao funcionamento do aplicativo</LI>
            </UL>

            <H2>3. Para que usamos seus dados</H2>
            <div className="overflow-x-auto mb-6 -mx-2 px-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ borderBottom: `2px solid ${C.yellow}` }}>
                    <th className="text-left py-3 pr-4 font-bold" style={{ color: C.dark }}>
                      Finalidade
                    </th>
                    <th className="text-left py-3 font-bold" style={{ color: C.dark }}>
                      Base legal (LGPD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Criar e gerenciar sua conta de usuário", "Execução de contrato / procedimento preliminar"],
                    [
                      "Registrar e encaminhar reclamações à prefeitura ou câmara municipal",
                      "Execução de política pública / execução de contrato",
                    ],
                    [
                      "Enviar notificações sobre o andamento da sua reclamação (som e ícone no app)",
                      "Execução de contrato",
                    ],
                    ["Verificar seu número de telefone no cadastro (SMS)", "Execução de contrato / segurança"],
                    [
                      "Exibir mapas e estatísticas públicas de forma agregada e anonimizada",
                      "Interesse legítimo / transparência pública",
                    ],
                    ["Cumprir obrigações legais e responder a autoridades competentes", "Cumprimento de obrigação legal"],
                  ].map(([finalidade, base], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(45,45,45,0.06)" }}>
                      <td className="py-3 pr-4 leading-relaxed" style={{ color: C.muted }}>
                        {finalidade}
                      </td>
                      <td className="py-3 leading-relaxed" style={{ color: C.muted }}>
                        {base}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <H2>4. Com quem compartilhamos seus dados</H2>
            <UL>
              <LI>
                <Strong>Prefeitura ou Câmara Municipal</Strong> da sua cidade, para que a reclamação seja atendida
                pelo departamento responsável
              </LI>
              <LI>
                <Strong>Provedores de infraestrutura técnica</Strong>, que processam dados em nosso nome sob
                obrigação de confidencialidade:
                <ul className="mt-2.5 ml-1 space-y-2">
                  {[
                    "Armazenamento de fotos (Cloudinary)",
                    "Envio de SMS de verificação (Twilio)",
                    "Notificações push (Google Firebase / Expo)",
                    "Hospedagem do banco de dados e aplicação (Railway, Vercel)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base leading-relaxed" style={{ color: C.muted }}>
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.green }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </LI>
            </UL>
            <P>
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de publicidade.
            </P>

            <H2>5. Por quanto tempo guardamos seus dados</H2>
            <P>
              Mantemos seus dados enquanto sua conta estiver ativa e pelo período adicional necessário para cumprir
              obrigações legais ou resolver eventuais disputas. Reclamações e seu histórico permanecem registrados
              para fins de transparência pública e auditoria da gestão municipal, podendo ser anonimizados após esse
              período.
            </P>

            <H2>6. Segurança dos dados</H2>
            <P>Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo:</P>
            <UL>
              <LI>Senhas armazenadas com criptografia (hash bcrypt), nunca em texto simples</LI>
              <LI>Conexões criptografadas (HTTPS/TLS) em todas as comunicações</LI>
              <LI>
                Controle de acesso por perfil de usuário (cidadão, secretário, validador, prefeito, vereador,
                administrador)
              </LI>
              <LI>Limitação de tentativas de login para prevenir acessos indevidos</LI>
            </UL>

            <H2>7. Seus direitos como titular de dados</H2>
            <P>Nos termos da LGPD, você tem direito a:</P>
            <UL>
              <LI>Confirmar a existência de tratamento dos seus dados</LI>
              <LI>Acessar seus dados</LI>
              <LI>Corrigir dados incompletos, inexatos ou desatualizados</LI>
              <LI>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</LI>
              <LI>Solicitar a portabilidade dos seus dados</LI>
              <LI>Revogar o consentimento, quando aplicável</LI>
              <LI>Solicitar informações sobre com quem compartilhamos seus dados</LI>
            </UL>
            <P>Para exercer esses direitos, entre em contato pelo canal informado na seção 9.</P>

            <H2>8. Dados de menores de idade</H2>
            <P>
              O Participa Cidade não é direcionado a crianças e não coleta intencionalmente dados de menores de 18
              anos sem o consentimento dos pais ou responsáveis legais.
            </P>

            <H2>9. Contato</H2>
            <P>
              Para dúvidas, solicitações relacionadas aos seus dados pessoais, ou para exercer os direitos previstos
              na LGPD, entre em contato:
            </P>
            <div
              className="rounded-2xl p-6 flex flex-col sm:flex-row gap-4 sm:gap-10 mt-2"
              style={{ background: `${C.yellow}0E`, border: `1px solid ${C.yellow}30` }}
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.yellow }}>
                  E-mail
                </div>
                <a
                  href="mailto:contato@vetechsystems.com.br"
                  className="text-base font-semibold cursor-pointer"
                  style={{ color: C.dark }}
                >
                  contato@vetechsystems.com.br
                </a>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.yellow }}>
                  Telefone
                </div>
                <a href="tel:+5514996114720" className="text-base font-semibold cursor-pointer" style={{ color: C.dark }}>
                  (14) 99611-4720
                </a>
              </div>
            </div>

            <H2>10. Alterações nesta política</H2>
            <P>
              Esta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou por
              exigência legal. A data da última atualização estará sempre indicada no topo deste documento.
            </P>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
