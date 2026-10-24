# Music Cookies — Presente musical com QR Code

Projeto da Atividade 1, **Demanda 1A** (Sistemas de Informação / Engenharia de Software), para a empresa **Music Cookies**: cookies com proposta de presente, com um link do Spotify na embalagem.

Quem compra escolhe uma música do Spotify, escreve uma mensagem e recebe na hora uma etiqueta com QR Code para a embalagem. Quem ganha escaneia e abre uma página com a mensagem e o player do Spotify. Os dados do presente ficam no próprio link, então não há banco de dados.

A Demanda 1B (portal da feira) está em outro repositório: [jnmorais/feira_empred](https://github.com/jnmorais/feira_empred).

## Páginas

| Rota | O que é |
| --- | --- |
| `/` | Como funciona, cardápio e pedido via WhatsApp |
| `/presente` | Criar presente musical + etiqueta com QR Code (imprimir, baixar PNG ou enviar link) |
| `/p#…` | Página que abre o presente (destino do QR Code) |
| `/proposta` | Texto da entrega 1A |

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Publicar na Vercel

Em vercel.com → **Add New → Project**, importe `jnmorais/music-cookie`. Não precisa de variáveis de ambiente.

## O que editar

- `src/lib/config.ts` — contato do grupo de SI/ES, WhatsApp e Instagram da Music Cookies, sabores e preços, e `FEIRA_URL` (endereço do portal da feira).
