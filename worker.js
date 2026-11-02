// links — Worker da Cloudflare: encurtador da casa em links.pedalhidrografi.co.
//
// /<nome> → LINKS[nome] (302: trocar o destino depois não fica preso no cache
// do navegador, como ficaria com 301). Nome sem diferenciar maiúsculas e com
// barra final tolerada. Nome desconhecido → 404 com a lista dos que existem.

import { LINKS } from './links.js';

export default {
  async fetch(request) {
    const name = new URL(request.url).pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const target = Object.hasOwn(LINKS, name) ? LINKS[name] : null;
    if (target) {
      return new Response(null, {
        status: 302,
        headers: { Location: target, 'Cache-Control': 'no-store' },
      });
    }
    const list = Object.keys(LINKS).map((k) => `/${k}`).join('\n');
    return new Response(`links.pedalhidrografi.co\n\n${list}\n`, {
      status: name ? 404 : 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  },
};
