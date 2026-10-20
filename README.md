# Portfólio 3D - Sávio Pessôa Afonso

Experiência interativa imersiva desenvolvida com React e Three.js.

**Aviso:** Este projeto ainda está em fase de desenvolvimento.

## Como Rodar

1. Instale as dependências: `npm install`
2. Rode o projeto: `npm run dev`

## Deploy

URL: [savioomiodev.com.br](https://savioomiodev.com.br/)

Hospedado no **Cloudflare Pages**, com build automatico a cada push na `main`.

| Config | Valor |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Variavel de ambiente | `NODE_VERSION = 22` |

- `public/_redirects` - fallback de SPA, senao as rotas do react-router dao 404 no refresh.
- `public/_headers` - politica de cache dos assets.
- `.npmrc` - `legacy-peer-deps=true`, necessario para o `npm install` resolver as deps do React 19.

## Estrutura do Projeto

```
meu-portfolio-3d/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   ├── ConstructionPopup.tsx
│   │   ├── ThreeBackground.tsx
│   │   ├── SkillsCarousel.tsx
│   │   └── ui/
│   │       ├── GlowMenu.tsx
│   │       └── logoCarousel.tsx
│   ├── App.tsx
│   ├── index.css            # Design System CSS
│   └── main.tsx
├── public/                  # Assets estáticos
├── tailwind.config.js       # Configuração do Design System
├── DESIGN_SYSTEM.md         # Documentação completa
└── README.md
```

## Regras de Design

Ver documentação completa em [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)

## Licença

© 2026 Sávio Pessôa Afonso. Todos os direitos reservados.

---

**Desenvolvido com:** React • TypeScript • Tailwind CSS • Three.js  
**Identidade Visual:** #61DAFB • Space Grotesk • Inter
