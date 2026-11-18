# Dominio y correo de VYRO — paso a paso

Dominio elegido: **vyrohd.com** (12,03 USD el primer año y también al renovar; consultado en Vercel el 2026-11-18). **Todavía no está comprado.**

Estado de la web (2026-11-18): el correo público ya es **`contacto@vyrohd.com`** (pie, centro de ayuda, páginas legales). Esa dirección **no existe hasta que compres el dominio y actives el reenvío** (paso 1 de abajo). Mientras tanto, la web sigue en `https://vyro-hd.vercel.app` y todo lo que apunta a una dirección (canonical, sitemap, Open Graph) usa esa URL; cambia con la variable `SITE_URL`.

## 1. Primero, justo después de comprar: activar el reenvío de `contacto@vyrohd.com`
Hazlo antes que nada: es lo único que falta para que alguien pueda escribirte.

1. Compra `vyrohd.com` en Vercel → **Domains** → buscar → **Buy**. Te pedirá los datos del titular (requisito de registro); verifica que la **privacidad WHOIS** esté activada.
2. Crea una cuenta gratuita en **ImprovMX** (improvmx.com), pulsa **Add domain** y escribe `vyrohd.com`.
3. En ImprovMX crea el alias `contacto` → tu Gmail personal (destino). También puedes poner `*` (catch-all) para recibir cualquier alias.
4. En Vercel → **Domains** → `vyrohd.com` → **DNS Records** → **Add**, uno por uno:

| Tipo | Nombre / Host | Valor | Prioridad / TTL |
|---|---|---|---|
| MX | `@` (vacío en Vercel) | `mx1.improvmx.com` | 10 |
| MX | `@` (vacío en Vercel) | `mx2.improvmx.com` | 20 |
| TXT | `@` (vacío en Vercel) | `v=spf1 include:spf.improvmx.com ~all` | TTL por defecto (60 s en Vercel) |

   - **Dobla la comprobación en el panel de ImprovMX**: al agregar el dominio te muestra exactamente estos registros. Si algo difiere de esta tabla, manda lo que diga su panel (los valores de arriba son los documentados por ImprovMX a la fecha de este archivo).
   - Solo puede existir **un** registro SPF por dominio. Si luego usas Google Workspace, reemplaza este SPF (ver sección 3).
   - Si el dominio usa los nameservers de Vercel (lo normal al comprarlo allí), los registros se crean en Vercel, no en otro sitio.
5. En ImprovMX pulsa **Check DNS** (puede tardar de minutos a unas horas). Cuando salga en verde, envía un correo de prueba a `contacto@vyrohd.com` desde otra cuenta y comprueba que llega a tu Gmail (mira también en spam).
6. Responder **como** `contacto@vyrohd.com`: Gmail → Configuración → Cuentas → "Enviar como". ImprovMX documenta cómo (SMTP propio; revisa en su panel si esa función es de pago en tu plan). Sin eso, solo recibes: puedes contestar desde tu Gmail personal, pero el usuario verá tu dirección personal. Si vas a atender gente de verdad, usa la ruta B.

## 2. Conectar el dominio a la web (tú en Vercel, ~5 minutos)
1. Proyecto **vyro-hd** → Settings → **Domains** → Add `vyrohd.com` y `www.vyrohd.com`. Pon `www` redirigiendo a `vyrohd.com`.
2. Deja `vyro-hd.vercel.app` redirigiendo a `vyrohd.com` (308).
3. Avisa "ya conecté el dominio" y se publica con:
```
SITE_URL=https://vyrohd.com npm run generate
npm run check
vercel deploy --prod
```
(`CONTACT_EMAIL` ya viene por defecto como `contacto@vyrohd.com`; solo se define para cambiarlo.) Eso actualiza canonical, hreflang, sitemap, Open Graph y robots. Después hay que actualizar la URL de privacidad dentro de la app (hoy apunta a `jerryguanipa-blip.github.io/vyro-legal`), el perfil de WhatsApp y las respuestas de Play Console, y recompilar.

## 3. Ruta B: Google Workspace (recibir y enviar con tu dominio)
Plan de pago por usuario; confirma el precio en workspace.google.com.

1. Contrata Workspace con `vyrohd.com` y crea el usuario `contacto@vyrohd.com`.
2. Verificación del dominio: Google te da un registro **TXT** (empieza por `google-site-verification=`). Añádelo en Vercel → DNS (Nombre `@`). Pulsa verificar en el asistente.
3. **MX**: borra los MX de ImprovMX (si los creaste) y añade los que indique el asistente de Google. Hoy Google indica un único registro, pero **confirma en tu consola** (Admin → Gmail → activar Gmail):

| Tipo | Nombre | Valor | Prioridad |
|---|---|---|---|
| MX | `@` | `smtp.google.com` | 1 |

   Si tu asistente muestra la lista clásica, usa esa: `aspmx.l.google.com` (1), `alt1.aspmx.l.google.com` (5), `alt2.aspmx.l.google.com` (5), `alt3.aspmx.l.google.com` (10), `alt4.aspmx.l.google.com` (10).
4. **SPF** (reemplaza el de ImprovMX; uno solo): TXT en `@` con `v=spf1 include:_spf.google.com ~all`.
5. **DKIM**: Admin → Apps → Google Workspace → Gmail → **Autenticar correo** → generar clave para `vyrohd.com` → copia el TXT que te dé (host `google._domainkey`) a Vercel → DNS → **Iniciar autenticación**.
6. **DMARC** (cuando SPF y DKIM pasen): TXT en `_dmarc` con `v=DMARC1; p=none; rua=mailto:contacto@vyrohd.com`. Tras una semana de informes limpios, sube a `p=quarantine`.
7. Prueba en ambos sentidos con un Gmail personal y revisa en los encabezados `spf=pass dkim=pass dmarc=pass`.

## 4. ¿Cuál elijo?
- **Empezar sin costo:** ruta 1 (reenvío). Solo recibes.
- **Atender usuarios y ficha de Play:** ruta B. Es lo más serio, pero de pago.
- Se puede empezar con 1 y pasar a B después: solo cambian los MX y el SPF.

## 5. Pendientes que dependen del dominio
- URL de la política de privacidad en Play Console y en la app.
- Correo del desarrollador en Play Console (el mismo `contacto@vyrohd.com`).
- Perfil de WhatsApp (sitio web y correo).
- Fly: `PUBLIC_BASE_URL` NO cambia (sigue siendo `vyro-whatsapp-backend.fly.dev`). Si luego quieres `api.vyrohd.com`, se hace aparte.
- Legales: confirmar con el abogado cómo queda identificado el responsable (hoy figura solo el nombre de la empresa titular y este correo; sin RUC ni dirección).
