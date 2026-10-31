# R07. Identidade visual: o que representa a área de e-commerce?

- **Data:** 2026-10-21, atualizada em 2026-10-31
- **Status:** em aberto; a Faca foi escolhida como base e a terceira rodada aguarda o retorno do Savio
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

## Primeira rodada de prévias (30/10)

Três modelos publicados num artefato, todos com objetos 3D que mudam com a rolagem:

- **Cupom** (preto e branco, 3D em caracteres de impressora): descartado pelo Savio.
- **Faca** (branco e magenta, folha que dobra em embalagem): aprovado porque é tematizado.
- **Montagem** (peças de montar que viram cada objeto, uma cor por seção): a interação e a cor por seção foram aprovadas, o tema de peças de montar não, porque não tem relação com e-commerce. O conteúdo também ficou focado demais em robótica e drones.

A opção C acima é o caminho: loja com 3D. O foco do site passa a ser e-commerce, e a história pessoal fica no fim, com uma página por época.

## Segunda rodada

Duas prévias, no mesmo artefato:

- **Jornada:** a rolagem é o caminho de uma compra (vitrine, lojas, carrinho, pagamento, entrega, confirmado). Uma cor por seção, e as peças do objeto se soltam e remontam o seguinte.
- **Faca:** a versão clara, em branco e magenta, com o mesmo conteúdo.

O Savio descartou a Jornada e pediu para seguir com a Faca.

## Terceira rodada (31/10)

Uma prévia, a **Faca Dourada**, a partir do pedido do Savio:

- **Tipografia:** Nunito nos títulos e Lato no texto.
- **Parte de cima:** estado atual em e-commerce, com fundo claro, blur e dourado de destaque. O blur é o vidro de uma vitrine: a embalagem 3D passa por trás dele.
- **Plataformas:** só VTEX (FastStore e Store Framework) e Wake, mais 2 projetos reais em WordPress. Cada uma tem o logo e a cor oficial, e a folha dobra em caixa, sacola e envelope.
- **Marcas:** o site não cita as lojas, só as contagens por plataforma.
- **Experiência:** 3 anos, sendo 1 de estágio e 2 em e-commerce.
- **História:** primeiro uma lista de projetos; depois um trilho horizontal, com uma seção por projeto, cada uma com fundo e letras na cor do projeto.
- **Algo próprio em cada projeto:** vídeos da aranha; guincho do drone em 3D; água subindo no Callidus Link; mão 3D que faz os sinais pelo teclado; telas reais da JSOM e do GasMaster, com dados fictícios.

## Fontes

- a preencher ao fechar a research
