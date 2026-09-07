# 🥖 Subway® — Fresh Reinvented | Campanha Signature Series

> Uma landing page moderna, imersiva e de altíssimo padrão visual para a marca **Subway®**, projetada como uma campanha de marketing premium. O projeto conta com um **Totem de Autoatendimento Digital (Subway Kiosk™)** inspirado na experiência touchscreen das maiores redes mundiais de fast-food, com fotografias exclusivas para cada ingrediente, fluxo de customização dinâmico e integração direta com o app móvel.

---

## 🌟 Principais Recursos & Experiência do Usuário

### 1. Hero 3D Editorial de Alto Impacto
* **Perspective Tilt Interativo**: Sanduíche hero em perspectiva tridimensional com iluminação volumétrica e efeito de profundidade tátil ao passar o mouse.
* **Tipografia Editorial & Gradientes de Marca**: Verde esmeralda (`#008C15`) e amarelo ouro (`#FFC20E`) harmonizados em modo escuro profundo (`#040d07`).
* **Métricas de Frescor**: Indicadores de satisfação pública (4.9/5), tempo de preparo e frescor certificado.

### 2. Subway Kiosk™ — Totem Digital de Autoatendimento
Uma experiência touchscreen no estilo dos totens do McDonald's com 6 etapas de personalização:
* **Seletor de Modo**: Alternância ágil entre **Comer Aqui** e **Para Viagem** com relógio sincronizado em tempo real.
* **Etapa 1: Pão & Tamanho**: Toggle entre **15 cm individual** e **30 cm Footlong (2x)**, com 4 variedades de massas artesanais (*Parmesão & Orégano*, *Italiano Branco*, *9 Grãos*, *Três Queijos Gratinado*).
* **Etapa 2: Recheio / Proteína Principal**: Seleção de carnes nobres grelhadas (*Trio B.M.T.®*, *Frango Teriyaki*, *Shaved Angus Steak*, *Falafel Plant-Based*).
* **Etapa 3: Queijo & Forno Turbo**: Queijos fundidos (*Cheddar Melt*, *Provolone Curado*, *Mozzarella Fresca*, *Sem Queijo*) e controle do ponto de tostagem (*Tostado Quentinho*, *Extra Tostado*, *Pão Macio*).
* **Etapa 4: Saladas da Horta (Mecânica 3-States)**: Cada vegetal possui alternância tátil em 3 estados por clique:
  - 🟢 **Normal** (padrão)
  - 🟡 **Extra** (porção turbinada)
  - ⚪ **Sem** (removido do sanduíche)
* **Etapa 5: Molhos Assinatura**: Escolha de até 3 molhos com receitas autorais (*Cebola Agridoce*, *Chipotle Defumado*, *Mostarda & Mel*, *Maionese Verde com Ervas*).
* **Etapa 6: Turbine seu Combo**: Upsell integrado com refrigerante refil geladinho e cookies quentinhos assados na hora.
* **Zero Imagens Repetidas**: Cada ingrediente, pão, proteína, queijo, vegetal, molho e bebida possui uma fotografia comercial gastronômica exclusiva e dedicada.

### 3. Integração Mobile: "Termine o seu pedido no App Subway®"
* Ao concluir a montagem, é disparado um modal cinematográfico com efeito de confetes.
* **Comanda do Totem**: Geração dinâmica do número da comanda (ex: `#837`) com o espelho completo da receita montada.
* **QR Code Escaneável**: QR Code bidimensional com as cores da identidade visual e logotipo centralizado do Subway®, pronto para leitura com a câmera do celular.
* **Cupom Promocional**: Código `APPFRESH30` com botão de cópia em 1 clique com feedback visual para pagamento com 30% de desconto no aplicativo oficial.

### 4. Coleção Signature & Sacola Fresh
* **Catálogo de Sanduíches Assinados**: Filtros em tempo real por categoria (*Todas as Criações*, *Favoritos do Chef*, *Defumados & Quentes*, *Leves & Fit*).
* **Sacola Fresh (Cart Drawer)**: Carrinho lateral deslizante com controle de quantidade, cálculo em tempo real de taxas e desconto promocional aplicado.

### 5. Narrativa Imersiva & Story Parallax
* Seção de storytelling destacando o frescor diário, agricultura sustentável, pães assados a cada hora e o ritual artesanal de preparo.

---

## 🛠️ Stack Tecnológica

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
* **Biblioteca UI**: [React 19](https://react.dev/)
* **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
* **Ícones**: [Lucide React](https://lucide.dev/)
* **Efeitos Visuais**: `canvas-confetti` + animações CSS aceleradas por hardware
* **Otimização de Imagens**: `sharp` + `next/image`

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18.17 ou superior)
* `npm`, `yarn` ou `pnpm`

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/cauacreis/Subway-Landing-Page.git
cd Subway-Landing-Page
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra no navegador:
```
http://localhost:3000
```

---

## 📂 Estrutura do Projeto

```
epic-lavoisier/
├── public/
│   └── images/
│       ├── kiosk/              # Fotos individuais de cada pão, queijo, vegetal, molho e combo
│       ├── hero.jpg            # Fotografia macro principal do Hero 3D
│       └── ...
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Shell principal com fontes e metadados SEO
│   │   ├── page.tsx            # Página inicial consolidando todas as seções
│   │   └── globals.css         # Variáveis de tema, scrollbar e efeitos visuais
│   └── components/
│       ├── navbar.tsx          # Barra de navegação flutuante com logo Subway®
│       ├── hero.tsx            # Seção Hero com 3D perspective tilt
│       ├── sub-builder.tsx     # Totem Subway Kiosk™ completo + Checkout App Modal
│       ├── product-showcase.tsx# Vitrine da Coleção Signature Series
│       ├── cart-drawer.tsx     # Gaveta lateral interativa da Sacola Fresh
│       ├── story-parallax.tsx  # Storytelling e frescor artesanal
│       ├── app-download.tsx    # Seção institucional de download do app Subway®
│       └── footer.tsx          # Rodapé institucional completo
├── README.md                   # Documentação do projeto
└── tsconfig.json               # Configurações TypeScript
```

---

## 📄 Licença

Este projeto é desenvolvido para fins demonstrativos, conceituais e de portfólio. As marcas e logotipos Subway® pertencem à Subway IP LLC.
