# Design: Faca Dourada

A vitrine de uma loja: uma folha com linhas de corte e vinco dobra em embalagem atrás de um vidro fosco, sobre uma luz dourada. Depois da parte de e-commerce, a história vira um trilho de folhas coloridas, uma por projeto.

## Cores

Os tokens ficam em `src/index.css` e mudam com o tema (`data-theme` no `<html>`).

| Token | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `--bg` | `#FFFFFF` | `#12100A` | Fundo |
| `--surface` | `#FFFFFF` | `#1C1910` | Cartões |
| `--ink` | `#1D1809` | `#FBF6E6` | Texto |
| `--mute` | `#5E5640` | `#BDB293` | Texto secundário |
| `--line` | `#E8DDBF` | `#3B3422` | Bordas e skeleton |
| `--gold` | `#F5B800` | `#F5B800` | Destaque e botão principal |
| `--gold-ink` | `#7E5A00` | `#F5C93A` | Dourado usado como texto |
| `--gold-soft` | `#FFF4CC` | `#332A0C` | Fundo de hover |

Texto sobre dourado é sempre `#1D1809`, nos dois temas.

Plataformas: VTEX `#F71963`, Wake `#C505F2`, WordPress `#21759B`. Cada projeto tem um par `color` e `ink` em `src/content/projects.ts`, e esse par não muda com o tema.

## Tipografia

- **Títulos:** Nunito, peso 900, entrelinha justa e `letter-spacing` negativo.
- **Texto:** Lato, 17 px, entrelinha 1,55.
- As duas fontes ficam em `public/fonts`, sem chamar outro servidor.

## Superfícies

- **Vidro (`.glass`):** fundo translúcido com `backdrop-filter: blur(20px)`. Só existe onde há algo passando por trás.
- **Linhas de faca:** contínuas para corte e tracejadas para vinco, e as listas usam o tracejado como separador.
- **Marcador (`.highlight`):** uma palavra por título, em dourado.

## Movimento

- A rolagem comanda tudo: a dobra da folha, a luz da vitrine e o trilho horizontal.
- O trilho dobra cada painel no vinco ao passar.
- `prefers-reduced-motion` desliga o balanço do 3D, a onda e a dobra do trilho.
- O 3D carrega no primeiro gesto, em qualquer tela; até lá, um desenho estático da folha ocupa o lugar dele.

## Componentes

Em `src/components/ui`: `Button`, `ButtonLink`, `ExternalButton`, `Card`, `Input`, `Skeleton`, `Spinner`, `BrandLogo` e `StatusMessage`. Os efeitos de uma peça só ficam em `@layer components` no `index.css`.

## O que não fazer

- Citar marcas de lojas.
- Fundo escuro na parte de e-commerce do tema claro.
- Cor de plataforma fora da seção daquela plataforma.
- Vidro sem nada atrás dele.
- 3D como único caminho para um conteúdo.
