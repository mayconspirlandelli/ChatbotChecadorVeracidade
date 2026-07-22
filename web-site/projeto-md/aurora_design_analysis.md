# Análise de Design - Plataforma dAurora

## Visão Geral
**Nome da Plataforma:** dAurora  
**Subtítulo:** Agência de Elucidação de Fatos e Ilícitos  
**Função Principal:** Plataforma para proteção contra desinformação e fraudes digitais

---

## 📊 Paleta de Cores

### Cores Primárias
- **Laranja Principal:** `#FF6B35` ou `#FF6633` - Usado no logo, botões e destaques
- **Turquesa/Teal:** `#29B6B0` ou `#2DB5AF` - Fundo de seções principais, CTAs secundários
- **Branco:** `#FFFFFF` - Fundo geral e textos sobre cores escuras
- **Cinza Escuro:** `#3D3D3D` ou `#404040` - Textos principais e rodapé

### Cores Secundárias
- **Amarelo:** `#FFD700` - Indicador de nível médio em gráfico de risco
- **Verde:** `#4CAF50` - Indicador de segurança em gráfico de risco
- **Vermelho:** `#E74C3C` - Indicador de risco elevado em gráfico de risco
- **Cinza Claro:** `#F5F5F5` - Fundos de cards e seções neutras
- **Cinza Médio:** `#CCCCCC` ou `#D0D0D0` - Borders e linhas divisórias

---

## 🔤 Tipografia

### Fontes Utilizadas
- **Família Principal:** Sans-serif moderna (possivelmente Segoe UI, Arial ou similar)
- **Peso das Fontes:**
  - Regular: `400` - Textos corpo e descrições
  - Medium: `500` - Subtítulos e destaques
  - Bold: `700` - Títulos e cabeçalhos principais
  - Semi-bold: `600` - Labels e títulos secundários

### Hierarquia Tipográfica

#### Título Principal (Hero Section)
- **Tamanho:** ~44-48px
- **Peso:** Bold (700)
- **Cor:** Laranja (#FF6B35) + Cinza escuro (#3D3D3D)
- **Texto:** "Proteja-se contra desinformação e fraudes digitais"
- **Linha:** 1.2 de espaçamento

#### Subtítulo
- **Tamanho:** ~16px
- **Peso:** Regular (400)
- **Cor:** Cinza escuro (#3D3D3D)
- **Linha:** 1.6 de espaçamento

#### Títulos de Seção
- **Tamanho:** ~32-36px
- **Peso:** Bold (700)
- **Cor:** Cinza escuro (#3D3D3D)

#### Labels e Badges
- **Tamanho:** ~12-13px
- **Peso:** Semi-bold (600)
- **Cor:** Cinza (#666) ou Branco sobre fundo colorido

#### Textos Descritivos
- **Tamanho:** ~14-15px
- **Peso:** Regular (400)
- **Cor:** Cinza médio (#666) ou #777
- **Linha:** 1.5-1.6 de espaçamento

---

## 🎨 Design e Componentes

### Header/Navegação
- **Layout:** Horizontal, sticky ao topo
- **Fundo:** Branco com sombra sutil
- **Logo:** Ícone laranja "d" + texto "Aurora"
- **Menu:** O dAurora | Esclarecer Fatos e Ilícitos | Faça parte da nossa rede | Notícias
- **Ícones:** Lupa (busca), Instagram, LinkedIn
- **Serviço Gratuito:** Badge cinza claro no canto superior esquerdo

### Hero Section
- **Fundo:** Gradiente turquesa/teal (`#29B6B0`)
- **Alinhamento:** Esquerda
- **Elementos:**
  - Logo dEnodare (agência parceira)
  - Gráfico indicador de risco/confiança (semicircular com cores variadas)
  - Dois botões: "Reportar Postagem Suspeita" e "Acompanhar Relato"

### Botões
#### Tipo 1: Call-to-Action Principal
- **Cor de Fundo:** Turquesa/Teal (#29B6B0)
- **Cor do Texto:** Branco
- **Peso:** Semi-bold (600)
- **Tamanho:** ~14-16px
- **Padding:** ~12-16px horizontalmente, ~10-12px verticalmente
- **Border-radius:** ~4-6px
- **Ícone:** Seta à direita

#### Tipo 2: Botão Secundário
- **Cor de Fundo:** Transparente
- **Cor da Borda:** Branco
- **Cor do Texto:** Branco
- **Estilo:** Outlined

### Cards de Estatísticas
- **Fundo:** Branco
- **Número:** 
  - Tamanho: ~48px
  - Peso: Bold (700)
  - Cor: Laranja (#FF6B35)
- **Descrição:**
  - Tamanho: ~14px
  - Cor: Cinza (#666)

**Dados Exibidos:**
- +47.000 Relatos Analisados
- 92% Taxa de Detecção
- <1 min Tempo de Resposta

### Seção "Como funciona?"
- **Fundo:** Branco
- **Layout:** 3 colunas com ícones
- **Título:** Tamanho 32-36px, Bold, Cinza escuro
- **Estrutura:**
  1. Envie a postagem
  2. Nossa IA analisa
  3. Receba orientação

**Ícones:**
- Estilo: Ilustrações circulares com ícones modernos
- Cores: Turquesa, com elementos em cinza e laranja
- Tamanho: ~100x100px aproximadamente

### Seção "O que você pode reportar?"
- **Layout:** Grid 2x2 com cards
- **Cards:**
  - Ícone laranja em quadrado arredondado
  - Título em Bold
  - Descrição em tamanho menor

**Categorias:**
1. SMS e Mensagens
2. Áudios e Ligações
3. Links e URLs
4. Imagens e Vídeos

### Seção de Segurança e Privacidade
- **Fundo:** Turquesa/Teal (#29B6B0)
- **Título:** "Sua privacidade é garantida"
- **Cards:**
  - 100% Anônimo
  - Dados Protegidos
  - Ação Rápida
- **Ícone:** Escudo com cadeado (azul turquesa)

### CTA Secundário (Comunidade)
- **Fundo:** Laranja (#FF6B35)
- **Texto:** "FAÇA PARTE DA NOSSA REDE!"
- **Botão:** "Quero colaborar e ganhar recompensas"
- **Ilustração:** Globo com personas diversas

### Footer
- **Fundo:** Cinza escuro (#2D2D2D) ou similar
- **Texto:** Branco
- **Tamanho do Texto:** ~13-14px
- **Layout:** 3 colunas
  - Sobre a plataforma
  - Links úteis
  - Transparência
- **Logo:** Branco no canto inferior

---

## 🏗️ Estrutura e Layout

### Quebras de Página (Sections)
1. **Header Fixo** - Navegação principal
2. **Hero Section** - Valor principal e CTA
3. **Estatísticas** - Números de impacto
4. **Como Funciona** - 3 passos explicativos
5. **Tipos de Conteúdo** - 4 categorias reportáveis
6. **Segurança e Privacidade** - Garantias
7. **CTA Comunidade** - Engajamento e recompensas
8. **Footer** - Links e informações legais

### Espaçamento e Margens
- **Padding Vertical de Seções:** ~60-80px
- **Padding Horizontal:** ~20-40px em mobile, +100px em desktop
- **Margem entre elementos:** ~20-30px

### Alinhamento
- **Conteúdo Principal:** Centralizado horizontalmente
- **Hero Section:** Left-aligned com direcionamento visual à direita

---

## 🎯 Elementos Visuais Especiais

### Ícones
- **Estilo:** Modernos, minimalistas
- **Cores:** Laranja primary, turquesa secondary
- **Formato:** SVG ou PNG otimizado

### Ilustrações
- **Estilo:** Flat design com gradientes sutis
- **Personagens:** Diversas personas representando inclusão
- **Elementos:** Símbolos de segurança, tecnologia, comunicação

### Gráficos/Indicadores
- **Indicador de Risco:** Semicircular com escala de cores (vermelho → amarelo → verde)
- **Tipo:** Gauge ou speedometer visual

### Sombras e Efeitos
- **Cards:** Sombra sutil (0 2px 8px rgba(0,0,0,0.1))
- **Hover Effects:** Elevação e mudança de cor
- **Transparências:** Usadas para layering de gradientes

---

## 📱 Responsividade (Observações)

- **Breakpoints Aparentes:** Mobile first, depois tablet e desktop
- **Hero Section:** Reajustável para layouts menores
- **Grid Cards:** Passa de 2 colunas para 1 em mobile
- **Navegação:** Provavelmente usa menu hamburger em mobile

---

## ✨ Padrões de Design

### Design System Observado
- **Consistência:** Cores primárias bem definidas
- **Iconografia:** Uniforme em estilo e peso
- **Typography Scale:** Hierarquia clara
- **Spacing System:** Provavelmente baseado em múltiplos de 8px

### Acessibilidade Aparente
- Bom contraste entre texto e fundo
- Ícones acompanhados de texto
- CTA clara e destacada
- Estrutura semântica logicamente organizada

### Micro-interações Prováveis
- Hover nos botões (mudança de cor/sombra)
- Transições suaves entre seções
- Animações sutis nos ícones

---

## 🔗 Branding

**Cores Corporativas:**
- Laranja (#FF6B35) - Energia, confiabilidade, ação
- Turquesa (#29B6B0) - Segurança, tranquilidade, proteção

**Mensagens Principais:**
- Proteção contra fraudes digitais
- Análise rápida por IA
- Anonimato garantido
- Comunidade colaborativa
- Transparência e segurança

**Tom de Voz:** Profissional, seguro, acessível, empoderador

---

## 📐 Dimensões Aproximadas

- **Container Máximo:** ~1200-1400px
- **Imagem Hero:** ~500x500px ou similar
- **Ícones (pequenos):** ~32-48px
- **Ícones (seção):** ~100-120px
- **Logo:** ~40-50px de altura

---

## 🎬 Resumo Visual

A plataforma dAurora utiliza um design moderno e limpo com:
- Paleta restrita (laranja + turquesa)
- Tipografia sans-serif clara e legível
- Layout bem estruturado e previsível
- Ênfase em segurança e confiabilidade
- Elementos ilustrados acessíveis
- Hierarquia visual forte e intuitiva
