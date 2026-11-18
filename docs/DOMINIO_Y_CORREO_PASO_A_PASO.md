# Dominio y correo de VYRO — paso a paso

Dominio elegido: **vyrohd.com** (12,03 USD el primer año y también al renovar; consultado en Vercel el 2026-11-18).
La web ya está preparada: el dominio, el correo y el nombre del responsable se cambian con variables de entorno al generar, sin tocar el código.

## 1. Comprar y conectar el dominio (tú, en Vercel, ~5 minutos)
1. Vercel → **Domains** → buscar `vyrohd.com` → **Buy**. Vercel te pedirá los datos del titular del dominio (nombre, dirección, teléfono). Es un requisito de registro. Comprueba que la **privacidad WHOIS** quede activada para que esos datos no se publiquen.
2. Proyecto **vyro-hd** → Settings → **Domains** → Add `vyrohd.com` y `www.vyrohd.com`. Pon `www` redirigiendo a `vyrohd.com`.
3. En el mismo lugar, deja `vyro-hd.vercel.app` redirigiendo a `vyrohd.com` (308).
4. Avísame "ya conecté el dominio".

## 2. Lo que hago yo cuando avises
```
SITE_URL=https://vyrohd.com CONTACT_EMAIL=soporte@vyrohd.com npm run generate
npm run check
vercel deploy --prod
```
Eso cambia canonical, hreflang, sitemap, Open Graph, correo de contacto y textos legales. Después actualizo la URL de privacidad dentro de la app (hoy apunta a `jerryguanipa-blip.github.io/vyro-legal`), el perfil de WhatsApp y las respuestas de Play Console, y recompilo el AAB.

## 3. Correo propio (elige una)
**A. Reenvío gratis (solo recibir).** `soporte@vyrohd.com` cae en tu Gmail.
- Tú creas la cuenta gratuita en un servicio de reenvío (por ejemplo ImprovMX) y agregas el dominio.
- Yo (o tú) cargo en Vercel → Domains → vyrohd.com → DNS los registros que el servicio te muestre (normalmente 2 MX y 1 TXT de SPF). Usa siempre los valores que te muestre su panel.
- Limitación: para **responder** desde esa dirección hay que configurar "Enviar como" en Gmail, y a veces cae en spam.

**B. Google Workspace (recibir y enviar con tu dominio).** Plan de pago por usuario; confirma el precio en su página.
- Tú contratas y verificas el dominio (te piden un registro TXT).
- Se agregan los registros MX que Google indique, más SPF y DKIM (el DKIM lo genera tu consola de administración).
- Es la opción más seria para atender usuarios y para la ficha de Play.

Recomendación: B si vas a atender gente de verdad; A para empezar sin costo.

## 4. Pendientes que dependen del dominio
- URL de la política de privacidad en Play Console y en la app.
- Correo del desarrollador en Play Console.
- Perfil de WhatsApp (sitio web y correo).
- Fly: `PUBLIC_BASE_URL` NO cambia (sigue siendo `vyro-whatsapp-backend.fly.dev`). Si luego quieres `api.vyrohd.com`, se hace aparte.
