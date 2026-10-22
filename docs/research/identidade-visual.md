# R07. Identidade visual: o que representa a área de e-commerce?

- **Data:** 2026-10-21
- **Status:** em aberto, aguardando a decisão do Savio
- **Requisitos atendidos:** 7, 8

## Contexto

Hoje o Savio é especialista em e-commerce. O visual herdado do portfólio pessoal ([ADR 0001](../adr/0001-reaproveitar-portfolio-existente.md)) é um fundo 3D espacial (`ThreeBackground`, `WarpStars`), que não tem relação com essa área.

O conteúdo também está desatualizado: faltam as experiências de 2024 em diante e os projetos pessoais. O único projeto pessoal citado até agora é o **GasMaster**, com repositório privado e só uma imagem de capa. O Savio vai passar esse conteúdo depois (T29).

## Critérios

1. Representar a área de e-commerce à primeira vista.
2. Identidade visual própria (requisito 7).
3. Lighthouse mobile ≥ 80 (requisito 8): o 3D de fundo é o maior risco para a nota.
4. Caber no prazo de 03/11.

## Opções

### A. Manter o fundo 3D espacial

- Prós: já está pronto.
- Contras: não comunica e-commerce; pesa no Lighthouse mobile.

### B. "O portfólio é uma loja", sem 3D

Linguagem de e-commerce no lugar do espaço, com os requisitos do enunciado mapeados para as telas de uma loja:

| Requisito | Vira |
| --- | --- |
| 3. Projetos vindos do GitHub | Vitrine (PLP), com filtros por tecnologia e skeleton |
| 1. `/projetos/:slug` | Página de produto (PDP): capa, ficha técnica (linguagem, data, stack), botão "ver no GitHub" no lugar do "comprar" |
| 4. Formulário de contato | Checkout curto, com validação por campo e confirmação no estilo "pedido enviado" |
| 5. Dashboard | Painel admin / OMS: mensagens como pedidos ("respondida" = "entregue") e escolha dos destaques da vitrine |
| 8. Performance | Argumento de venda: em e-commerce, Core Web Vitals é conversão; dá para mostrar a nota do Lighthouse no site |

- Prós: comunica a área e serve de fio condutor para o vídeo ("montei o portfólio como uma loja porque é o que eu faço"). Sem cena 3D, a nota de performance sobe.
- Contras: perde o elemento 3D, que o enunciado cita como opcional ("podendo incluir").

### C. Loja + um objeto 3D leve no hero

Igual à B, com um único objeto interativo no hero (caixa de produto ou carrinho que reage ao mouse e à rolagem), carregado sob demanda.

- Prós: mantém o 3D interativo citado no requisito 7, agora com sentido.
- Contras: custo de modelagem e de performance; precisa de uma versão leve ou estática no celular.

## Comparação

| Critério | A | B | C |
| --- | --- | --- | --- |
| Representa e-commerce | não | sim | sim |
| Lighthouse mobile | risco | melhor | médio |
| Esforço até 03/11 | nenhum | médio | alto |

## Recomendação

B ou C; A está descartada porque não representa a área. A escolha entre B e C fica com o Savio e vira o ADR seguinte.

## Fontes

- a preencher ao fechar a research
