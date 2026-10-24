# Music Cookies × Feira de Empreendedorismo

Projeto da Atividade 1 (Sistemas de Informação / Engenharia de Software) — integração com a Feira de Empreendedorismo de 03/11.

- **Demanda 1A — Music Cookies:** gerador de *presentes musicais*. Quem compra escolhe uma música do Spotify, escreve uma mensagem e recebe uma etiqueta com QR Code para a embalagem. Quem ganha escaneia e abre uma página com a mensagem e o player do Spotify.
- **Demanda 1B — Feira:** portal da feira com página de cada expositor, mapa interativo das bancas, votação, painel ao vivo para telão e folha de QR Codes para imprimir.

A proposta completa (problema, solução, implementação, nível de entrega e contato) está na página `/proposta`.

## Páginas

| Rota | O que é |
| --- | --- |
| `/` | Início |
| `/music-cookies` | Loja: como funciona, sabores e pedido via WhatsApp |
| `/music-cookies/presente` | Criar presente musical + etiqueta com QR Code |
| `/p#…` | Página que abre o presente (destino do QR Code) |
| `/feira` | Portal da feira |
| `/feira/expositores/[slug]` | Página de cada banca |
| `/feira/mapa` | Mapa interativo (`?banca=slug` destaca uma banca) |
| `/feira/votar` | Votação |
| `/feira/resultados` | Painel ao vivo (`?chave=FEIRA_ADMIN_KEY` mostra os comentários) |
| `/feira/qrcodes` | Folha de QR Codes para imprimir |
| `/proposta` | Texto da entrega 1A e 1B |

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Publicar na Vercel

1. Em vercel.com → **Add New → Project**, importe o repositório `jnmorais/music-cookie` (as configurações padrão de Next.js já servem).
2. **Banco dos votos (recomendado):** no projeto da Vercel, aba **Storage → Create Database → Upstash (Redis)**, plano gratuito, e conecte ao projeto. A integração cria `KV_REST_API_URL` e `KV_REST_API_TOKEN` automaticamente. Sem isso, a votação funciona em modo demonstração (memória), mas os votos se perdem.
3. **Variável `FEIRA_ADMIN_KEY`** (opcional): uma senha qualquer. Abra `/feira/resultados?chave=SUA_SENHA` para ver os comentários.
4. Faça um novo deploy depois de adicionar as variáveis.

O presente musical não usa banco: os dados ficam no próprio link.

## O que editar antes da feira

- `src/lib/config.ts` — contato do grupo de SI/ES, WhatsApp e Instagram da Music Cookies, sabores e preços.
- `src/lib/expositores.ts` — descrições das bancas e posição de cada uma no mapa (`mapa: { x, y }`, de 0 a 100).
