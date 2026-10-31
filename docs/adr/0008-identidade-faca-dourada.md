# 0008. Identidade visual: Faca Dourada

- **Status:** Aceito
- **Data:** 2026-10-31
- **Research:** [research/identidade-visual.md](../research/identidade-visual.md)

## Contexto

O fundo espacial herdado do portfólio pessoal não dizia nada sobre e-commerce, que é o foco do Savio. O requisito 7 pede identidade própria, com elementos 3D interativos como possibilidade, e o requisito 8 pede nota 80 no Lighthouse mobile.

## Opções consideradas

Três prévias navegáveis em rodadas com o Savio:

- **Cupom:** preto e branco, 3D em caracteres de impressora. Descartado.
- **Montagem e Jornada:** cor por seção com objetos que se remontam. A interação foi aprovada, mas o tema de peças e a jornada de compra não.
- **Faca:** uma folha com linhas de corte e vinco que dobra em embalagem. Aprovada por ser tematizada.

## Decisão

Faca Dourada, aprovada pelo Savio em 31/10: fundo claro, Nunito e Lato, vidro com blur e dourado de destaque. Na parte de e-commerce, a folha dobra em caixa rosa (VTEX), sacola roxa (Wake) e envelope azul (WordPress), com logo e cor oficial de cada plataforma. Depois vem a história: uma lista de 8 projetos e um trilho horizontal, com fundo e letras na cor de cada projeto e um destaque próprio em cada um.

O 3D usa Three.js direto, sem React Three Fiber: a cena é um módulo imperativo em `components/three/`, carregado sob demanda depois da primeira pintura.

## O que aceitamos perder

- **Peso:** Three.js soma cerca de 140 kB em gzip fora do pacote inicial, além de vídeos e telas. É o maior risco para a nota do Lighthouse e fica para a etapa de performance.
- **React Three Fiber:** perdemos a escrita declarativa das cenas e ganhamos controle da rolagem sem renderizar o React a cada quadro.
- **Malha real da mão:** a base é de terceiro, sob CC BY-NC-ND 4.0, que não permite distribuir versão modificada. O site usa uma mão modelada em código, mais simples que a peça impressa.
- **Tailwind puro:** o vidro, o trilho e os painéis ficam em `@layer components` no `index.css`, porque são efeitos de uma peça só.
