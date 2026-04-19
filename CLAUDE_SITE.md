# Participa Cidade — Site Institucional
## CLAUDE.md

## Visão Geral
Site institucional do produto Participa Cidade, desenvolvido pela VETech Systems.
URL destino: www.participacidade.com.br
Objetivo: convencer prefeitos, secretários e gestores públicos a adquirir o produto.
NÃO é o painel administrativo — é a vitrine do produto.

## Empresa
**VETech Systems**
- Site corporativo: www.vetechsystems.com.br
- Contato: contato@vetechsystems.com.br
- Tel: (14) 99611-4720

## O Produto
**Participa Cidade** é uma plataforma de gestão participativa municipal composta por:
- App mobile (iOS/Android) para o cidadão registrar demandas com foto, localização e descrição
- Painel web administrativo para prefeito, secretários e equipe de gestão
- Canal direto, rastreável e inteligente entre prefeitura e cidadão

## Problema que Resolve
Toda prefeitura enfrenta a mesma tensão: o cidadão tem demandas urgentes mas sem canal oficial, essas demandas chegam pelo vereador, imprensa ou redes sociais. O prefeito só fica sabendo depois que virou crise política. Esse modelo cria dependência política nociva — o cidadão deve um favor ao vereador, não à gestão. O Participa Cidade existe para encerrar esse ciclo.

## Argumentos de Venda
- Demandas resolvidas pela prefeitura, não pelo vereador
- Transparência que protege a gestão
- Dados para decisões estratégicas
- O prefeito na vida do cidadão todos os dias

## Métricas de Impacto (usar em destaque no site)
- -60% demandas via vereadores
- +87% satisfação cidadã esperada
- <24h tempo médio de resposta
- 100% ocorrências rastreadas

## Diferenciais Técnicos
- Validação de todas as reclamações pela equipe VETech antes de chegar à secretaria
- Chat direto entre secretaria e cidadão
- Mapa de calor geográfico por região
- Indicadores de desempenho por secretaria
- Índice de satisfação cidadã com avaliação direta após resolução
- Notificações push em tempo real
- Suporte a prefeituras e câmaras municipais

## Identidade Visual do Site

### Paleta de Cores
- Primário escuro: #012235
- Destaque ciano: #02dcfb
- Fundo claro: #F8FAFC
- Branco: #FFFFFF
- Texto: #111827
- Texto secundário: #6B7280

### Tipografia
- Fonte principal: Inter ou Syne (títulos)
- Fonte corpo: DM Sans ou Inter
- NUNCA usar fonte serif

### Estilo Visual
- Moderno, sofisticado, institucional — representa grandeza
- Animações com Framer Motion (fadeIn, slideUp, stagger)
- Partículas ou gradiente animado no hero
- Mockups do app e dashboard em destaque
- Dark hero section + seções claras alternadas
- Não pode parecer estático ou sem graça

## Stack Tecnológica
```
Next.js 14+ (App Router)
TypeScript
Tailwind CSS
Framer Motion (animações)
Lucide React (ícones)
shadcn/ui (componentes)
```

## Estrutura de Páginas

### Página Principal (/)
Seções em ordem:

1. **NAVBAR**
   - Logo Participa Cidade (usar /logoparticipa.png se disponível)
   - Links: Sobre, Como Funciona, Funcionalidades, Contato
   - Botão destaque: "Acesso ao Sistema" → abre painel admin (link externo para app.participacidade.com.br ou /login)
   - Sticky no topo, fundo transparente que vira sólido no scroll

2. **HERO**
   - Fundo: gradiente escuro #012235 → #01374f com partículas animadas (canvas ou CSS)
   - Headline principal: "A cidade que resolve. O prefeito que aparece."
   - Subheadline: "Canal direto entre prefeitura e cidadão — rastreável, inteligente e sem intermediários políticos."
   - Dois CTAs: "Agendar Demonstração" (botão ciano cheio) + "Ver como funciona" (botão ghost)
   - Mockup do app mobile flutuando com animação suave
   - Badge: "Usado por prefeituras de todo o Brasil"

3. **O PROBLEMA**
   - Fundo branco
   - Título: "Todo prefeito conhece esse problema"
   - 3 cards descrevendo a dor:
     - Demandas chegando pelo vereador
     - Crise política por falta de canal oficial
     - Gestão às cegas sem dados reais
   - Visual: ícones expressivos + texto impactante

4. **A SOLUÇÃO**
   - Fundo #F8FAFC
   - Título: "Um canal oficial que coloca o prefeito no centro"
   - 3 pilares com ícone + título + descrição:
     - Fim do improviso na gestão
     - O prefeito na vida do cidadão
     - Dados para decisões estratégicas

5. **COMO FUNCIONA**
   - Fundo branco
   - Título: "Simples para o cidadão. Poderoso para a gestão."
   - 3 passos animados em sequência:
     1. Cidadão registra pelo app (foto + localização + descrição)
     2. Equipe valida e encaminha à secretaria responsável
     3. Secretaria resolve e cidadão confirma — tudo rastreado

6. **MÉTRICAS DE IMPACTO**
   - Fundo gradiente escuro #012235
   - 4 números grandes animados (counter up ao entrar na viewport):
     - -60% | demandas via vereadores
     - +87% | satisfação cidadã
     - <24h | tempo médio de resposta
     - 100% | ocorrências rastreadas
   - Texto abaixo: "Resultados baseados em dados reais de municípios atendidos"

7. **FUNCIONALIDADES**
   - Fundo #F8FAFC
   - Título: "Tudo que sua gestão precisa em um só lugar"
   - Grid de cards (3 colunas):
     - 📱 App mobile iOS e Android
     - 🗺️ Mapa de calor geográfico
     - 📊 Dashboard analítico em tempo real
     - 💬 Chat direto secretaria-cidadão
     - 🔔 Notificações push automáticas
     - ⭐ Índice de satisfação cidadã
     - 🏛️ Suporte a prefeituras e câmaras
     - 📈 Indicadores por secretaria
     - 🔒 Dados auditáveis e transparentes

8. **PARA QUEM É**
   - Fundo branco
   - Título: "Feito para quem governa com responsabilidade"
   - 3 perfis com card:
     - Prefeito: visibilidade e controle político
     - Secretário: gestão eficiente das demandas
     - Equipe de TI/Gestão: dados e relatórios

9. **CTA FINAL**
   - Fundo gradiente ciano #02dcfb → azul escuro
   - Título grande: "Sua cidade merece isso."
   - Subtítulo: "Agende uma demonstração ao vivo e veja o Participa Cidade em funcionamento."
   - Botão: "Agendar Demonstração Gratuita"
   - Contato: (14) 99611-4720 | contato@vetechsystems.com.br

10. **FOOTER**
    - Logo Participa Cidade
    - Desenvolvido por VETech Systems (com link para vetechsystems.com.br)
    - Links: Política de Privacidade, Termos de Uso
    - © 2026 VETech Systems

## Botão "Acesso ao Sistema"
- Sempre visível na navbar
- Cor: #02dcfb com texto #012235
- Ao clicar: redirecionar para o painel web-admin (URL a definir)
- Por enquanto apontar para: https://participa-cidade-production.up.railway.app

## Assets Disponíveis
- Logo Participa Cidade: usar texto estilizado ou SVG com as cores da marca
- Logo VETech: www.vetechsystems.com.br/_next/image?url=%2Flogo-vetech.png
- Mockups: gerar visualmente com CSS/divs estilizados representando o app

## Deploy
- Vercel (deploy automático via GitHub)
- Domínio: www.participacidade.com.br (a configurar)

## Comandos para Rodar
```bash
# Instalar
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Deploy (após conectar Vercel)
git add .
git commit -m "descrição"
git push origin main
```

## Instruções para o Claude Code
1. Criar projeto Next.js do zero nesta pasta
2. Instalar dependências: framer-motion, lucide-react, tailwindcss, shadcn/ui
3. Criar todas as seções em um único page.tsx (landing page single page)
4. Usar Framer Motion para animações de entrada em todas as seções
5. Implementar counter animado nas métricas (useInView + animate)
6. Partículas animadas no hero via canvas
7. Navbar sticky com scroll behavior
8. Totalmente responsivo (mobile-first)
9. Performance otimizada para Core Web Vitals
10. NÃO mencionar preços em nenhuma seção
